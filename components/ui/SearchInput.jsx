import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { handleQueries } from '@/helpers/utilsFunc'
import { AnimatePresence, motion } from 'framer-motion'

const SearchInput = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()
    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const currentQueries = handleQueries({q: searchTerm}, router)
        let queriesStr = ''
        currentQueries.forEach((query, idx) => {
            queriesStr += `${idx === 0 ? '?' : '&'}${query.key}=${query.value}`
        })
        router.push(`/courses${queriesStr}`, undefined, {shallow: true})
    }

    useEffect(() => {
        if(router.query?.q) {
            setSearchTerm(router.query?.q)
        }
    }, [router.query])
    
    return (    
        <form onSubmit={handleSubmit}>   
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <input value={searchTerm} onChange={handleChange} type="search" className="input-form px-4 py-4 pl-10" placeholder={'Search course..'}/>
                <div className='absolute right-2.5 bottom-2.5 flexx'>
                    <AnimatePresence>
                        {searchTerm && (
                            <motion.svg 
                                initial={{opacity: 0, y:20}}
                                animate={{opacity: 1, y:0}}
                                exit={{opacity: 0, y:-20}}
                                transition={{ease: 'backInOut', duration: 1}}
                                fill="currentColor" className='w-5 h-5 text-red-500 mr-[10px] cursor-pointer' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" onClick={() => setSearchTerm('')}>
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
                            </motion.svg>
                        )}
                    </AnimatePresence>
                    <button type="submit" className="btn-primary text-sm px-4 py-2">Search</button>
                </div>
            </div>
        </form>
    )
}
export default SearchInput