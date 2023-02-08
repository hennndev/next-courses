import React from 'react'

const Rating = ({data}) => {

    const totalReviews = data.totalUsersEnrolled?.filter(user => user.isReview)
    const accumulateRating = totalReviews.reduce((acc, curr) => {
        return acc += curr.rating
    }, 0) / totalReviews.length

    return (    
        <div className="flexx mt-[10px]">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Rating star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <p className="ml-2 text-md font-bold text-gray-700 dark:text-white">{totalReviews.length < 1 ? '0' : accumulateRating}</p>
            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
            <p className="text-sm font-medium text-gray-700 underline cursor-pointer dark:text-white">
                {totalReviews.length} reviews
            </p>
        </div>
    )
}

export default Rating