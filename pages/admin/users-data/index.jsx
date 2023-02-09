import React from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import Pagination from '@/components/ui/Pagination'
import { fetchAPI } from '@/helpers/utilsFetch'

const UsersData = ({data}) => {

    const router = useRouter()
    return (
        <>
            <Head>
                <title>Users Data</title>
            </Head>
            <motion.main 
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{ease: "easeIn", duration: 0.5}}
                className='mt-[100px] mb-[50px] px-[20px] lg:px-[40px] xl:px-[20px]'>
                <div className="container">
                    <div className='flex-between mb-[20px]'>
                        <h1 className="font-semibold text-[20px]">Users Data</h1>                
                    </div>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        No
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Username
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Role
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Account
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user, idx) => (
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={user._id}>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {idx+1}
                                        </th>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {user.username}
                                        </th>
                                        <td class="px-6 py-4">
                                            {user.email}
                                        </td>
                                        <td class="px-6 py-4">
                                            {user.role}
                                        </td>
                                        <td class="px-6 py-4">
                                            {user.account}
                                        </td>
                                        <td class="px-6 py-4">
                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-[10px]">Edit</a>
                                            <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex-center mt-[50px]">
                        <Pagination/>   
                    </div>
                </div>
            </motion.main>
        </>
    )
}


export const getServerSideProps = async(ctx) => {
    const session = await getSession(ctx)
    if(session?.user.role !== 'admin') {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    } else {
        const data = await fetchAPI('users')
    
        return {
            props: {
                data: data.data
            }
        }
    }

}

export default UsersData