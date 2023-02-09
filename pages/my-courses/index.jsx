import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { fetchAPI } from '@/helpers/utilsFetch'
import ModalReview from '@/components/ui/ModalReview'
import { motion, AnimatePresence } from 'framer-motion'

const MyCourses = ({data}) => {

    const router = useRouter()  
    const [showReviewModal, setShowReviewModal] = useState(null)

    return (
        <>
            <Head>
                <title>MyCourses Page</title>
            </Head>
            <AnimatePresence>
                {showReviewModal && <ModalReview data={showReviewModal} handleClose={() => setShowReviewModal(null)}/>}
            </AnimatePresence>
            <main className='mt-[100px] md:mt-[120px] mb-[50px] px-[20px] lg:px-[40px] xl:px-[20px]'>
                <AnimatePresence>
                    {data.length < 1 && (
                        <motion.div 
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            transition={{ease: 'backInOut', duration: 1}}
                            className="container px-[20px] lg:px-[40px] flex-center flex-col">
                            <h1 className='mb-[20px]'>You still don&apos;t have course yet.</h1>
                            <button className="btn-primary" onClick={() => router.push('/courses')}>Explore Courses</button>
                        </motion.div>
                    )}
                </AnimatePresence>
                {data.length > 0 && (
                    <div className="container">
                        <h1 className='text-[25px] text-gray-800 dark:text-white font-semibold'>My Courses</h1>
                        <div className='mt-[30px] grid grid-cols-cards gap-[20px]'>   
                            {data?.map((course, idx) => (
                                <motion.div 
                                    initial={{opacity: 0, y: 50}} 
                                    animate={{opacity: 1, y: 0}}
                                    transition={{ ease: "backOut",  delay: 0.6 * (idx + 1), duration: 1 }}
                                    className="bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col" key={course._id}>
                                    <div className="relative h-[200px] w-full rounded-t-lg">
                                        <Image sizes="100%" fill priority src={course.courseThumbnail.thumbnailUrl} alt={course.courseTitle} className="rounded-t-lg object-cover"/>
                                    </div>
                                    <div className="p-5 flex-1 flex justify-between flex-col">
                                        <div className='flex-1'>
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white line-clamp-2">{course.courseTitle}</h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">{course.courseDescription}</p>
                                        </div>
                                        <div className="flex-between">
                                            <Link href={`/my-courses/${course._id}`} className="w-fit m-0 btn-primary-gradient">
                                                Start Learning
                                            </Link>
                                            <button className="btn-outline m-0" onClick={() => setShowReviewModal(course._id)}>Add Review</button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
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
        const data = await fetchAPI(`users/${session.user.email}`)

        return {
            props: {
                data: data.data.myCourses
            }
        }
    }
}

export default MyCourses