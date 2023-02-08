import React from 'react'
import { motion } from 'framer-motion'

const ModalConfirming = ({confirmTitle, btnClass, btnTitle = "Yes, I'm sure", handleConfirm, handleClose, isLoading}) => {

    let classes
    switch(btnClass) {
        case 'danger':
            classes = 'bg-red-500 hover:bg-red-700 focus:ring-red-200 dark:focus:ring-red-700'
            break
        default: 
            classes = 'bg-blue-500 hover:bg-blue-700 focus:ring-blue-200 dark:focus:ring-blue-700'
    }
    
    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}} 
            transition={{duration: 0.3}}
            className={`fixed flex justify-center bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full`}>
            <div className="relative max-w-md mt-[150px]">
                <motion.div 
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -50}}
                    transition={{ease: "backInOut", duration: 0.5}}
                    className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={handleClose} disabled={isLoading}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Close</title>
                            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <svg className={`mx-auto mb-4 text-gray-500 w-14 h-14 dark:text-gray-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-600 dark:text-gray-400">
                            {confirmTitle}
                        </h3>
                        <button type="button" className={`text-white focus:ring-4 focus:outline-none ${classes} ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'} font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2`} onClick={handleConfirm} disabled={isLoading}>
                            {btnTitle}
                        </button>
                        <button type="button" className={`btn-outline ${isLoading ? 'cursor-not-allowed' : ''}`} onClick={handleClose} disabled={isLoading}>No, cancel</button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default ModalConfirming