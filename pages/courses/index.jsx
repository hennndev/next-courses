import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { fetchAPI } from '@/helpers/utilsFetch'
import SearchInput from '@/components/ui/SearchInput'
import FilterCourses from '@/components/courses/FilterCourses'

const Courses = ({data: dataCourses}) => {

    const router = useRouter()
    const filteredData = dataCourses.filter(course => {
            return course.courseTitle.toLowerCase().replace(/\s/g, "").includes(router.query?.q?.toLowerCase().replace(/\s/g, "") || '') && 
            course.courseCategory.toLowerCase().includes(router.query?.category === 'allcategory' ? '' : router.query?.category || '') 
        }).filter(course => {
            if(router.query?.totalUsersEnrolled) {
                return course.totalUsersEnrolled?.length >= +router.query?.totalUsersEnrolled.slice(3) || 0
            } else return course
        })
        .filter(course => {
            if(router.query?.rating) {
                return (course.totalUsersEnrolled.filter(user => user.isReview).reduce((acc, curr) => {
                    return acc += curr
                }, 0) / course.totalUsersEnrolled.filter(user => user.isReview).length) >= router.query?.rating || 0
            } else return course
        })


    return (
        <>
            <Head>
                <title>Courses Page</title>
            </Head>
            <main className='mt-[100px] md:mt-[120px] mb-[50px] px-[20px] lg:px-[40px] xl:px-[20px]'>
                <div className='container'>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: "easeIn", duration: 0.3 }}
                        className="flex-between mb-5">
                        <h1 className='text-[25px] text-gray-800 dark:text-white font-semibold'>All Courses</h1>
                        <FilterCourses/>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: "easeIn", delay: 0.3, duration: 0.3 }}>
                        <SearchInput/>
                    </motion.div>

                    <div className='mt-[30px] grid grid-cols-cards gap-[20px]'>   
                        {filteredData.length > 0 ? filteredData?.map((course, idx) => (
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
                                        <p className="mb-3 leading-[1.6] font-normal text-gray-700 dark:text-gray-400 line-clamp-3">{course.courseDescription}</p>
                                    </div>
                                    <Link href={`/courses/${course._id}`} className="w-fit btn-primary flexx px-3 py-2">
                                        Read more
                                        <svg className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </Link>
                                </div>
                            </motion.div>
                        )): (
                            <motion.div
                                initial={{opacity:0, y: 30}}
                                animate={{opacity: 1, y:0}}
                                transition={{
                                    type: "spring",
                                    delay: 0.6
                                }}>
                                <p className='text-gray-800 dark:text-gray-200'>Courses not available</p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}


export const getServerSideProps = async() => {
    const data = await fetchAPI('courses-data')

    return {
        props: {
            data: data.data,
        }
    }
}

export default Courses