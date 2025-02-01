import express from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.post("/remove", authMiddleware, removeFromCart);
router.post("/getcart", authMiddleware, getCart);

export default router;
