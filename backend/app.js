import express from "express";
import userRouter from "./routes/user.js"
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import aiRouter from "./routes/ai.js";
import cors from "cors";
import fs from "fs";
import cron from "node-cron";
import path from "path";
import axios from "axios";
import { fetchNewQuiz, sendNewQuiz } from "./controllers/dailyQuiz.js";
  
  // Schedule the job to run every 24 hours
  cron.schedule('0 0 * * *', () => {
    fetchNewQuiz();
  });
  
  // Initial fetch to populate the quiz file
  fetchNewQuiz();
  
 


export const app = express();

config({
     path: ".env"
});

// Using Middlewares
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())

// Using Routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);
app.use("/api/v1",aiRouter);


console.log(process.env.FRONTEND_URL)


app.get("/",(req,res)=>{
    res.send("Nice working")
});

 // Route to get the daily quiz
 app.get('/api/v1/ai/daily-quiz', (req, res) => {
    sendNewQuiz(req,res);
  });




