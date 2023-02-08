import Users from "@/models/usersModel"
import connectMongo from "@/lib/mongoose"

export default async function handler(req, res) {
    // TESTING CLEAR
    await connectMongo()
    if(req.method === 'GET') {
        try {
            const users = await Users.find({}).select('-password -__v -updatedAt')
            res.status(200).json({
                status: 'success',
                message: 'Success get users',
                data: users
            })
        } catch (error) {
            res.status(400).json({
                status: 'error',
                error: 'Failed get users'
            })            
        }
    }
}