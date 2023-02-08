import React from 'react'

const SuccessAlert = ({children, handleClose}) => {
    return (
        <div className="flex p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-green-600 dark:text-white">
            <div className="ml-3 leading-[1.8] text-sm font-medium">
                {children}
            </div>
            <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-transparent dark:text-white dark:hover:bg-green-700" onClick={handleClose}>
                <span className="sr-only">Close</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>
    )
}

export default SuccessAlert