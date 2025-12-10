import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

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
  console.log(matchPassword)
  if(!matchPassword){
     throw new Error("Invalid Credential");    
  }
  return user.rows[0];
}

export const authServices = {
  loginUserIntoDB,
};
