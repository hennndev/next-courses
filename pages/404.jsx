import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

const PageNotFound = () => {

    const router = useRouter()
    return (
        <>
            <Head>
                <title>Page Not Found</title>
            </Head>
            <main className='mt-[120px] mb-[50px]'>
                <motion.div 
                    initial={{opacity: 0, x: -50}}
                    animate={{opacity: 1, x: 0}}
                    transition={{
                        type: 'spring',
                        opacity: {ease: "easeOut", duration: 1}
                    }}
                    className="container px-[20px] lg:px-[40px] flex-center flex-col">
                    <div className='relative w-[270px] h-[270px]'>
                        <Image sizes="100%" src="/images/404.png" fill alt="page-not-found" priority/>
                    </div>
                    <h1 className='mt-[20px] dark:text-white text-center text-[16px]'>Oops, Page Not Found!</h1>
                    <div>
                        <button className="btn-primary mt-[20px] w-fit" onClick={() => router.push('/')}>Back to Home</button>
                    </div>
                </motion.div>
            </main>
        </>
    )
}

export default PageNotFound