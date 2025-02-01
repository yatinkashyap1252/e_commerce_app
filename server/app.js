import cors from "cors";
import express from "express";
import { config } from "dotenv";
import ItemRoutes from "./routes/itemRoutes.js";
import UserRoutes from "./routes/userRoutes.js";
import CartRoutes from "./routes/cartRoutes.js";
import OrderRoutes from "./routes/orderRoutes.js";
import { dbConnection } from "./database/dbConnection.js";

const app = express();
config({ path: "./.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

app.use(
  cors({
    credentials: true,
    methods: ["PUT", "POST", "DELETE", "GET"],
  })
);

dbConnection();

app.use("/api/v1/item", ItemRoutes);
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/cart", CartRoutes);
app.use("/api/v1/order",OrderRoutes)

app.use("/api/v1/images", express.static("uploads"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
