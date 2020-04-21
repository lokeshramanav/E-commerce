const Product = require('../models/product');
const { errorHandler } = require("../helper/dbErrorHandler");
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const {logger } = require('../helper/logger');

exports.productById = (req,res,next,id)=>{
    Product.findById(id).populate('category').exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    });
};

exports.read = (req, res)=>{
    req.product.photo = undefined;
    return res.json({product: req.product})
};

exports.deleteProduct = (req, res)=>{
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Product deleted successfully"
        });
    });
};

exports.updateProduct = (req , res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=>{
        if(err){
            res.status(400).json({
                error: 'Image not uploaded'
            })
        }
        const {
            name,
            description,
            price,
            category,
            quantity,
            shipping
        } = fields;

        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !quantity ||
            !shipping
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let product = req.product;
        product = _.extend(product , fields);

        if (files.photo) {
            
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }


        product.save((err, results)=>{
            if(err){
                return res.status(400).json({error: err});
            }
            res.json({results});
        })
    })
};

exports.create = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=>{
        console.log(fields); 
        if(err){
            res.status(400).json({
                error: 'Image not uploaded'
            })
        }
        const {
            name,
            description,
            price,
            category,
            quantity,
            shipping
        } = fields;

        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !quantity ||
            !shipping
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let product = new Product(fields);

        if (files.photo) {

            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }


        product.save((err, results)=>{
            if(err){
                return res.status(400).json({error: err});
            }
            res.json({results});
        })
    })
    
}   

/* get products that are sold the most 
/products?sortBy=sold&order=desc&limit=4
get the latest product
/products?sortBy=createdAt&order=desc&limit=4
if you are not getting any params then all products must be returned
*/

exports.listOfProducts = (req, res)=>{
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ?req.query.order : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    Product.find()
            .select("-photo")
            .populate('category')
            .sort([[sortBy, order]])
            .limit(limit)
            .exec((err, products)=>{
                if(err){
                    return res.status(400).json({error:"products not found"});
                }
                res.json(products);
            });
};

//Related Products based on category  

exports.relatedProducts = (req, res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find({_id: {$ne: req.product}, category: req.product.category})
            .limit(limit)
            .populate('category', '_id name')
            .exec((err, products)=>{
                if(err){
                    return res.json({error:"Products are not found !!!"})
                }
                res.json(products);
            });

};

//
exports.listProductCategories = (req, res)=>{
    Product.distinct("category", {}, (err, listProduct)=>{
        if(err){
            return res.json({error: err});
        }
        res.json(listProduct);
    })
};

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

exports.listSearch = (req, res, next)=>{
    const query = {};
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: "i" };
        if (req.query.category && req.query.category != "All") {
            query.category = req.query.category;
        }

        Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(products);
        }).select("-photo");
    }
};

exports.decreaseQuantity = (req, res, next) => {
    let bulkOps = req.body.order.products.map(item => {
        return {
            updateOne: {
                filter: { _id: item._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } }
            }
        };
    });

    Product.bulkWrite(bulkOps, {}, (error, products) => {
        if (error) {
            return res.status(400).json({
                error: "Could not update product"
            });
        }
        next();
    });
};
