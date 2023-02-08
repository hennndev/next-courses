import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const Switcher = () => {

    const [value, setValue] = useState(false)
    const {systemTheme, theme, setTheme} = useTheme()
    const [mounted, setMounted] = useState(false);
    const currentTheme = theme === "system" ? systemTheme : theme 

    useEffect(() =>{
      setMounted(true);
    },[])

    useEffect(() => {
        if(currentTheme === 'dark') {
            setValue(true)
        } else {
            setValue(false)
        }
    }, [currentTheme])
    
    const handleChange = (e) => {
        if(e.target.checked) {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    if(!mounted) return null;

    return (
        <label className="relative inline-flex items-center cursor-pointer mr-[15px] md:mr-0">
            <input 
                onChange={handleChange} 
                type="checkbox" 
                checked={value}
                className="sr-only peer"/>
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {currentTheme === 'dark' ? 'Light' : 'Dark'}
            </span>
        </label>
    )
}

export default Switcher