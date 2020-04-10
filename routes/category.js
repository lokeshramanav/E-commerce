const express = require('express');
const categoryRouter = express();

const {create , categoryById , read, updateCategory, deleteCategory , listOfCategories} = require('../controller/category');

const { requireSignin, isAuth, isAdmin } = require("../controller/user");
const { userById } = require("../controller/userAfterAuth");

categoryRouter.post("/create/:userId" ,requireSignin, isAuth, isAdmin, create);
categoryRouter.get("/read/:categoryId" , read);
categoryRouter.put("/:categoryId/:usedId", requireSignin, isAuth, isAdmin, updateCategory);
categoryRouter.delete("/:categoryId/:usedId", requireSignin, isAuth, isAdmin, deleteCategory);
categoryRouter.get("/listCategories", listOfCategories);

categoryRouter.param("userId", userById);
categoryRouter.param("categoryId", categoryById);

module.exports = categoryRouter;
