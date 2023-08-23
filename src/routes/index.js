import { Router } from "express";
import routerAuth from "./auth";
import routerProducts from "./products";

const router = Router();

router.use("/products", routerProducts);
router.use("/auth",routerAuth);


export default router;
