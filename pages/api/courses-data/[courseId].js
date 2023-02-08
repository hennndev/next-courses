import connectMongo from "@/lib/mongoose"
import { delay } from "@/helpers/utilsFunc"
import Courses from "@/models/coursesModel"
import Users from "@/models/usersModel"
import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECRET
})

export default async function handler(req, res) {  
    // TESTING CLEAR
    await connectMongo()
    if(req.method === 'GET') {
        const course = await Courses.findOne({_id: req.query.courseId}).select('-createdAt -__v -updatedAt').populate({path: 'totalUsersEnrolled.user', model: Users})
        res.status(200).json({
            status: 'success',
            message: 'Success get course',
            data: course
        })
    }
    // TESTING CLEAR enroll course || add rating and add review
    if(req.method === 'PUT') {
        await delay()

        if(!req.body.star) {
            const checkExistUserEnrolled = await Courses.find({_id: req.query.courseId, "totalUsersEnrolled.user": req.body.userId})
            try {
                // Enroll Course
                if(checkExistUserEnrolled.length > 0) {
                    throw Error('You are already enrolled, check it out!')
                } else {
                    await Courses.updateOne({_id: req.query.courseId}, {$push: {totalUsersEnrolled: {
                        user: req.body.userId,
                    }}})
                    res.status(200).json({
                        status: 'success',
                        message: 'Success enroll this course'
                    })
                }
            } catch (error) {
                res.status(400).json({
                    status: 'error',
                    error: error.message
                })
            } 
        } else {
            try {
                // Add Review
                await Courses.update({_id: req.query.courseId, "totalUsersEnrolled.user": req.body.userId}, {$set: {
                    "totalUsersEnrolled.$.isReview": true,
                    "totalUsersEnrolled.$.rating": req.body.star,
                    "totalUsersEnrolled.$.review": req.body.review,
                }})
                res.status(200).json({
                    status: 'success',
                    message: 'Success enroll this course'
                })
            } catch (error) {
                res.status(400).json({
                    status: 'error',
                    error: error.message
                })
            } 
        }
    }
    // TESTING CLEAR
    if(req.method === 'PATCH') {
        await delay()
        try {
            if(req.body.oldThumbnailId) {
                const { oldThumbnailId, ...updatedData } = req.body
                await Courses.replaceOne({_id: req.query.courseId}, {...updatedData}, async (err) => {
                    if(err) {
                        console.log(err)
                    } else {
                        await cloudinary.uploader.destroy(oldThumbnailId, (err) => {})
                    }
                })
            } else {
                await Courses.replaceOne({_id: req.query.courseId}, {...req.body})
            }
            res.status(200).json({
                status: 'success',
                message: 'Success edit course'
            })
        } catch (error) {
            res.status(400).json({
                status: 'error',
                error: 'Failed edit course'
            })
        }
    }
    // TESTING CLEAR
    if(req.method === 'DELETE') {
        await delay()
        try {
            await Courses.deleteOne({_id: req.query.courseId}, async (err) => {
                if(err) {
                    console.log(err)
                }
                await cloudinary.uploader.destroy(req.body.thumbnailId, (err) => {})
            })
            res.status(200).json({
                status: 'success',
                message: 'Success delete course'
            })
        } catch (error) {
            res.status(400).json({
                status: 'error',
                error: 'Failed delete course'
            })
        }
    }
}