import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

const createUser = async(payload: Record<string,unknown>) => {
  const { name, email, password,role } = payload;
  const hashPassword= await bcrypt.hash(password as string,12);
  const result = await pool.query(
    `
        INSERT INTO users (name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *
        `,
    [name, email, hashPassword,role]
  );
  delete result.rows[0].password;
  return result;
};

const getAllUser=async()=>{
  const result=await pool.query(`
      SELECT id,name,age,email,created_at,updated_at from users
    `)
    
    return result;
}
export const userServices={
    createUser,
    getAllUser
}