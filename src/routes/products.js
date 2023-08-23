import { Router } from "express";
const routerProducts = Router ();


import {
    createProduct,
    deleteProduct,
    editProduct,
    getAll,
    getDetail,
    getDetailLessThan,
  } from "../controller/product.js";
import { checkPermission } from "../middlewares/checkPermission.js";

  
// get all
routerProducts.get("/", getAll);
// get detail
routerProducts.get("/:id", getDetail);
// get less than
routerProducts.get("/products/lessthan", getDetailLessThan);
// create
routerProducts.post("/",checkPermission, createProduct);
// edit
routerProducts.put("/:id",checkPermission ,editProduct);
// delete
routerProducts.delete("/:id",checkPermission, deleteProduct);
// tạo request

export default routerProducts;
