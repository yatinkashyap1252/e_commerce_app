import Stripe from "stripe";
import OrderModel from "../models/orderModels.js";
import User from "../models/users.js";

const key =
  "sk_test_51QjoJZIPQK0DXI9NtUJb9TC3IarwsHE4XBE1KyYJUOGXA0ei7mOlHMMTNfLszjfq6vIdlOGywP9KYJqwdQXrhsIP00HsVGlCzM";
const stripe = new Stripe(key);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";
  try {
    // Create a new order
    const newOrder = new OrderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    // Save the order to the database
    await newOrder.save();

    // Clear the user's cart
    await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Prepare line items for Stripe checkout
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd", // Fixed "us" to "usd"
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Fixed typo in `unit_Amount`
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 5.99 * 100,
      },
      quantity: 1,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // Send session URL to the frontend
    return res.status(200).json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to place order. Please try again later.",
      error: error.message,
    });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await OrderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });
      return res
        .status(200)
        .json({ success: true, message: "Order confirmed successfully" });
    } else {
      await OrderModel.findByIdAndDelete(orderId);
      return res
        .status(200)
        .json({ success: false, message: "Order cancelled successfully" });
    }
  } catch (error) {
    console.error("Error verifying order:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify order. Please try again later.",
      error: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    
    // console.log(req.body.userId);
    
    const orders = await OrderModel.find({ userId: req.body.userId });
    return res.status(200).json({ success: true, data:orders });
  } catch (error) {
    console.error("Error getting orders:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get orders. Please try again later.",
      error: error.message,
    });
  }
};

const getAllOrders=async(req,res)=>{
  try {
    const orders=await OrderModel.find({})
    return res.status(200).json({success:true,data:orders})
  } catch (error) {
    console.error("Error getting orders:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get orders. Please try again later.",
      error: error.message,
    });
  }
}

const updateOrders=async(req,res)=>{
  try {
    await OrderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    return res.status(200).json({success:true,message:"Order updated successfully"})
  } catch (error) {
    console.error("Error updating orders:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update orders. Please try again later.",
      error: error.message,
    });
  }
}

export { placeOrder, verifyOrder, getOrders,getAllOrders ,updateOrders};
