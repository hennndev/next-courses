import bcrypt from 'bcryptjs'
import Users from '@/models/usersModel'
import connectMongo from '@/lib/mongoose'
import { delay } from "@/helpers/utilsFunc"

export default async function handler(req, res) {
    // TESTING CLEAR
    await connectMongo() 
    if(req.method === 'POST') {
        const { username, email, password, role } = req.body 
        const checkUser = await Users.findOne({email: email})
        await delay()
        try {
            if(!checkUser) {
                const salt = await bcrypt.genSalt()
                const passwordHash = await bcrypt.hash(password, salt)
                await Users.create({
                    username, 
                    email, 
                    password: passwordHash, 
                    role: role,
                    account: 'credentials',
                })
                res.status(201).json({
                    status: 'success',
                    message: 'Success create new account'
                })
            } else {
                throw Error('Email already used!')
            }
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message
            })
        }
    }
}