import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

const InfoAlert = ({handleClose}) => {

    const router = useRouter()
    return (
        <motion.div 
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -20}}
            transition={{ease: "backInOut", duration: 0.5}}
            className="fixed z-[20] top-[50px] w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg dark:bg-gray-700 dark:text-gray-400 shadow-xl">
            <div className="flex">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 dark:text-blue-400">
                    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title>Login</title>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                </div>
                <div className="ml-3 text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Login Needed</span>
                    <div className="mb-2 text-sm font-normal">Please login for enroll this course.</div> 
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <button className="btn-primary px-2 py-1.5 text-xs inline-flex w-full justify-center" onClick={() => router.push('/login')}>Login</button>
                        </div>
                        <div>
                            <button  className="btn-outline border-gray-300  inline-flex justify-center w-full px-2 py-1.5 text-xs" onClick={handleClose}>Not now</button> 
                        </div>
                    </div>    
                </div>
                <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-700 dark:hover:bg-gray-800" data-dismiss-target="#toast-interactive" onClick={handleClose}>
                    <span className="sr-only">Close</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Close</title>
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </motion.div>
    )
}

export default InfoAlert