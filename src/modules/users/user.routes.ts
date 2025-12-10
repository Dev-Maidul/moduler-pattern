import {  Router } from "express";
import { pool } from "../../config/db";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router= Router();
router.post("/",userController.createUser);
router.get("/",auth("admin"), userController.getAllUsers);


export const userRoutes=router;