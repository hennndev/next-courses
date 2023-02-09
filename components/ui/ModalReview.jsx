import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import ButtonLoading from './ButtonLoading'
import toast, { Toaster } from 'react-hot-toast'

const ModalReview = ({data, handleClose}) => {

    const [star, setStar] = useState(0)
    const [review, setReview] = useState('')
    const [isErrors, setIsErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const currentUser = useSelector(state => state.currentUser)

    const reviewPromise = () => {
        setIsLoading(true)
        return new Promise((resolve, reject) => {
            fetch(`/api/courses-data/${data}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    star: star,
                    review: review,
                    userId: currentUser._id
                })
            }).then(res => res.json()).then(res => {
                resolve()
            }).catch(() => {
                reject()
            })
        })
    }
    

    const handleSendReview = () => {
        const errors = handleErrors()
        console.log(errors)
        if(!errors) {
            return
        }
        const fetchPromise = reviewPromise()
        toast.promise(fetchPromise, {
            loading: "Loading",
            success: 'Success send your review, your review will be my motivated to be better! 🔥',
            error: (err) => err || 'Something went wrong!'
        }, {
            position: 'top-center',
            style: {
                padding: '15px 20px',
                marginTop: '50px'
            },
            success: {
                duration: 4000,
            },
            success: {
                duration: 4000,
            },
        }).then(() => {
            setIsLoading(false)
            handleClose()
        }).catch(() => {
            setIsLoading(false)
            handleClose()
        })
    }

    const handleErrors = () => {
        let errors = {}
        if(star === 0) {
            errors.rating = '*Please, choose your rating!'
        } else {
            errors.rating = ''
        }
        if(review === '') {
            errors.review = '*Please, add your review!'
        } else {
            errors.review = ''
        }
        setIsErrors(errors)
        console.log(Object.values(errors))
        return Object.values(errors).every(err => err === '')
    }

    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}} 
            transition={{duration: 0.3}}
            className="fixed top-0 bg-[rgba(0,0,0,0.3)] flex-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full">
            <div className="relative w-[550px] min-h-[450px]">
                <Toaster/>
                <motion.div 
                     initial={{opacity: 0, y: -50}}
                     animate={{opacity: 1, y: 0}}
                     exit={{opacity: 0, y: -50}}
                     transition={{ease: 'backInOut', duration: 0.5}}
                    className="flex flex-col relative bg-white overflow-y-auto h-full rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Add Review
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleClose} disabled={isLoading}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <title>Close Button</title>
                                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                            </svg>  
                        </button>
                    </div>
                    <div className="flex-1 p-6">       
                        <div class="flex-center space-x-3 mb-5">
                            {Array(5).fill('star').map((_, idx) => (
                                <svg className={`w-10 h-10 ${idx + 1 <= star ? 'text-yellow-400' : 'text-gray-400 dark:text-gray-600' } cursor-pointer`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" onClick={() => setStar(idx + 1)} key={idx}>
                                    <title>Rating star</title>
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                            ))}                           
                        </div>
                        <textarea rows="8" value={review} onChange={(e) => setReview(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-100 dark:border-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Send your review.."></textarea>
                        <div className='mt-[10px] text-red-500 dark:text-red-400 text-sm space-y-2'>
                            <p>{isErrors.rating}</p>
                            <p>{isErrors.review}</p>
                        </div>
                    </div>
                    <div className="flex-end p-6">
                        <button className="btn-primary-gradient w-fit m-0 mr-[20px]" disabled={isLoading} onClick={handleSendReview}>
                            Send Review
                        </button>                        
                        <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={handleClose} disabled={isLoading}>Close</button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default ModalReview