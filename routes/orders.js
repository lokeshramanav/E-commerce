const express = require("express");
const router = express.Router();

const { requireSignin, isAuth ,isAdmin} = require("../controller/user");
const { userById } = require("../controller/userAfterAuth");
const { create , addOrderToUserPurchaseHistory , listOrders , getStatusValues, updateStatusValues, orderById} = require("../controller/order");
const { decreaseQuantity } = require("../controller/product");


router.post("/order/create/:userId", requireSignin, isAuth, addOrderToUserPurchaseHistory,decreaseQuantity, create);
router.get("/order/list/:userId",  requireSignin, isAuth , isAdmin , listOrders);
router.get("/order/status-values/:userId",  requireSignin, isAuth , isAdmin , getStatusValues);
router.put("/order/:orderId/status/:userId", requireSignin, isAuth , isAdmin , updateStatusValues)
router.param("userId", userById);
router.param("orderId" , orderById);

module.exports = router;
