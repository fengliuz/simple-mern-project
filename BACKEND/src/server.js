import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import NoteRoute from "./Routes/NoteRoute.js";
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/RateLimiter.js";
import path from "path";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();
// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}
app.use(express.json());
app.use(rateLimiter);
connectDb();
// simple custon middleware
// app.use((req,res,next)=>{
//     console.log(`request method is ${req.method} and the uri is ${req.url}`);
//     next()
// })

app.use("/api/notes", NoteRoute);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../FRONTEND", "dist", "index.html"));
  });
}
export default  app;
