import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { fetchAPI } from '@/helpers/utilsFetch'
import ModalReview from '@/components/ui/ModalReview'
import { motion, AnimatePresence } from 'framer-motion'

const MyCourses = ({data}) => {

    const router = useRouter()  
    const [openContent, setOpenContent] = useState(null)
    const [showReviewModal, setShowReviewModal] = useState(null)

    const handleOpenContent = (part) => {
        setOpenContent(
            openContent === part ? null : part
        )
    }

    return (
        <>
            <Head>
                <title>Learning Course</title>
            </Head>
            <AnimatePresence>
                {showReviewModal && <ModalReview data={showReviewModal} handleClose={() => setShowReviewModal(null)}/>}
            </AnimatePresence>
            <main className='mt-[100px] md:mt-[120px] mb-[50px] px-[20px] lg:px-[40px] xl:px-[20px]'>
                <div className="container">
                    <motion.div
                        initial={{opacity: 0, x: -30}}
                        animate={{opacity: 1, x: 0}}
                        transition={{ease: 'backOut', duration: 1}}>
                        <h1 className='text-2xl text-gray-700 dark:text-white font-bold'>{data.courseTitle}</h1>
                        <div className="flexx space-x-3 mt-[20px]">
                            <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Join Our WA Group</button>
                            <button className="btn-outline m-0" onClick={() => setShowReviewModal(data._id)}>Add Review</button>
                        </div>
                    </motion.div>
                    <motion.div 
                        initial={{opacity: 0, y: 100}}
                        animate={{opacity: 1, y: 0}}
                        transition={{ease: 'backInOut', delay: 0.5, duration: 1}}
                        className='mt-[50px]'>
                        {data.courseMaterials.map((content, idx) => (
                            <div key={content.part}>
                                <div>
                                    <button type="button" className={`flex items-center justify-between w-full p-5 font-medium text-left text-gray-800 border ${idx === 0 ? 'border-b-0' : ''} border-gray-200 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900`} onClick={() => handleOpenContent(content.part)}>
                                    <span>{content.materialTitle}</span>
                                    <svg className="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                                <div className={`${openContent === content.part ? '' : 'hidden'}`}>
                                    <div className="p-5 font-normal border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                        <p className="mb-2 text-gray-800 dark:text-gray-200 leading-[1.7] break-all">{content.materialContent}</p>
                                    </div>
                                </div>
                            </div>
                        ))}                
                    </motion.div>
                </div>
            </main>
        </>
    )
}

export const getServerSideProps = async(ctx) => {
    const session = await getSession(ctx)
    if(!session?.user) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    } else {

        try {
            const data = await fetchAPI(`courses-data/${ctx.query?.courseId}`)
            return {
                props: {
                    data: data.data
                }
            }
        } catch (error) {
            return {
                notFound: true
            }
        }
    }
}

export default MyCourses