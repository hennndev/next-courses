import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { emptyTable } from '@/helpers/utilsFunc'
import toast, { Toaster } from 'react-hot-toast'
import Pagination from '@/components/ui/Pagination'
import { motion, AnimatePresence } from 'framer-motion'
import ModalConfirming from '@/components/ui/ModalConfirming'
import CourseDetail from '@/components/courses-data/CourseDetail'

const CourseData = ({data}) => {

    const router = useRouter()
    const [showDetail, setShowDetail] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

    const deleteCourse = async (courseId, thumbnailId) => {
        try {
            const req = await fetch(`/api/courses-data/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({thumbnailId: thumbnailId})
            })
            const res = await req.json()
            if(res.error) {
                throw Error(res.error)
            } 
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    const handleDelete = () => {
        setIsLoading(true)
        const fetchPromise = deleteCourse(showDeleteConfirm.courseId, showDeleteConfirm.thumbnailId)
        toast.promise(fetchPromise, {
            loading: 'Loading',
            success: 'Success delete course ',
            error: 'Oops, something went wrong',
        }, {
            position: 'top-center',
            style: {
                padding: '15px 20px',
                marginTop: '50px'
            }
        }).then(() => {
            setShowDeleteConfirm()
            if(typeof window !== "undefined") {
                location.reload()
            }
        })
    }

    return (
        <>
            <Head>
                <title>Courses Data</title>
            </Head>
            <Toaster/>
            <AnimatePresence>
                {showDeleteConfirm && (
                    <ModalConfirming 
                        btnClass="danger"
                        isLoading={isLoading}
                        confirmTitle="Are you sure want to delete this course?"
                        handleClose={() => setShowDeleteConfirm(null)}
                        handleConfirm={handleDelete}/>
                )}
                {showDetail && (
                    <CourseDetail data={showDetail} handleClose={() => setShowDetail(null)}/>
                )}
            </AnimatePresence>
            <motion.main 
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{ease: "backInOut", duration: 1}}
                className='mt-[100px] mb-[50px] px-[20px] lg:px-[40px] xl:px-[20px]'>
                <div className="container">
                    <div className='flex-between mb-[20px]'>
                        <h1 className="font-semibold text-[20px]">Courses Data</h1>
                        <button type="button" className="btn-primary-gradient w-fit" onClick={() => router.push('/admin/courses-data/add-course')}>
                            Add Course
                        </button>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Author
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Users Joins
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Detail
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? data.map((course, idx) => (
                                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={course._id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {idx + 1}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 leading-[1.7] dark:text-white whitespace-nowrap md:whitespace-normal md:max-w-[250px] break-all">
                                            {course.courseTitle}
                                        </th>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {course.courseAuthor}
                                        </td>
                                        <td className="px-6 py-4">
                                            {course.totalUsersEnrolled.length} Users
                                        </td>
                                        <td className="px-6 py-4 underline text-gray-500 cursor-pointer whitespace-nowrap" onClick={() => setShowDetail(course)}>
                                            course detail
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link href={`${router.asPath}/edit-course/${course._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-[10px]">Edit</Link>
                                            <p className="inline font-medium text-red-600 dark:text-red-500 cursor-pointer hover:underline" onClick={() => setShowDeleteConfirm({
                                                courseId: course._id,
                                                thumbnailId: course.courseThumbnail.thumbnailId
                                            })}>Delete</p>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        {emptyTable(6).map((ele, idx) => (
                                            <td key={idx+1} className="px-6 py-4">{ele}</td>
                                        ))}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {data.length > 0 && (
                        <div className="flex-center mt-[50px]">
                            <Pagination/>   
                        </div>
                    )}
                </div>
            </motion.main>
        </>
    )
}



export const getServerSideProps = async(ctx) => {
    const session = await getSession(ctx)
    if(session?.user.role !== 'admin') {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    } else {
        const res = await fetch('http://localhost:3000/api/courses-data')
        const data = await res.json()
    
        return {
            props: {
                data: data.data
            }
        }
    }
}



export default CourseData