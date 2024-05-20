import React, { useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Context } from '../main';
import backgroundImage from '../assets/homeBG.jpg';
import logo from '../../public/intellilearn.jpeg';

function Home() {
    const { isAuthenticated } = useContext(Context);

    // if (!isAuthenticated) return <Navigate to={"/login"} />;

    return (
        <>
            <div>

                <div className="relative h-screen">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white bg-opacity-75 w-3/4 md:w-2/3 lg:w-1/2 p-8 rounded-lg shadow-lg">
                            <div className="text-center mb-6">
                                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">IntelliLearn</h1>
                                <h2 className="text-xl md:text-2xl text-gray-700">A Personalized Learning Experience</h2>
                            </div>
                            <div className="text-base md:text-lg text-gray-600 text-center">
                                <p>Welcome to IntelliLearn, a revolutionary personalized learning environment where learning happens at your pace! Explore our endless learning materials or solve your doubts with our state-of-the-art A.I. assistant, Gyan AI. Never Stop Learning.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <section className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-gray-900">Features</h2>
                            <p className="text-xl text-gray-500">Explore the amazing features we offer</p>
                        </div>
                        <div className="flex flex-wrap -m-4">
                            <div className="p-4 w-full md:w-1/3">
                                <div className="h-full bg-gray-100 p-8 rounded shadow-md">
                                    <h3 className="text-xl font-medium title-font mb-4">Personalized Quizzes</h3>
                                    <p className="leading-relaxed">Our system generates quizzes tailored to your learning pace and areas of improvement.</p>
                                </div>
                            </div>
                            <div className="p-4 w-full md:w-1/3">
                                <div className="h-full bg-gray-100 p-8 rounded shadow-md">
                                    <h3 className="text-xl font-medium title-font mb-4">The Amazing GyanAI</h3>
                                    <p className="leading-relaxed">Your personal learning assistant keeps track of your learning and solves all doubts.</p>
                                </div>
                            </div>
                            <div className="p-4 w-full md:w-1/3">
                                <div className="h-full bg-gray-100 p-8 rounded shadow-md">
                                    <h3 className="text-xl font-medium title-font mb-4">Endless Study Materials</h3>
                                    <p className="leading-relaxed">Explore our collection of endless books and study materials. Enjoy and take a dive into the sea of knowledge.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Get Started Section */}
                <section className="py-16 bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-extrabold text-gray-900">Get Started</h2>
                            <p className="mt-4 text-xl text-gray-600">Start your personalized learning journey today</p>
                        </div>
                        <div className="flex flex-wrap -m-4">
                            <div className="p-4 w-full md:w-1/2">
                                <div className="h-full bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:border-gray-300 transition-colors duration-300">
                                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Take a Quiz</h3>
                                    <p className="leading-relaxed text-gray-600 mb-6">Test your knowledge with our personalized quizzes and track your progress.</p>
                                    <Link
                                        to="/quiz"
                                        className="mt-4 inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium text-lg rounded-lg transition-colors duration-300 hover:from-purple-500 hover:via-pink-500 hover:to-red-500"
                                    >
                                        Start Quiz
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4 w-full md:w-1/2">
                                <div className="h-full bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:border-gray-300 transition-colors duration-300">
                                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Gyan AI</h3>
                                    <p className="leading-relaxed text-gray-600 mb-6">Get instant answers to your questions and clear your doubts with our AI-powered assistant.</p>
                                    <Link
                                        to="/gyanai"
                                        className="mt-4 inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium text-lg rounded-lg transition-colors duration-300 hover:from-purple-500 hover:via-pink-500 hover:to-red-500"
                                    >
                                        Visit Gyan AI
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Footer */}

                <footer className="bg-gray-900 py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-center items-center bg-gray-800 p-3 rounded-lg shadow-lg">
                            <img src={logo} alt="IntelliLearn Logo" className="w-12 h-12 mr-4" />
                            <p className="text-white text-lg font-semibold">IntelliLearn by Team Titans</p>
                        </div>
                    </div>
                </footer>




            </div>
        </>

    );
}

export default Home;
