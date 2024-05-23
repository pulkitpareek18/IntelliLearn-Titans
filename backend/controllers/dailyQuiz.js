import { daily_quiz } from "./ai.js";
import fs from "fs";
import path from "path";
const quizFilePath = path.join(path.resolve(), 'daily_quiz.json');

// Function to fetch a new quiz and save it to the JSON file
export async function fetchNewQuiz() {
    try {
        
      let quizData = await daily_quiz();
      fs.writeFileSync(quizFilePath, quizData);
      console.log('New quiz fetched and saved.');
      console.log(quizData)
    } catch (error) {
      console.error('Error fetching the quiz:', error);
    }
}

export async function sendNewQuiz(req,res) { 
    let quizData = JSON.parse(fs.readFileSync(quizFilePath, 'utf-8'));
    res.json(quizData);
}

