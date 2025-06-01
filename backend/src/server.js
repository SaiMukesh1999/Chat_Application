import express from "express"
import dotenv from "dotenv"
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.route.js'
import chatRoutes from './routes/chat.route.js'
import { connectionDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors";
import path from "path";


dotenv.config()


const app = express()

const PORT = process.env.PORT
const __dirname = path.resolve();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,

}))

app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/chat',chatRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/Chat_App/dist")));

  app.get("*any", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/Chat_App","dist","index.html"));
  });
}
 

app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
    connectionDB()
}) 