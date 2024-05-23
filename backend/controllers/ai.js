import axios from 'axios';

export const ai = async (req, res) => {


    let promptBody = `return a quiz from the given prompt having the same format as given below return an json object with question, options and answer, and return only the json data without any backticks or any other format, you will be given the subject, difficulty and no. of questions to generate
    
    format to be followed:
    don't send the below object, instead generate one with the given prompot in the below format
    keep the correct answer option different do not have a same option with correct answer for all questions
    for ex. do not keep option 1 as correct answer for all questions keep it different for each question


    questions = [
        {
          question: "What is the capital of France?",
          options: ["London", "Paris", "Berlin", "Rome"],
          answer: "Paris"
        },
        {
          question: "Which planet is known as the Red Planet?",
          options: ["Earth", "Mars", "Venus", "Jupiter"],
          answer: "Mars"
        },
        {
          question: "Who painted the Mona Lisa?",
          options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
          answer: "Leonardo da Vinci"
        },
        {
          question: "What is the largest mammal in the world?",
          options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
          answer: "Blue Whale"
        },
        {
          question: "Which country is known as the Land of the Rising Sun?",
          options: ["China", "Japan", "India", "South Korea"],
          answer: "Japan"
        },
        {
          question: "Who wrote 'Romeo and Juliet'?",
          options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Mark Twain"],
          answer: "William Shakespeare"
        },
        {
          question: "What is the chemical symbol for water?",
          options: ["H2O", "CO2", "NaCl", "O2"],
          answer: "H2O"
        },
        {
          question: "Which gas is most abundant in Earth's atmosphere?",
          options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
          answer: "Nitrogen"
        },
        {
          question: "Who discovered penicillin?",
          options: ["Marie Curie", "Louis Pasteur", "Alexander Fleming", "Albert Einstein"],
          answer: "Alexander Fleming"
        },
        {
          question: "What is the smallest bone in the human body?",
          options: ["Femur", "Cranium", "Stapes", "Humerus"],
          answer: "Stapes"
        }
      ];
      
      
      
      
      
      `
      
      
      ;

      console.log(req.body)

    try {
        const response = await axios({
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCZQxP0D_MoFSYaMd7vYU88AWIyTBf-54M`,
            method: "post",
            data: {
                contents: [{ parts: [{ text: req.body.prompt + promptBody }] }],
            },
        });

        const newAnswer = response.data.candidates[0].content.parts[0].text;
        res.send(newAnswer)
    } catch (error) {
        console.log(error);
        res.send("Error")
    }


}

export const aiVideos = async (req, res) => {


    let promptBody = `return a array of youtube videos for the given topic/subject/class from the prompt as per given language, your output will always be in english, the language specified refers to the language of the video spoken by the tutor, and topic specified classified into beginner, intermediate and advanced levels, return the array of videos in the below format
    
    format to be followed:
    don't send the below object, instead generate one with the given prompot in the below format


    {
        "videos": {
            "beginner": [
                {
                    "title": "Video Title",
                    "link": "https://www.youtube.com/watch?v=videoID1"
                },
                {
                    "title": "Video Title",
                    "link": "https://www.youtube.com/watch?v=videoID2"
                },
                {
                    "title": "Video Title",
                    "link": "https://www.youtube.com/watch?v=videoID3"
                }
            ],
            "intermediate": [
                {
                    "title": "Video Title",
                    "link": "https://www.youtube.com/watch?v=videoID4"
                },
                {
                    "title": "Video Title",
                    "link": "https://www.youtube.com/watch?v=videoID5"
                },
                {
                    "title": "Video Title",
                    "link": "https://www.youtube.com/watch?v=videoID6"
                }
            ],
            "advanced": [
                {
                    "title": "Video Title",
                    "link": "https://www.youtube.com/watch?v=videoID7"
                },
                {
                    "title": "Video Title",
                    "link": "https://www.youtube.com/watch?v=videoID8"
                },
                {
                    "title": "Video Title",
                    "link": "https://www.youtube.com/watch?v=videoID9"
                }
            ]
        }
    }
    
      
      
      
      
      
      `
      
      
      ;

      console.log(req.body)

    try {
        const response = await axios({
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCZQxP0D_MoFSYaMd7vYU88AWIyTBf-54M`,
            method: "post",
            data: {
                contents: [{ parts: [{ text: req.body.prompt + promptBody }] }],
            },
        });

        const newAnswer = response.data.candidates[0].content.parts[0].text;
        res.send(newAnswer)
    } catch (error) {
        console.log(error);
        res.send("Error")
    }


}

export const daily_quiz = async () => {


    let promptBody = `return a daily quiz from the given prompt having the same format as given below return an json object with question, options and answer, and return only the json data without any backticks or any other format, you will have to choose a random general subject, difficulty will be random and no. of questions are 10
    
    format to be followed:
    don't send the below object, instead generate one with the given prompot in the below format
    keep the correct answer option different do not have a same option with correct answer for all questions
    for ex. do not keep option 1 as correct answer for all questions keep it different for each question


    questions = [
        {
          question: "What is the capital of France?",
          options: ["London", "Paris", "Berlin", "Rome"],
          answer: "Paris"
        },
        {
          question: "Which planet is known as the Red Planet?",
          options: ["Earth", "Mars", "Venus", "Jupiter"],
          answer: "Mars"
        },
        {
          question: "Who painted the Mona Lisa?",
          options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
          answer: "Leonardo da Vinci"
        },
        {
          question: "What is the largest mammal in the world?",
          options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
          answer: "Blue Whale"
        },
        {
          question: "Which country is known as the Land of the Rising Sun?",
          options: ["China", "Japan", "India", "South Korea"],
          answer: "Japan"
        },
        {
          question: "Who wrote 'Romeo and Juliet'?",
          options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Mark Twain"],
          answer: "William Shakespeare"
        },
        {
          question: "What is the chemical symbol for water?",
          options: ["H2O", "CO2", "NaCl", "O2"],
          answer: "H2O"
        },
        {
          question: "Which gas is most abundant in Earth's atmosphere?",
          options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
          answer: "Nitrogen"
        },
        {
          question: "Who discovered penicillin?",
          options: ["Marie Curie", "Louis Pasteur", "Alexander Fleming", "Albert Einstein"],
          answer: "Alexander Fleming"
        },
        {
          question: "What is the smallest bone in the human body?",
          options: ["Femur", "Cranium", "Stapes", "Humerus"],
          answer: "Stapes"
        }
      ];
      
      
      
      
      
      `
      
      
      ;

    try {
        const response = await axios({
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCZQxP0D_MoFSYaMd7vYU88AWIyTBf-54M`,
            method: "post",
            data: {
                contents: [{ parts: [{ text: promptBody }] }],
            },
        });

        const newAnswer = response.data.candidates[0].content.parts[0].text;
        return(newAnswer)
    } catch (error) {
        console.log(error);
        return("Error")
    }


}