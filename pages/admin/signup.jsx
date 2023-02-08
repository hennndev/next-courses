import React, { useState } from 'react'
import Head from 'next/head'
import * as Yup from 'yup'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getSession } from 'next-auth/react'
import { ErrorMessage, Formik } from 'formik'
import ErrorAlert from '@/components/ui/ErrorAlert'
import SuccessAlert from '@/components/ui/SuccessAlert'
import InputControl from '@/components/ui/InputControl'
import ButtonLoading from '@/components/ui/ButtonLoading'

const Signup = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [alertStatus, setAlertStatus] = useState(null)
    const [alertMsg, setAlertMsg] = useState(null)
    const handleCloseAlert = () => setAlertStatus(null)

    return (
        <>
            <Head>
                <title>Signup Page</title>
            </Head>
            <main className='mt-[100px] mb-[50px] px-[20px] flex-center'>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        passwordConfirm: ''
                    }}
                    onSubmit={async(values, {resetForm}) => {
                        setIsLoading(true)
                        setAlertStatus(null)
                        try {
                            const res = await fetch('/api/auth/signup', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    username: values.username,
                                    email: values.email,
                                    password: values.password,
                                    role: 'admin'
                                })
                            })
                            const data = await res.json()
                            if(data.status === 'error') {
                                throw Error(data.message)
                            } else {    
                                setIsLoading(false)
                                setAlertStatus('success')
                                setAlertMsg(data.message)
                                resetForm()

                            }
                        } catch (error) {
                            setIsLoading(false)
                            setAlertStatus('error')
                            setAlertMsg(error.message)
                        }
                    }}
                    validationSchema={
                        Yup.object({
                            username: Yup.string().required('Username is required!'),
                            email: Yup.string().required('Email is required!').email('Email not valid!'),
                            password: Yup.string().required('Password is required!').min(7, 'Minimum password length is 7 character or more!'),
                            passwordConfirm: Yup.string().required('Password confirm is required!').min(7, 'Minimum password confirm length is 7 character or more').oneOf([Yup.ref('password'), null], 'Password confirm not match with password!')
                        })
                    }>
                    {({handleChange, handleSubmit, handleBlur, values}) => (
                        <motion.form 
                            initial={{opacity: 0, x: -100}}
                            animate={{opacity: 1, x: 0}}
                            transition={{ease: 'backInOut', duration: 1}}
                            className='w-[350px]' onSubmit={handleSubmit}>
                            <h2 className="text-center font-semibold text-[25px] mb-[30px]">Signup</h2>
                            {alertStatus === 'success' && (
                                <SuccessAlert handleClose={handleCloseAlert}>
                                    {alertMsg}! You can login now {' '}
                                    <Link href="/login" className="font-semibold underline">Login</Link>
                                </SuccessAlert>
                            )}
                            {alertStatus === 'error' && (
                                <ErrorAlert handleClose={handleCloseAlert}>
                                    {alertMsg}!
                                </ErrorAlert>
                            )}
                            <div className="mb-6">
                                <InputControl label="Username" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} placeholder="Type your email here.."/>
                                <span className='input-error'>
                                    <ErrorMessage name="username"/>
                                </span>
                            </div>
                            <div className="mb-6">
                                <InputControl label="Email Address" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="Type your email here.." inputType='email'/>
                                <span className='input-error'>
                                    <ErrorMessage name="email"/>
                                </span>
                            </div>
                            <div className="mb-6">
                                <InputControl label="Password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} inputType="password" placeholder="Type your password here.."/>
                                <span className='input-error'>
                                    <ErrorMessage name="password"/>
                                </span>
                            </div>
                            <div className="mb-10">
                                <InputControl label="Password Confirm" name="passwordConfirm" value={values.passwordConfirm} onChange={handleChange} inputType="password" onBlur={handleBlur} placeholder="Type your password confirm here.."/>
                                <span className='input-error'>
                                    <ErrorMessage name="passwordConfirm"/>
                                </span>
                            </div>
                            <div>
                                {isLoading ? <ButtonLoading/> : <button type="submit" className="btn-primary w-full">Submit</button> }
                            </div>
                            <p className='text-center text-[14px] text-gray-400 mt-4'>Already have an account? <Link href="/login" className='text-blue-500 hover:underline'>Login</Link></p>
                        </motion.form>
                    )}
                </Formik>
            </main>
        </>
    )
}


export const getServerSideProps = async (ctx) => {
    const adminCode = ctx.query.code
    const session = await getSession(ctx)

    if(session?.user.role === 'admin' || !session) {
        return {
            notFound: true
        }
    }

    if(adminCode !== process.env.NEXT_APP_ADMIN_SECRET) {
        return {
           notFound: true
        }
    } else {
        return {
            props: {}
        }
    }
}

export default Signup