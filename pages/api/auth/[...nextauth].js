import bcrypt from 'bcryptjs'
import NextAuth from "next-auth/next"
import Users from '@/models/usersModel'
import connectMongo from '@/lib/mongoose'
import { delay } from "@/helpers/utilsFunc"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({ 
    session: {
        strategy: "jwt"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_APP_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_APP_GOOGLE_CLIENT_SECRET, 
        }),
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {
                const { email, password } = credentials
                await connectMongo()
                await delay()
                const checkUser = await Users.findOne({email: email})
                if(checkUser) {
                    const checkPassword = await bcrypt.compare(password, checkUser?.password)
                    if(checkPassword) {
                        return {
                            username: checkUser.username,
                            email: checkUser.email,
                            role: checkUser.role,
                        }
                    } else {
                        throw new Error('Password incorrect!')
                    }
                } else {
                    throw new Error('User not exist!')
                }
            }
        })
    ],
    callbacks: {
        async signIn({account, profile}) {
            if(account.provider === 'google') {
                await connectMongo()
                const checkUser = await Users.findOne({email: profile.email})
                if(!checkUser) {
                    await Users.create({
                        email: profile.email, 
                        username: profile.name,                         
                        role: 'user',
                        account: account.provider,
                    })
                }
                return true
            } else {
                return true
            }
        },
        async jwt({token, user, account}) {
            if(account?.provider === 'google') {
                user.role = 'user'
            }
            return {...token, ...user}
        },
        async session({session, token}) {
            session.user = token
            return session
        }
    },
})