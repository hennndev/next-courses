import Users from "@/models/usersModel"
import Courses from "@/models/coursesModel"
import connectMongo from "@/lib/mongoose"

export default async function handler(req, res) {
    // TESTING CLEAR
    await connectMongo()
    if(req.method === 'GET') {
        try {
            let user = await Users.findOne({email: req.query.userEmail}).select('-password -__v -createdAt -updatedAt').populate({path: 'myCourses', model: Courses})
            res.status(200).json({
                status: 'success',
                message: 'Success get user',
                data: user
            })
        } catch (error) {
            res.status(400).json({
                status: 'error',
                error: 'Failed get user'
            })
        }
    }
    // TESTING CLEAR
    if(req.method === 'PUT') {
        try {
            await Users.updateOne({email: req.query.userEmail}, {$push: {myCourses: req.body.courseId}})
            res.status(200).json({
                status: 'success',
                message: 'Success enroll course and add to your courses'
            })
        } catch (error) {
            res.status(400).json({
                status: 'error',
                error: 'Failed enroll course and add to your courses'
            })
        }
    }
}