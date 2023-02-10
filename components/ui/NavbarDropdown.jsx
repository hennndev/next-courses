import React, { useState } from 'react'
import Link from 'next/link'

const NavbarDropdown = ({pageTitle, handleClose}) => {
    const [isDropdown, setIsDropdown] = useState(false)
    const handleDropdown = () => setIsDropdown(!isDropdown)
    const closeDropdown = () => {
        handleClose()
        setIsDropdown(false)
    }
    const isActive = pageTitle === 'courses-data' || pageTitle === 'users-data' || pageTitle === 'add-course'

    return (
        <li>
            <button className={`flexx w-full py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 md:w-auto dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent ${isActive ? 'text-blue-500 dark:text-white' : 'text-gray-700 dark:text-gray-400'}`} onClick={handleDropdown}>
                Admin<svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path></svg>
            </button>  
            <div className={`z-10 ${!isDropdown ? 'hidden' : ''} absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-900 dark:divide-gray-600`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                    <li onClick={closeDropdown}>
                        <Link href="/admin/courses-data" className={`block px-4 py-2 ${pageTitle === 'courses-data' || pageTitle === 'add-course' ? 'link-active' : 'hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'} `}>Courses Data</Link>
                    </li>
                    <li onClick={closeDropdown}>
                        <Link href="/admin/users-data" className={`block px-4 py-2 ${pageTitle === 'users-data' ? 'link-active' : 'hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'} `}>Users Data</Link>
                    </li>
                </ul>
            </div>
        </li>
    )
}

export default NavbarDropdown