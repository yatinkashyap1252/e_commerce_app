import UserModel from "../models/users.js";

export const addToCart = async (req, res) => {
  try {
    let userData = await UserModel.findOne({ _id: req.body.userId });
    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await UserModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const removeFromCart = async (req,res) => {
    try {
        let userData=await UserModel.findById(req.body.userId)
        if(!userData){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        let cartData=await userData.cartData
        if(!cartData[req.body.itemId]){
            return res.status(400).json({
                success:false,
                message:"Item not found in cart"
            })
        }
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1
        }
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData})
        return res.status(200).json({
            success:true,
            message:"Item removed from cart successfully"
        })
    } catch (error) {
        console.error("Error in removeFromCart:",error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
};

export const getCart = async (req,res) => {
    try {
        let userData=await UserModel.findById(req.body.userId)
        if(!userData){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        let cartData=await userData.cartData
        return res.status(200).json({
            success:true,
            cartData
        })
    } catch (error) {
        console.error("Error in getCart:",error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
};
