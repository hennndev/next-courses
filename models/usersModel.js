import { Schema, models, model } from 'mongoose'

const usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: null
    },
    role: {
        type: String,
        required: true
    },
    account: {
        type: String,
        required: true
    },
    myCourses: [
        {
            type: Schema.Types.ObjectId,
            ref: "Courses"
        }
    ]
}, {
    timestamps: true
})

global.Users = global.Users || model('Users', usersSchema)
export default global.Users
