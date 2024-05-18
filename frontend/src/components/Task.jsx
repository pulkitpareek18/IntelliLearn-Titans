import React from 'react'

const Task = (props) => {

   
   



return (
    <div className="flex m-2 items-center w-11/12 p-2 mx-auto border border-gray-200 rounded dark:border-gray-700">
        <div className="flex items-center h-5">
            <input onChange={()=>{props.updateHandler(props.id)}} id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox" checked={props.completed} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 m-5" />
        </div>
        <div className="ms-2 text-sm w-3/4">
            <label htmlFor="helper-checkbox" className="font-medium text-gray-900 dark:text-gray-300">{props.title}</label>
            <p id="helper-checkbox-text" className="text-xs font-normal text-gray-500 dark:text-gray-300">{props.description}</p>
        </div>
        <div className="ms-2 text-sm">
        <button onClick={()=>{props.deleteHandler(props.id)}} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>
        </div>
    </div>
)
}

export default Task