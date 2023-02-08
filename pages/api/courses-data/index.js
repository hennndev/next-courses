import connectMongo from "@/lib/mongoose"
import { delay } from "@/helpers/utilsFunc"
import Courses from "@/models/coursesModel"
import Users from "@/models/usersModel"

export default async function handler(req, res) {
    // TESTING CLEAR
    await connectMongo()
    if(req.method === 'GET') {
        try {
            const coursesData = await Courses.find({}).sort({createdAt: -1}).populate({path: 'totalUsersEnrolled.user', model: Users})
            res.status(200).json({
                status: 'success',
                message: 'Success get courses data',
                data: coursesData
            })
        } catch (error) {
            res.status(400).json({
                status: 'error',
                error: 'Failed get courses data'
            })            
        }
    }
    // TESTING CLEAR
    if(req.method === 'POST') {
        await delay()
        try {
            await Courses.create({
                ...req.body,
            })
            res.status(201).json({
                status: 'success',
                message: 'Success post new course'
            })
        } catch(error) {
            res.status(400).json({
                status: 'error',
                error: 'Failed post new course'
            })
        }
    }
}