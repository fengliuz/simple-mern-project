import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import NoteRoute from "./Routes/NoteRoute.js";
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/RateLimiter.js";
dotenv.config();
const app = express();

// middleware
app.use(cors(
 { origin:"http://localhost:5173"}
))
app.use(express.json());
app.use(rateLimiter);
// simple custon middleware
// app.use((req,res,next)=>{
    //     console.log(`request method is ${req.method} and the uri is ${req.url}`);
    //     next()
    // })
    
    app.use("/api/notes", NoteRoute);
    const PORT = process.env.PORT;
    connectDb().then(() => {
      app.listen(PORT, () => {
        console.log("Server run at PORT:", PORT);
      });
    });
