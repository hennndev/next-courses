import React, { useState } from 'react'
import Head from 'next/head'
import * as Yup from 'yup'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { ErrorMessage, Formik } from 'formik'
import ErrorAlert from '@/components/ui/ErrorAlert'
import { signIn, getSession } from 'next-auth/react'
import InputControl from '@/components/ui/InputControl'
import ButtonLoading from '@/components/ui/ButtonLoading'

const Login = () => {

    const router = useRouter()
    const [alertMsg, setAlertMsg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [alertStatus, setAlertStatus] = useState(null)
    
    const loginGoogle = () => signIn('google')
    const handleCloseAlert = () => setAlertStatus(null)

    return (
        <>
            <Head>
                <title>Login Page</title>
            </Head>
            <main className='mt-[100px] mb-[50px] px-[20px] flex-center'>
                <motion.div
                    initial={{opacity: 0, x: -100}}
                    animate={{ opacity: 1, x: 0}}
                    transition={{
                        ease: 'backInOut',
                        duration: 1
                    }}>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        onSubmit={async(values) => {
                            setIsLoading(true)
                            setAlertStatus(null)
                            await signIn('credentials', {
                                email: values.email,
                                password: values.password,
                                redirect: false
                            }).then(res => {
                                if(res.error) {
                                    throw Error(res.error)
                                } else {
                                    setIsLoading(false)
                                    setAlertStatus(null)
                                    router.push('/')
                                }
                            }).catch(error => {
                                setIsLoading(false)
                                setAlertStatus('error')
                                setAlertMsg(error.message)
                            })
                        
                        }}
                        validationSchema={
                            Yup.object({
                                email: Yup.string().required('Email is required!').email('Email not valid!'),
                                password: Yup.string().required('Password is required!').min(7, 'Minimum password length is 7 character or more!')
                            })
                        }>
                        {({handleChange, handleSubmit, handleBlur, values}) => (
                            <form className='w-[350px] text-gray-800 dark:text-white' onSubmit={handleSubmit}>
                                <h2 className="text-center font-bold text-[25px] mb-[30px]">Login</h2>
                                {alertStatus === 'error' && <ErrorAlert handleClose={handleCloseAlert}>{alertMsg}</ErrorAlert>}
                                <div className="mb-6">
                                    <InputControl label="Email Address" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="Type your email here.."/>
                                    <span className="input-error">
                                        <ErrorMessage name="email"/>
                                    </span>
                                </div>
                                <div className="mb-6">
                                    <InputControl label="Password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} inputType="password" placeholder="Type your password here.."/>
                                    <span className="input-error">
                                        <ErrorMessage name="password"/>
                                    </span>
                                </div>
                                <div className='mb-6'>
                                    {isLoading ? <ButtonLoading/> : <button className="btn-primary w-full">Submit</button> }
                                </div>
                                <div className="flex-center">
                                    <p className='text-[14px] dark:bg-gray-800 bg-white px-[10px] text-gray-400 -mb-[10px]'>OR</p>
                                </div>
                                <hr className='dark:border-gray-600 mb-6 dark:bg-gray-600 border-gray-300 bg-gray-300'/>

                                <button disabled={isLoading} type="button" className="btn-provider" onClick={loginGoogle}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 mr-[10px]' fill="#F05252" viewBox="0 0 488 512">
                                        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                                    </svg>
                                    Login with Google
                                </button>
                                <button disabled={isLoading} type="button" className="btn-provider">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-[10px]" fill="#1C64F2" viewBox="0 0 512 512">
                                        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
                                    </svg>
                                    Login with Facebook
                                </button>
                                <p className='text-center text-[14px] text-gray-400 mt-4'>Don't have an account? <Link href="/signup" className='text-blue-500 hover:underline'>Signup</Link></p>
                            </form>
                        )}
                    </Formik>
                </motion.div>
            </main>
        </>
    )
}


export const getServerSideProps = async (ctx) => {
    const session = await getSession(ctx)

    if(session) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    } else {
        return {
            props: {}
        }
    }
}

export default Login