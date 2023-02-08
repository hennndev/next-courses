import React from 'react'

const InputControl = ({name, inputType = 'text', type, label, placeholder, children, handleChange, ...rest}) => {
    
    let input

    switch (type) {
        case 'select':
            input = <select id={name} name={name} {...rest} className="input-form">
                {children}
            </select>
            break
        case 'textarea':
            input = <textarea id={name} name={name} {...rest} className="input-form" placeholder={placeholder} rows="5"></textarea>
            break
        default:
            if(inputType === 'file') {
                input = <input id={name} name={name} type={inputType} {...rest} className="input-file"/>
            } else {
                input = <input id={name} name={name} type={inputType} {...rest} className="input-form" placeholder={placeholder}/>
            }
           
    }

    return (
        <>
            {label && (
                <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                    {label}
                </label>
            )}
            {input}
        </>
    )
}

export default InputControl