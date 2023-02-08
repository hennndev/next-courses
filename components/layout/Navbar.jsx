import React, { useState } from 'react'
import Link from 'next/link'
import Switcher from '../ui/Switcher'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/reducers'
import { useSession } from 'next-auth/react'
import NavbarDropdown from '../ui/NavbarDropdown'

const Navbar = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const { data:session, status } = useSession()
    const [isShowNav, setIsShowNav] = useState(false)

    const handleShowNav = () => setIsShowNav(!isShowNav)
    const handleClose = () => setIsShowNav(false) 
        
    const handleLogout = () => {
        handleClose()
        dispatch(logout())
        signOut()
    }
    const pageTitle = router.pathname.split('/')[router.pathname.split('/').length - 1]
    const roleBased = session?.user.role

    return (   
        <motion.nav 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "ease", duration: 0.5 }}
            className="fixed w-full py-2 z-20 top-0 left-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-[20px] lg:px-[40px] xl:px-[20px]">
            <div className="container flex-between flex-wrap">
                <h1 className="font-bold text-[20px] text-gray-800 dark:text-white">Hencourse</h1>
                <div className="flex items-center md:order-2">
                    <Switcher/>
                    <button type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={handleShowNav}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path></svg>
                    </button>
                </div>
                <div className={`items-center justify-between ${isShowNav ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`}>
                    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link href="/" className={`nav-link ${pageTitle === '' ? 'link-active' : ''}`} onClick={handleClose}>Home</Link>
                        </li>
                        <li>
                            <Link href="/courses" className={`nav-link ${pageTitle === 'courses' ? 'link-active' : ''}`} onClick={handleClose}>Courses</Link>
                        </li>
                        {roleBased === 'admin'  && (
                            <NavbarDropdown handleClose={handleClose} pageTitle={pageTitle}/>
                        )}
                        {roleBased === 'user' && (
                            <li>
                                <Link href="/my-courses" className={`nav-link ${pageTitle === 'my-courses' ? 'link-active' : ''}`} onClick={handleClose}>My Courses</Link>
                            </li>
                        )}
                        {status === 'authenticated' ? (
                                <li>
                                    <p className="cursor-pointer nav-link text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-400" onClick={handleLogout}>Logout</p>
                                </li>
                        ): (
                            <li>
                                <Link href="/login" className={`nav-link ${pageTitle === 'login' ? 'link-active' : ''}`} onClick={handleClose}>Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </motion.nav>
    )
}
export default Navbar