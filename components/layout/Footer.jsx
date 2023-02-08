import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
    return (    
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "ease", duration: 0.5 }}
            className="container mt-[100px] flex-center py-6">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">&copy; 2023 <a href="https://github.com/hennndev" target="_blank" rel="noreferrer" className="hover:underline">Hennndev™</a>. All Rights Reserved.
            </span>
        </motion.footer>
    )
}

export default Footer