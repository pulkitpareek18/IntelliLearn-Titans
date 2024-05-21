import { useContext, useState } from 'react';
import arrowIcon from '../assets/arrowIcon.png';
import backgroundImage from '../assets/Bg.png'; // Add your background image import
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Context } from '../main';

const Quiz = () => {

    const { isAuthenticated } = useContext(Context);
    if (!isAuthenticated) return <Navigate to={"/login"} />;

    // Define the state for storing the current question index, whether the answer is correct, the score, user responses, and review mode
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [responses, setResponses] = useState([]);
    const [reviewMode, setReviewMode] = useState(false);

    const [subject, setSubject] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [noOfQuestions, setNoOfQuestions] = useState(10);
    const [generating, setGenerating] = useState(false);


    const [questions, setQuestions] = useState([
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
        },
        // Add more questions here
    ]
    );





    const generateQuizhandler = async (e) => {
        setGenerating(true);
        e.preventDefault();

        try {
            let headersList = {
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({ "prompt": `subject: ${subject}, difficulty: ${difficulty}, noOfQuestions: ${noOfQuestions}` });

            let reqOptions = {
                url: `${import.meta.env.VITE_AI_API_URL}`,
                method: "POST",
                headers: headersList,
                data: bodyContent,
            }

            let response = await axios.request(reqOptions);

            // Now you can use the questionsArray in your code
            console.log(response.data.questions);
            setQuestions(response.data.questions);

        } catch (error) {
            console.log(error)
        }

        setGenerating(false);

    }



    // Function to handle option selection
    const handleOptionSelect = (selectedOption) => {
        // Check if the selected option is correct
        const isAnswerCorrect = selectedOption === questions[currentQuestion].answer;
        // Update state variable
        setIsCorrect(isAnswerCorrect);
        // Increment the score if the answer is correct
        if (isAnswerCorrect) {
            setScore(score + 1);
        }
        // Store the response
        const newResponses = [...responses];
        newResponses[currentQuestion] = { question: questions[currentQuestion].question, selectedOption, isCorrect: isAnswerCorrect };
        setResponses(newResponses);
    };

    // Function to move to the next question
    const moveToNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            // Move to the next question
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // If it was the last question, mark the quiz as completed
            setCurrentQuestion(currentQuestion + 1);
        }
        // Reset isCorrect state variable
        setIsCorrect(null);
    };

    // Function to restart the quiz
    const restartQuiz = () => {
        setCurrentQuestion(0);
        setIsCorrect(null);
        setScore(0);
        setResponses([]);
        setReviewMode(false);
    };

    // Function to toggle review mode
    const toggleReviewMode = () => {
        setReviewMode(!reviewMode);
    };

    // Calculate progress percentage
    const progressPercentage = ((currentQuestion) / questions.length) * 100;

    // Render the current question and options
    return (
        <div>


            {/* AI Quiz Form */}

            <form onSubmit={generateQuizhandler} className="mt-24 mx-auto flex flex-col align-center">

                <div className='mx-auto flex justify-center'>
                    <div className='w-64 mx-2'>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                        <input value={subject} onChange={(e) => setSubject(e.target.value)} type="text" id="subject" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="General Knowledge" required />
                    </div>
                    <div className='w-50 mx-2'>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Difficulty</label>
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                            <option value="Very Hard">Very Hard</option>
                        </select>
                    </div>
                    <div className="w-64 mx-2">
                        <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. of Questions</label>
                        <input type="number" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 borde rborder-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={noOfQuestions} onChange={(e) => setNoOfQuestions(e.target.value)} required />
                    </div>

                </div>

                <div className='flex align-center justify-center'>
                    <button disabled={generating} className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4">
                        Generate Quiz using Gyan-AI
                    </button>

                    {generating && (
                        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                            <span className="sr-only">Loading...</span>
                        </div>)
                    }

                </div>

            </form>




            {/* Quiz Content */}
            <div
                className="max-w-md mx-auto my-10 p-6 bg-white bg-cover bg-center rounded-lg shadow-md"
                style={{ backgroundImage: `url(${backgroundImage})`, backgroundBlendMode: 'overlay' }}
            >
                {reviewMode ? (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Review Your Mistakes</h1>
                        {responses.map((response, index) => (
                            <div key={index} className="mb-4">
                                <h2 className="text-lg mb-2">Question {index + 1}: {response.question}</h2>
                                <p className={`mb-2 ${response.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                                    Your answer: {response.selectedOption} - {response.isCorrect ? 'Correct' : 'Incorrect'}
                                </p>
                                {!response.isCorrect? (<p className={`mb-2 text-green-500`}>Correct Answer: {questions[index].answer}</p>):""}


                            </div>
                        ))}
                        <button
                            className="block w-full py-2 px-4 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-600"
                            onClick={restartQuiz}
                        >
                            Restart Quiz
                        </button>
                    </div>
                ) : (
                    <div>
                        {currentQuestion < questions.length ? (
                            <div>
                                {/* Progress Bar */}
                                <div className="progress-container">
                                    <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                                </div>
                                <h1 className="text-2xl font-bold mb-4">Question {currentQuestion + 1}</h1>
                                <h2 className="text-lg mb-5">{questions[currentQuestion].question}</h2>
                                {/* Display message if the answer is correct */}
                                {isCorrect !== null && (
                                    <div className={`mb-4 text-center ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                                        {isCorrect ? 'Correct!' : 'Incorrect!'}
                                    </div>
                                )}
                                {/* Display options */}
                                <div className="grid grid-cols-2 gap-4">
                                    {questions[currentQuestion].options.map((option, index) => (
                                        <button
                                            key={index}
                                            className={`block w-full py-2 px-4 mb-2 rounded-full
                        ${isCorrect !== null && option === questions[currentQuestion].answer ? 'bg-green-500 text-white' : ''}
                        ${isCorrect !== null && option === responses[currentQuestion]?.selectedOption && option !== questions[currentQuestion].answer ? 'bg-red-500 text-white' : ''}
                        ${isCorrect === null ? 'bg-blue-700 text-white hover:bg-blue-500 focus:outline-none focus:bg-blue-600' : ''}
                      `}
                                            onClick={() => handleOptionSelect(option)}
                                            disabled={isCorrect !== null}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                {/* Display next question button with arrow icon */}
                                <button
                                    className="flex items-center justify-center w-half py-2 px-4 mt-3 ml-32 bg-blue-900 text-white rounded-full hover:bg-gray-800 focus:outline-none focus:bg-blue-600"
                                    onClick={moveToNextQuestion}
                                    disabled={isCorrect === null}
                                >
                                    Next Question
                                    <img src={arrowIcon} alt="Arrow Icon" className="ml-2 w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <h1 className="text-2xl font-bold mb-4">Quiz Finished!</h1>
                                <p className="text-lg mb-5">Congratulations! You have completed the quiz.</p>
                                <p className="text-lg mb-5">Your score is: {score} out of {questions.length}</p>
                                <button
                                    className="block w-full py-2 px-4 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-600"
                                    onClick={restartQuiz}
                                >
                                    Restart Quiz
                                </button>
                                <button
                                    className="block w-full py-2 px-4 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-600"
                                    onClick={toggleReviewMode}
                                >
                                    Review Your Mistakes
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>


        </div>
    );
};

export default Quiz;