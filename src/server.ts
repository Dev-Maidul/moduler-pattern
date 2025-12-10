import express, { Request, Response } from "express";
import {Pool} from "pg";
import { userRoutes } from "./modules/users/user.routes";
import { initDB } from "./config/db";
import { config } from "./config";
import { authRoute } from "./modules/auth/auth.route";
const app=express();

app.use(express.json());
const port=config.port;
initDB();

app.use("/api/v1/users",userRoutes)

app.use("/api/v1/auth",authRoute)


app.get("/",(req:Request, res:Response)=>{
    res.status(200).json({
        message:"This is the root url",
        path:req.url
    })
})

app.listen(3000,()=>{
    console.log("Server is running on ",3000);
})