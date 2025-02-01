import mongoose from "mongoose";

export const dbConnection =async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "shopping_project",
    })
    .then(() => console.log("DB connected successfully!"))
    .catch((err) => console.log(`Error occur:${err}`));
};
