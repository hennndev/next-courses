import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import InputControl from '../ui/InputControl'
import { handleQueries } from '@/helpers/utilsFunc'
import { motion, AnimatePresence } from 'framer-motion'

const FilterCourses = () => {

    const router = useRouter()
    const [showFilter, setShowFilter] = useState(false)
    const handleOpenFilter = () => setShowFilter(true)
    const handleCloseFilter = () => setShowFilter(false)

    const formik = useFormik({
        initialValues: {
            category: '',
            totalUsersEnrolled: '',
            rating: ''
        },
        onSubmit: (values) => {
            let queriesStr = ''
            const currentQueries = handleQueries(values, router)
            currentQueries.forEach((query, idx) => {
                queriesStr += `${idx === 0 ? '?' : '&'}${query.key}=${query.value}`
            })
            router.push(`/courses${queriesStr}`, undefined, {shallow: true})
            handleCloseFilter()
        }
    })
    const handleClear = () => {
        formik.resetForm()
        handleCloseFilter()
        router.push(`/courses`, undefined, {shallow: true})
    }

    useEffect(() => {
        if(router.query) {
            formik.setValues({
                category: router.query?.category || '',
                totalUsersEnrolled: router.query?.totalUsersEnrolled || '',
                rating: router.query?.rating || ''
            })
        }
    }, [router.query])
    

    return (
        <>
            <button type="button" className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-600 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center text-gray-600 dark:text-gray-300 shadow" onClick={handleOpenFilter}>
                <svg fill="currentColor" className='w-5 h-6 mr-[10px]' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
                Filter Courses
            </button>
            
            <AnimatePresence>
                {showFilter && (
                    <motion.div 
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.3}}
                        className={`fixed bg-[rgba(0,0,0,0.6)] pt-[100px] md:pt-0 flex-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full md:h-full`}>
                        <motion.div 
                            initial={{opacity: 0, y:-50}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -50}}
                            transition={{ease: "backInOut", duration: 0.5}}
                            className="relative w-full h-full max-w-2xl md:h-auto">
                            <form onSubmit={formik.handleSubmit} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Filter Courses
                                    </h3>
                                    <button type="button" onClick={handleCloseFilter} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path></svg>  
                                    </button>
                                </div>
                                <div className="p-6">
                                    <div className="mb-3">
                                        <InputControl 
                                            label="Category"
                                            name="category" 
                                            value={formik.values.category}
                                            onBlur={formik.handleBlur} 
                                            onChange={formik.handleChange}
                                            type="select">
                                            <option value="">Choose category</option>
                                            <option value="allcategory">All Category</option>
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="advanced">Advanced</option>
                                        </InputControl>
                                    </div>
                                    <div className='mb-3'>
                                        <InputControl 
                                            label="Total Users Enrolled" 
                                            name="totalUsersEnrolled"
                                            value={formik.values.totalUsersEnrolled}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            type="select">
                                            <option value="">Choose total user enrolled</option>
                                            <option value="gte0">&gt; equal 0</option>
                                            <option value="gte5">&gt; equal 5</option>
                                            <option value="gte10">&gt; equal 10</option>
                                            <option value="gte20">&gt; equal 20</option>
                                            <option value="gte30">&gt; equal 30</option>
                                            <option value="gte50">&gt; equal 50</option>
                                        </InputControl>
                                    </div>
                                    <div className='mb-3'>
                                        <InputControl 
                                            label="Ratings" 
                                            name="rating"
                                            value={formik.values.rating}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            type="select">
                                            <option value="">Choose course rating</option>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </InputControl>
                                    </div>
                                </div>
                                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button type="submit" className="btn-primary">Submit</button>
                                    <button onClick={handleClear} type="button" className="btn-danger">Reset</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default FilterCourses