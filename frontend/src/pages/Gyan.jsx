import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaArrowUp, FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaVolumeMute } from "react-icons/fa"; // Import the scroll-to-top, microphone, and volume icons
import { Navigate } from "react-router-dom";
import { Context } from "../main";

function Gyan() {

    const { isAuthenticated } = useContext(Context);
    if (!isAuthenticated) return <Navigate to={"/login"} />;

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [generatingAnswer, setGeneratingAnswer] = useState(false);
    const [history, setHistory] = useState([]);
    const [showScroll, setShowScroll] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false); // Initialize isSpeaking to false
    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);

    const promptBody = `Your name is Gyan and you are an student homework assitant focused to help students in the easiest way possible.
                        You are developed by Team Titans. You are very intelligent and can answer any question asked to you.
                        If any explict question is asked to you please deny to answer that. 
                        You can provide youtube video links to students for study of any topic. You will now response to this prompt. 
                        Prompt:`

    useEffect(() => {
        const handleScroll = () => {
            setShowScroll(window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            console.error('Speech Recognition API not supported in this browser');
            return;
        }

        recognitionRef.current = new window.webkitSpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onstart = () => {
            setIsListening(true);
        };

        recognitionRef.current.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            setQuestion(transcript);
        };
    }, []);

    const handleSpeechRecognition = () => {
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
        setIsListening(prevState => !prevState); // Toggle the listening state
    };

    async function generateAnswer(e) {
        setGeneratingAnswer(true);
        e.preventDefault();
        setAnswer("Loading your answer... \n It might take up to 10 seconds");

        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
                method: "post",
                data: {
                    contents: [{ parts: [{ text: promptBody+question }] }],
                },
            });

            const newAnswer = response.data.candidates[0].content.parts[0].text;
            setAnswer(newAnswer);
            setHistory([...history, { question, answer: newAnswer }]);
            if(isSpeaking)  readAnswerOutLoud(newAnswer); // Read out the answer when generated only when speaker is on

        } catch (error) {
            console.log(error);
            setAnswer("Sorry - Something went wrong. Please try again!");
        }

        setQuestion("");
        setGeneratingAnswer(false);
    }
    
    const readAnswerOutLoud = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
    
        // Find an Indian English voice
        const indianVoice = voices.find(voice => 
            voice.lang === 'en-IN' || voice.name.toLowerCase().includes('india')
        );
    
        // Set the voice if an Indian English voice is found
        if (indianVoice) {
            utterance.voice = indianVoice;
        }
    
        synthRef.current.speak(utterance);
    };
    

    const stopSpeaking = () => {
        synthRef.current.cancel(); // Cancel the current text-to-speech process
    };

    const toggleSpeaking = () => {
        if(isSpeaking){
            setIsSpeaking(false);
        }
        else{
            setIsSpeaking(true);
        }
        stopSpeaking();
    };

    

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-gray-100 mt-5 min-h-screen flex flex-col items-center justify-center">
            <div className="w-2/4 mt-32 bg-white shadow-lg rounded-lg p-8 mb-8">
                <h1 className="text-4xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                    Gyan AI
                </h1>
                <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                    Your Homework Assistant
                </h3>

                <textarea
                    required
                    className="border rounded w-full h-40 my-2 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter your question here..."
                ></textarea>
                <div className="flex items-center justify-between">
                    <button
                        onClick={generateAnswer}
                        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        disabled={generatingAnswer}
                    >
                        {generatingAnswer ?
                            <div className="flex align-center justify-center">
                                Generate Answer
                                <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826
10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            : "Generate Answer"}
                    </button>

                    <div className="flex items-center">
                        <button
                            onClick={handleSpeechRecognition}
                            className={` p-2 rounded-full ${isListening ? 'bg-red-500' : 'bg-blue-500'} mx-2 text-white hover:${isListening ? 'bg-red-600' : 'bg-green-600'} transition-all duration-300`}
                            title="Start/Stop Speech Recognition"
                        >
                            {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
                        </button>
                        <button
                            onClick={toggleSpeaking}
                            className={` p-2 rounded-full ${isSpeaking ? 'bg-red-500' : 'bg-blue-500'} mx-2 text-white hover:${isSpeaking ? 'bg-red-600' : 'bg-green-600'} transition-all duration-300`}
                            title={isSpeaking ? "Mute" : "Unmute"}
                        >
                            {isSpeaking ? <FaVolumeMute /> : <FaVolumeUp />}
                        </button>
                    </div>

                </div>
            </div>
            <div className="w-2/4 response-container">
                {history.map((item, index) => (
                    <div key={index} className="mb-4">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                            >
                                {`#### **Query:**\t**"${item.question}"**\n\n### **Response:**\n${item.answer}`}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}
            </div>
            {showScroll && (
                <button
                    onClick={scrollTop}
                    className="fixed bottom-10 right-10 p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-300"
                    title="Scroll to top"
                >
                    <FaArrowUp />
                </button>
            )}
        </div>
    );
}

export default Gyan;
