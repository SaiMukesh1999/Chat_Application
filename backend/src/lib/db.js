import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
export const connectionDB= async()=>{
    try{
        const conn =await mongoose.connect(process.env.MONGO_DB);
        console.log(`mongo db connection: ${conn.connection.host}`)
    }catch(error){
        console.log(error)
    }
}