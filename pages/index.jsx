import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { getSession } from 'next-auth/react'
import { fetchAPI } from '@/helpers/utilsFetch'
import { storeCurrentUser } from '@/store/reducers'

const Homepage = ({data}) => {
    const dispatch = useDispatch()    
    if(data) {
        dispatch(storeCurrentUser(data))
    }  

    const variants = {
        hidden: { opacity: 0, x: -100, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
    }
    
    return (
        <>
            <Head>
                <title>Home Page</title>
            </Head>
            <main className='mt-[120px] md:mt-[80px] mb-[50px] px-[20px] lg:px-[40px] xl:px-[20px]'>
                <div className="container">
                    <div className="flexx flex-col-reverse lg:flex-row">
                        <div className='lg:mr-[30px] flex-1'>
                            <motion.div
                                variants={variants} 
                                initial="hidden" 
                                animate="enter"
                                transition={{ ease: 'easeIn', delay: 0.3, x: {duration: 1}}}>
                                <h1 className='text-[40px] xl:text-[45px] font-bold dark:text-white text-gray-800'>
                                    Grow your skills with us and <br/> <span className='text-blue-500 dark:text-blue-400 font-black'>get your dream</span>
                                </h1>
                            </motion.div>
                            <motion.div 
                                variants={variants} 
                                initial="hidden" 
                                animate="enter"
                                transition={{ ease: 'easeIn', delay: 0.6, x: {duration: 1}}}
                                className="mt-[20px] max-w-md">
                                <h5 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
                                    What is Hencourse?
                                </h5>
                                <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">Hencourse is free learning courses about information system bachelor in Cyber University. Please feel free to enroll all of courses. Keep learning and reach your dream</p>
                                <Link href="/courses" className="inline-flex items-center btn-primary-gradient w-fit">
                                    Explore Courses
                                    <svg className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path></svg>
                                </Link>
                            </motion.div>
                        </div>
                        <motion.div 
                            initial={{ opacity: 0, x: 0, y: 60 }} 
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ ease: 'easeIn', duration: 1}}
                            className="relative hidden md:block h-[400px] w-[400px] md:h-[500px] md:w-4/5 lg:w-[500px]">
                            <Image sizes="100%" fill priority src="/images/hero.png" alt="hero-image" className='object-cover'/>
                        </motion.div>
                    </div>
                </div>
            </main>
        </>
    )
}


export const getServerSideProps = async(ctx) => {
    const session = await getSession(ctx)
    if(session) {
        const data = await fetchAPI(`users/${session.user.email}`)
        return {
            props: {
                data: data.data
            }
        }
    } else {
        return {
            props: {}
        }
    }
}

export default Homepage