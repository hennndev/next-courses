import React, { useState } from 'react'
import * as Yup from 'yup'
import Head from 'next/head'
import { Formik } from 'formik'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast'
import usePreviewImage from '@/hooks/usePreviewImage'
import { cloudinaryFetch } from '@/helpers/utilsFetch'
import CoursesForm from '@/components/courses-data/CoursesForm'

const AddCourse = () => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { prevImage, setPrevImage, handleChangePrevImage } = usePreviewImage()
    
    const postCourse = async (values, resetForm) => {
        const image = await cloudinaryFetch(values.courseThumbnail)
        if(image) {
            fetch('/api/courses-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...values,
                    courseThumbnail: {
                        thumbnailUrl: image.url,
                        thumbnailId: image.public_id
                    }
                })
            }).then(res => res.json()).then(() => {
                setIsLoading(false)
                resetForm()
            }).catch((error) => {
                setIsLoading(false)
                resetForm()
            })
        }
    }

    return (
        <>
            <Head>
                <title>Add Course</title>
            </Head>
            <motion.main 
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{ease: "backInOut", duration: 1}}
                className='mt-[100px] mb-[50px] px-[20px]'>
                <div className="container">
                    <Toaster/>
                    <div className="flex-between mb-[20px]">
                        <button type="button" className="btn-outline" onClick={() => router.push('/admin/courses-data')}>Get Back</button>
                    </div>

                    <Formik
                        initialValues={{
                            courseTitle: '',
                            courseAuthor: '',
                            courseCategory: '',
                            courseDescription: '',
                            courseThumbnail: '',
                            courseMaterials: [
                                {
                                    part: 1,
                                    materialTitle: '',
                                    materialContent: ''
                                }
                            ]
                        }}
                        onSubmit={async(values, {resetForm}) => {
                            setIsLoading(true)
                            const promiseCourse = postCourse(values, resetForm)
                            toast.promise(promiseCourse, {
                                loading: 'Loading',
                                success: 'Success create new course ',
                                error: 'Oops, something went wrong',
                            }, {
                                position: 'top-center',
                                style: {
                                    padding: '15px 20px',
                                    marginTop: '50px'
                                }
                            }); 
                        }}
                        validationSchema={
                            Yup.object({
                                courseTitle: Yup.string().required('Course title is required!'),
                                courseAuthor: Yup.string().required('Course author is required!'),
                                courseCategory: Yup.string().required('Course category is required!'),
                                courseDescription: Yup.string().required('Course description is required!'),
                                courseThumbnail: Yup.mixed().required('Course thumbnail is required!').test('fileSize', 'Minimum size less than 2 MB!', (value) => value?.size < 2000000),
                                courseMaterials: Yup.array().of(
                                    Yup.object().shape({
                                        materialTitle: Yup.string().required('Material title is required!'),
                                        materialContent: Yup.string().required('Material content is required!')
                                    })
                                )
                            })
                        }
                    >
                        {({handleSubmit, handleChange, handleBlur, values, setFieldValue, resetForm}) => (
                            <CoursesForm 
                                formTitle="Add"
                                handleSubmit={handleSubmit} 
                                handleChange={handleChange} 
                                handleBlur={handleBlur} 
                                values={values} 
                                setFieldValue={setFieldValue} 
                                resetForm={resetForm}
                                isLoading={isLoading}
                                prevImage={prevImage}
                                setPrevImage={setPrevImage}
                                handleChangePrevImage={handleChangePrevImage}/>

                        )}
                    </Formik>
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
                destination: '/page-not-found'
            }
        }
    } else {
        return {
            props: {}
        }
    }
}

export default AddCourse