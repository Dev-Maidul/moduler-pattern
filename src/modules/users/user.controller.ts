import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser=(async (req:Request,res:Response)=>{
    
  try {
    const result= await userServices.createUser(req.body);
    return  res.status(201).json({
        success:true,
        message:"User created Successfully",
        data:result.rows[0]
    })
  } catch (error:any) {
    return   res.status(500).json({
        success:false,
        message:error.message
        
    })
  }
})



export const userController={
    createUser,
}