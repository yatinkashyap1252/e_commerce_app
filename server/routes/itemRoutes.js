import express from "express";
import multer from "multer";
import { addItem, getListItem, removeItem, updateItem } from "../controllers/ItemController.js";

const router=express.Router()

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const uploads=multer({storage:storage})

router.post("/add",uploads.single("image"),addItem)
router.get("/getlist",getListItem)
router.delete("/remove/:id",removeItem)
router.put("/update",uploads.single("image"),updateItem)

export default router