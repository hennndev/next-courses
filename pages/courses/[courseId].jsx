import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Rating from '@/components/ui/Rating'
import { useSession } from 'next-auth/react'
import { fetchAPI } from '@/helpers/utilsFetch'
import { AnimatePresence } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import InfoAlert from '@/components/ui/InfoAlert'
import ModalConfirming from '@/components/ui/ModalConfirming'

const CourseDetail = ({data}) => {

    const router = useRouter()
    const { data:session, status } = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const user = useSelector(state => state.currentUser)

    const enrollCourse = async () => {
        setIsLoading(true)
        return new Promise((resolve, reject) => {
            fetch(`/api/courses-data/${router.query?.courseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user._id
                })
            }).then(res => res.json()).then(res => {
                if(res.error) {
                    throw Error(res.error)
                } else {
                    fetch(`/api/users/${session.user.email}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            courseId: router.query?.courseId
                        })
                    }).then(res => res.json()).then(res => {
                        resolve()
                        setIsLoading(false)
                        setShowConfirm(false)
                    })
                }
            }).catch(error => {
                reject(error.message)
                setIsLoading(false)
                setShowConfirm(false)
            })
        })
    }

    const handleClick = () => {
        if(status === 'unauthenticated') {
            setShowAlert(true)
            return
        } else setShowConfirm(true)
    }

    const handleConfirm = () => {
        const fetchEnroll = enrollCourse()
        toast.promise(fetchEnroll, {
            loading: "Loading..",
            success: 'Success enroll this course, check it out! 🥳',
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
            error: {
                duration: 4000,
            },
        }).then(() => {
            setIsLoading(false)
            setShowConfirm(false)
        })
    }   

    return (
        <>
            <Head>
                <title>Course Page</title>
            </Head>
            <main className='mt-[100px] md:mt-[120px] mb-[50px] lg:px-[40px] xl:px-0'> 
                <Toaster/>
                <div className="flex-center">
                    <AnimatePresence>
                        {showAlert && <InfoAlert handleClose={() => setShowAlert(false)}/>}
                        {showConfirm && <ModalConfirming 
                            confirmTitle="Ready to enroll this course?" 
                            btnTitle="Yes, I&apos;m ready"
                            handleConfirm={handleConfirm}
                            isLoading={isLoading}
                            handleClose={() => setShowConfirm(false)}/>}
                    </AnimatePresence>
                </div>                
                <div className='flex container'>
                    <div className='flex-1 flex flex-col md:flex-row lg:mr-[30px] bg-white dark:bg-transparent rounded text-gray-800 dark:text-white sm:px-[20px] lg:px-0'>
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{ ease: "backIn",  duration: 0.8}} 
                            className="block lg:hidden relative w-full h-[250px] sm:mr-[20px] md:w-[320px] mb-4">
                            <Image sizes="100%" priority fill src={data?.courseThumbnail.thumbnailUrl} alt={data?.courseTitle} className='rounded object-cover md:object-contain'/>
                        </motion.div>
                        <motion.div 
                            initial={{opacity: 0, x: -50}}
                            animate={{opacity: 1, x: 0}}
                            transition={{ ease: "backIn", duration: 1}}
                            className="px-[20px] md:px-0 flex-1">
                            <h1 className='text-[30px] font-bold'>{data?.courseTitle}</h1>
                            <p className='text-[16px] leading-[1.7] mb-5 mt-[10px] text-gray-600 dark:text-white font-[500] text-justify'>{data?.courseDescription}</p>
                            <p className='text-[15px] mt-[5px] text-gray-600 dark:text-white font-[500]'>Created by <span className='underline'>{data?.courseAuthor}</span></p>
                            <p className='mt-[5px] text-[15px] text-gray-600 dark:text-white font-[500]'>
                                {data?.totalUsersEnrolled.length} Users Joinned
                            </p>
                            <div className='mt-[5px]'>
                                <Rating data={data}/>
                            </div>  
                            <button type="button" className="block lg:hidden btn-primary-gradient" onClick={handleClick}>
                                Free Enroll
                            </button>
                        </motion.div>
                    </div>
                    <motion.div 
                        initial={{opacity: 0, x: 50}}
                        animate={{opacity: 1, x: 0}}
                        transition={{ ease: "backIn", duration: 1}}
                        className="hidden h-fit lg:flex flex-col w-[350px] min-h-[300px] bg-white dark:bg-gray-900 border border-gray-200 rounded-lg shadow-lg overflow-hidden dark:border-gray-700">
                        <div className="relative h-[200px] w-full rounded-lg">
                            <Image sizes="100%" priority fill src={data?.courseThumbnail.thumbnailUrl} alt={data?.courseTitle} className="rounded-lg object-cover"/>
                        </div>
                        <div className="flex-1 flex flex-col p-5 text-gray-700 dark:text-gray-100">
                            <div className="flex-1">
                                <h5 className="mb-1 text-2xl font-bold tracking-tight">{data?.courseTitle}</h5>
                                <p>{data?.courseMaterials.length} Course content</p>
                            </div>
                            <button  type="button" className="btn-primary-gradient" onClick={handleClick} disabled={isLoading}>
                                Free Enroll
                            </button>
                        </div>
                    </motion.div>
                </div>
            </main>
        </>
    )
}



export const getStaticPaths = async() => {
    const data = await fetchAPI('courses-data')
    const paths = data.data.map(data => ({
        params: {courseId: data._id}
    }))
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async({params}) => {
    try {
        const data = await fetchAPI(`courses-data/${params.courseId}`)
        return {
            props: {
                data: JSON.parse(JSON.stringify(data.data))
            },
            revalidate: 60
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}

export default CourseDetail