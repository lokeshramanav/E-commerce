const { Order, CartItem } = require("../models/order");
const { errorHandler } = require("../helper/dbErrorHandler");
const User = require("../models/user")

exports.create = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json(data);
    });
};

exports.addOrderToUserPurchaseHistory = (req, res , next)=>{
    let history = []
    req.body.order.products.forEach((item)=>{
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        })
    })

    User.findOneAndUpdate({_id: req.profile._id}, {$push:{history:history}}, {new: true} , (err, data)=>{
        if(err){
            return res.status(400).json({error: "could not update purchase history"});
        }
        next();
    })

}

exports.listOrders = (req , res)=>{
    Order.find()
    .populate("user", "_id, name, address")
    .sort("-created")
    .exec((err, orders) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json(orders);
    });
};

exports.getStatusValues=(req, res)=>{
    res.json(Order.schema.path("status").enumValues);
}

exports.updateStatusValues=(req, res)=>{
    Order.update(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } },
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(order);
        }
    );
}

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.order = order;
            next();
        });
};
