import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import jwt from "jsonwebtoken";
export const secreet="lkfdslkjfdsl;jafs;jsfdljdsfsdf"
const loginUserIntoDB = async (email: string, password: string) => {
  const user = await pool.query(
    `
        SELECT * FROM users WHERE email=$1
        `,
    [email]
  );
  if (user.rows.length === 0) {
    throw new Error("User not found with this email");
  }
  const matchPassword=bcrypt.compare(password,user.rows[0].password);
  
  if(!matchPassword){
     throw new Error("Invalid Credential");    
  }
  const payload={
    id:user.rows[0].id,
    name:user.rows[0].name,
    email:user.rows[0].email,
    role:user.rows[0].role
  }
  const secreet="lkfdslkjfdsl;jafs;jsfdljdsfsdf"
  const token=jwt.sign(payload,secreet,{expiresIn:"7d"});
  delete user.rows[0].password;
  return {token,user:user.rows[0]};
}

export const authServices = {
  loginUserIntoDB,
};
