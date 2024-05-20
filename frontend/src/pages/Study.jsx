import { useState } from 'react';
import axios from 'axios';

const Study = () => {
    const [subject, setSubject] = useState("");
    const [language, setLanguage] = useState("Hindi");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [generating, setGenerating] = useState(false);
    const [videos, setVideos] = useState({
        beginner: [],
        intermediate: [],
        advanced: []
    });

    const fetchVideos = async (e) => {
        setGenerating(true);
        e.preventDefault();

        try {
            let headersList = {
                "Content-Type": "application/json"
            };

            let bodyContent = JSON.stringify({
                "prompt": `subject: ${subject}, videoLanguage: ${language}, additionalHelp: ${additionalInfo}`
            });

            let reqOptions = {
                url: `${import.meta.env.VITE_AI_API_URL}/studyVideos`,
                method: "POST",
                headers: headersList,
                data: bodyContent,
            };

            let response = await axios.request(reqOptions);
            console.log(response.data.videos)
            setVideos(response.data.videos)
        } catch (error) {
            console.log(error);
        }

        setGenerating(false);
    };


    const renderVideoCards = (videos) => {
        return videos.map((video, index) => (
            <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-4">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{video.title}</div>
                    <div className="iframe-container">
                    <iframe width="300" height="200" src={video.link.replace("watch?v=", "embed/")} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen />
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div>
            <form onSubmit={fetchVideos} className="mt-24 mx-auto flex flex-col align-center">
                <div className='mx-auto flex justify-center'>
                    <div className='w-64 mx-2'>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                        <input value={subject} onChange={(e) => setSubject(e.target.value)} type="text" id="subject" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="General Knowledge" required />
                    </div>
                    <div className='w-64 mx-2'>
                        <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Language</label>
                        <input value={language} onChange={(e) => setLanguage(e.target.value)} type="text" id="language" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Language" required />
                    </div>
                    <div className='w-64 mx-2'>
                        <label htmlFor="additionalInfo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Additional Info</label>
                        <input value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} type="text" id="additionalInfo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Additional Info" />
                    </div>
                </div>

                <div className='flex align-center justify-center'>
                    <button disabled={generating} className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4">
                        Generate Study Videos using Gyan-AI
                    </button>

                    {generating && (
                        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                            <span className="sr-only">Loading...</span>
                        </div>)
                    }
                </div>
            </form>

            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold my-4">Beginner-Friendly Videos</h2>
                <div className="flex flex-wrap justify-center">
                    {renderVideoCards(videos.beginner)}
                </div>

                <h2 className="text-2xl font-bold my-4">Intermediate Videos</h2>
                <div className="flex flex-wrap justify-center">
                    {renderVideoCards(videos.intermediate)}
                </div>

                <h2 className="text-2xl font-bold my-4">Advanced Videos</h2>
                <div className="flex flex-wrap justify-center">
                    {renderVideoCards(videos.advanced)}
                </div>
            </div>
        </div>
    );
};

export default Study;
