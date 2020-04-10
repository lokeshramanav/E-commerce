const express = require('express');
const productRouter = express.Router();

const {create , productById , read , deleteProduct , updateProduct} = require('../controller/product');

const { requireSignin, isAuth, isAdmin } = require("../controller/user");
const { userById } = require("../controller/userAfterAuth");

productRouter.post("/create/:userId" ,requireSignin,isAuth,isAdmin, create);
productRouter.get("/:productId" , read);
productRouter.delete("/delete/:productId" , requireSignin, isAuth, isAdmin, deleteProduct);
productRouter.put("/update/:productId/:userId" , requireSignin, isAuth, isAdmin, updateProduct);

productRouter.param("userId", userById);
productRouter.param("productId", productById);

module.exports = productRouter;