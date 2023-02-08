import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import Head from 'next/head'
import { Formik } from 'formik'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast'
import usePreviewImage from '@/hooks/usePreviewImage'
import { cloudinaryFetch } from '@/helpers/utilsFetch'
import ModalConfirming from '@/components/ui/ModalConfirming'
import CoursesForm from '@/components/courses-data/CoursesForm'

const EditCourse = ({data}) => {

    const router = useRouter()
    const [valuesForm, setValuesForm] = useState({
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
    })
    const [editConfirm, setEditConfirm] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { prevImage, setPrevImage, handleChangePrevImage } = usePreviewImage()
    
    const editCourse = async (values) => {
        if(values.courseThumbnail.name) {
            const image = await cloudinaryFetch(values.courseThumbnail)
            if(image) {
                fetch(`/api/courses-data/${router.query.courseId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...values,
                        oldThumbnailId: data.courseThumbnail.thumbnailId,
                        courseThumbnail: {
                            thumbnailUrl: image.url,
                            thumbnailId: image.public_id
                        }
                    })
                }).then(res => res.json()).then(() => {
                   
                }).catch((error) => {
                    
                })
            }
        } else {
            fetch(`/api/courses-data/${router.query.courseId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...values,
                })
            }).then(res => res.json()).then(() => {
                
            }).catch((error) => {
                
            })
        }
    }

    const handleConfirm = () => {
        setIsLoading(true)
        const promiseCourse = editCourse(editConfirm)
        toast.promise(promiseCourse, {
            loading: 'Loading',
            success: 'Success edit course ',
            error: 'Oops, something went wrong',
        }, {
            position: 'top-center',
            style: {
                padding: '15px 20px',
                marginTop: '50px'
            }
        }).then(() => {
            setIsLoading(false)
            setEditConfirm(null)
            router.push('/admin/courses-data')
        })
    }

    return (
        <>
            <Head>
                <title>Edit Course</title>
            </Head>
            <motion.main 
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{ease: "easeIn", duration: 0.5}}
                className='mt-[100px] mb-[50px] px-[20px]'>
                <div className="container">
                    <Toaster/>
                    <div className="flex-between mb-[20px]">
                        <button type="button" className="btn-outline" onClick={() => router.push('/admin/courses-data')}>Get Back</button>
                    </div>
                    <AnimatePresence>
                        {editConfirm && (
                            <ModalConfirming 
                                confirmTitle="Are you sure want to edit this course?"
                                handleClose={() => setEditConfirm(null)}
                                handleConfirm={handleConfirm}
                                isLoading={isLoading}/>
                        )}
                    </AnimatePresence>
                    <Formik
                        initialValues={data || valuesForm}
                        onSubmit={async(values) => {
                            setEditConfirm(values)
                        }}
                        validationSchema={
                            Yup.object({
                                courseTitle: Yup.string().required('Course title is required!'),
                                courseAuthor: Yup.string().required('Course author is required!'),
                                courseCategory: Yup.string().required('Course category is required!'),
                                courseDescription: Yup.string().required('Course description is required!'),
                                courseThumbnail: Yup.mixed().required('Course thumbnail is required!').test('fileSize', 'Minimum size less than 2 MB!', (value) => value?.thumbnailId ? true : value?.size < 2000000),
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
                                formTitle="Edit"
                                handleSubmit={handleSubmit} 
                                handleChange={handleChange} 
                                handleBlur={handleBlur} 
                                values={values} 
                                setFieldValue={setFieldValue} 
                                resetForm={resetForm}
                                isLoading={isLoading}
                                prevImage={prevImage}
                                setPrevImage={setPrevImage}
                                handleChangePrevImage={handleChangePrevImage}
                                isEdit={data.courseThumbnail.thumbnailUrl}/>

                        )}
                    </Formik>
                </div>
            </motion.main>
        </>
    )
}


export const getServerSideProps = async(ctx) => {
    const session = await getSession(ctx)

    const res = await fetch(`http://localhost:3000/api/courses-data/${ctx.query.courseId}`)
    const data = await res.json()

    if(session?.user.role !== 'admin') {
        return {
            redirect: {
                permanent: false,
                destination: '/page-not-found'
            }
        }
    } else {
        return {
            props: {
                data: data.data
            }
        }
    }
}

export default EditCourse