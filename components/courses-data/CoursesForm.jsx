import React from 'react'
import Image from 'next/image'
import InputControl from '../ui/InputControl'
import { ErrorMessage, FieldArray } from 'formik'

const CoursesForm = ({formTitle, handleSubmit, handleChange, handleBlur, values, setFieldValue, resetForm, isLoading, prevImage, setPrevImage, handleChangePrevImage, isEdit = null}) => {

    const handleReset = () => {
        resetForm()
        if(typeof window !== 'undefined') document.getElementById('courseThumbnail').value = ''
        setPrevImage(null)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-center font-semibold text-[25px] mb-[30px]">{formTitle} Course</h2>
            {/* course title */}
            <div className="mb-6">
                <InputControl label="Course Title" name="courseTitle" onBlur={handleBlur} value={values.courseTitle} onChange={handleChange} placeholder="Type course title here.."/>
                <span className="input-error">
                    <ErrorMessage name="courseTitle"/>
                </span>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                {/* course author */}
                <div>
                    <InputControl label="Course Author" name="courseAuthor" onBlur={handleBlur} value={values.courseAuthor} onChange={handleChange} placeholder="Type course author here.."/>
                    <span className="input-error">
                        <ErrorMessage name="courseAuthor"/>
                    </span>
                </div>
                {/* course category */}
                <div>
                    <InputControl label="Course Category" name="courseCategory" onBlur={handleBlur} value={values.courseCategory} onChange={handleChange} type="select">
                        <option selected>Choose course category</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="All Category">All Category</option>
                    </InputControl>
                    <span className="input-error">
                        <ErrorMessage name="courseCategory"/>
                    </span>

                </div>  
            </div>
            {/* course description */}
            <div className='mb-6'>              
                <InputControl label="Course Description" name="courseDescription" onBlur={handleBlur} value={values.courseDescription} onChange={handleChange} placeholder="Type course description here.." type="textarea"/>
                <span className="input-error">
                    <ErrorMessage name="courseDescription"/>
                </span>
            </div>
            {/* course thumbnail */}
            <div className="mb-6">                 
                <InputControl label="Course Thumbnail" name="courseThumbnail" onBlur={handleBlur} accept="image/*" onChange={(e) => {
                    setFieldValue('courseThumbnail', e.currentTarget.files[0])
                    handleChangePrevImage(e)
                }} inputType="file"/>
                {!prevImage && isEdit ? (
                    <div className='w-[200px] h-[200px] relative mt-[10px]'>
                        <Image src={isEdit} fill alt="prev-image" priority className='object-contain'/>
                    </div>
                ) : null}
                {prevImage && (
                    <div className='w-[200px] h-[200px] relative mt-[10px]'>
                        <Image src={prevImage} fill alt="prev-image" priority className='object-contain'/>
                    </div>
                )}
                <span className="input-error">
                    <ErrorMessage name="courseThumbnail"/>
                </span>
            </div>

            <FieldArray name="courseMaterials" render={(arrayHelpers) => (    
                <>
                    {values.courseMaterials.map((material, index) => (
                        <div className="mt-3" key={material.part}>
                            <div className="flex">
                                <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-white mr-[5px]">Course Material (Part {material.part})</label>
                                {values.courseMaterials.length > 1 && index === values.courseMaterials.length - 1 ? (
                                    <div className="flex cursor-pointer text-red-500" onClick={() => arrayHelpers.remove(index)}>
                                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className='h-5 w-5'>
                                            <path clipRule="evenodd" fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"></path>
                                        </svg>
                                        <small>delete</small>
                                    </div>
                                ) : ''}
                            </div>

                            <div className="flex flex-col mb-2">
                                <InputControl name={`courseMaterials.${index}.materialTitle`} value={values.courseMaterials[index].materialTitle} onChange={handleChange} onBlur={handleBlur} placeholder="Type material title here.."/>
                                <span className="input-error">
                                    <ErrorMessage className='text-red-500' name={`courseMaterials.${index}.materialTitle`}/>
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <InputControl name={`courseMaterials.${index}.materialContent`} value={values.courseMaterials[index].materialContent} onChange={handleChange} onBlur={handleBlur} placeholder="Type material content here.." type="textarea"/>
                                <span className="input-error">
                                    <ErrorMessage className='text-red-500' name={`courseMaterials.${index}.materialContent`}/>
                                </span>
                            </div>
                        </div>
                    ))} 
                    <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5  py-2.5 mb-6 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 flexx mt-2" disabled={isLoading} onClick={() => arrayHelpers.push({
                        part: values.courseMaterials.length + 1,
                        materialTitle: '',
                        materialContent: ''
                    })}>
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                            <path d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"></path>
                        </svg>
                        Add new material course
                    </button>
                </>
            )}/>
            

            {/* BUTTON ACTION */}
            <div className="flexx">
                <button type="submit" disabled={isLoading} className="btn-primary mr-[10px] sm:mr-[20px]">Submit</button>
                <button type="button" disabled={isLoading} className="btn-danger" onClick={handleReset}>Reset Form</button>
            </div>
        </form>
    )
}

export default CoursesForm