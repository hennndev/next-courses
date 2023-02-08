import React, { useState } from 'react'
import Rating from '../ui/Rating'
import { motion } from 'framer-motion'
import CourseContent from '../courses/CourseContent'

const CourseDetail = ({data, handleClose}) => {

    const [openContent, setOpenContent] = useState(null)

    const handleOpenContent = (part) => {
        setOpenContent(
            openContent === part ? null : part
        )
    }

    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}} 
            transition={{duration: 0.3}}
            className="fixed top-0 bg-[rgba(0,0,0,0.3)] flex-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full">
            <div className="relative w-full md:w-[90%] h-[90%]">
                <motion.div 
                     initial={{opacity: 0, y: -50}}
                     animate={{opacity: 1, y: 0}}
                     exit={{opacity: 0, y: -50}}
                     transition={{ease: 'backInOut', duration: 0.5}}
                    className="flex flex-col relative bg-white overflow-y-auto h-full rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Course Detail
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleClose}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                        </button>
                    </div>
                    <div className="flex-1 p-6 space-y-3">
                        <h2 className='font-bold text-[25px] text-gray-800 dark:text-white'>
                            {data.courseTitle}
                        </h2>
                        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-200">
                            {data.courseCategory}
                        </p>
                        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-200">
                            {data.courseDescription}
                        </p>
                        <Rating data={data}/>
                        <div>
                            {data.courseMaterials.map(content => (
                                <div key={content.part}>
                                    <div id="accordion-collapse-heading-1">
                                        <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-800 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handleOpenContent(content.part)}>
                                        <span>{content.materialTitle}</span>
                                        <svg className="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </button>
                                    </div>
                                    <div className={`${openContent === content.part ? '' : 'hidden'}`}>
                                        <div className="p-5 font-light border border-b-0 border-gray-100 dark:border-gray-700 dark:bg-gray-900">
                                            <p className="mb-2 text-gray-500 dark:text-gray-400">{content.materialContent}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}                            
                        </div>
                    </div>
                    <div className="flex-end p-6">                        
                        <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={handleClose}>Close</button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default CourseDetail