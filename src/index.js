import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js"; // ✅ Import properly

dotenv.config();

const app = express();

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err);
})


