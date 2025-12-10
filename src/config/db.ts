import { Pool } from "pg";
import { config } from ".";

export const pool=new Pool({
    connectionString: 'postgresql://neondb_owner:npg_u32UrhTRFOHg@ep-hidden-hall-a8vfzd7s-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require'
});

export const initDB=async ()=>{
    await pool.query(`
       CREATE TABLE IF NOT EXISTS users(
       id SERIAL PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       age INT,
       email VARCHAR(100) NOT NULL UNIQUE,
       password TEXT NOT NULL,
       role VARCHAR(100) NOT NULL,
       created_at TIMESTAMP DEFAULT NOW(),
       updated_at TIMESTAMP DEFAULT NOW()
       ) 
        `)
        console.log("Database connected");
}