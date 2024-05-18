import React, { useContext, useEffect, useState } from 'react';
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';
import Task from '../components/Task';
import { Navigate } from 'react-router-dom';

function Todo() {
    // State Variables
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { isAuthenticated, setIsAuthenticated, setLoading, user } = useContext(Context);
    const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await axios.get(`${server}/tasks/my`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                setTasks(data.tasks);
                // toast.success("Tasks Fetched Successfully");
            } catch (error) {
                // toast.error("Error Fetching Tasks");
            }
        };

        if (isAuthenticated) {
            fetchTasks();
        }

        setTitle("");
        setDescription("");
    }, [isAuthenticated, user._id, refresh]);

    // Form Submit Handler
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post(
                `${server}/tasks/new`,
                {
                    title,
                    description,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            toast.success(data.message);
            setIsAuthenticated(true);
        } catch (error) {
            toast.error(error.response.data.message || "Error creating task");
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
        setRefresh(prev => !prev);
    };

    const updateHandler = async (id) => {
        try {
            const { data } = await axios.put(
                `${server}/tasks/${id}`,
                {},
                {
                    withCredentials: true,
                }
            );

            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
        setRefresh(prev => !prev);
    };

    const deleteHandler = async (id) => {
        try {
            const { data } = await axios.delete(
                `${server}/tasks/${id}`,
                {
                    withCredentials: true,
                }
            );

            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
        setRefresh(prev => !prev);
    };

    if (!isAuthenticated) return <Navigate to={"/login"} />;

    return (
        <div className='flex w-11/12 mx-auto' style={{ marginTop: 100 }}>
            <form onSubmit={submitHandler} className="w-2/4 max-w-xl mx-auto">
                <h1 className="text-xl mb-2 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Add Tasks
                </h1>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Complete All Assignments"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="description"
                        required
                        placeholder="Maths Assignment, Physics Assignment..."
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>

            <div className="w-2/4 mx-auto p-2 m-5 flex items-center flex-col border-gray-200 border-2 rounded dark:border-gray-700">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    {tasks.length === 0 ? "No Tasks Found" : "My Tasks"}
                </h1>
                {tasks && tasks.map((task) => (
                    <Task id={task._id} updateHandler={updateHandler} deleteHandler={deleteHandler} key={task._id} title={task.title} description={task.description} completed={task.isCompleted} />
                ))}
            </div>
        </div>
    );
}

export default Todo;
