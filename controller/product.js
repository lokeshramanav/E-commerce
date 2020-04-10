const Product = require('../models/product');
const { errorHandler } = require("../helper/dbErrorHandler");
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const {logger } = require('../helper/logger');

exports.productById = (req,res,next,id)=>{
    Product.findById(id).exec((err, product) => {
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