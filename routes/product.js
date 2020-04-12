const express = require('express');
const productRouter = express.Router();

const {photo , create , productById , read , deleteProduct , updateProduct , listOfProducts, relatedProducts , listProductCategories , listBySearch} = require('../controller/product');

const { requireSignin, isAuth, isAdmin } = require("../controller/user");
const { userById } = require("../controller/userAfterAuth");

productRouter.post("/create/:userId" ,requireSignin,isAuth,isAdmin, create);
productRouter.get("/:productId" , read);
productRouter.delete("/delete/:productId/:userId" , requireSignin, isAuth, isAdmin, deleteProduct);
productRouter.put("/update/:productId/:userId" , requireSignin, isAuth, isAdmin, updateProduct);
productRouter.get("/product/listProducts", listOfProducts);
productRouter.get("/product/relatedProducts/:productId", relatedProducts);
productRouter.get("/products/categories", listProductCategories);
productRouter.post("/products/by/search", listBySearch);
productRouter.get("/product/photo/:productId", photo);

productRouter.param("userId", userById);
productRouter.param("productId", productById);

module.exports = productRouter;