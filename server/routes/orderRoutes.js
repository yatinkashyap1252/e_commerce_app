import express from "express";
import { getAllOrders, getOrders, placeOrder, updateOrders, verifyOrder } from "../controllers/orderController.js";
import authMiddleware from "../middlewares/auth.js";

const router=express.Router()

router.post("/placeorder",authMiddleware,placeOrder)
router.post("/verify",verifyOrder)
router.post("/getorders",authMiddleware,getOrders)
router.get("/allorders",getAllOrders)
router.post("/update",updateOrders)

export default router