import { Schema, models, model } from "mongoose"

const coursesSchema = new Schema({
    courseTitle: {
        type: String,
        required: true
    },
    courseAuthor: {
        type: String,
        required: true
    },
    courseCategory: {
        type: String,
        required: true
    },
    courseDescription: {
        type: String,
        required: true
    },
    courseThumbnail: {
        thumbnailUrl: {
            type: String,
            required: true
        },
        thumbnailId: {
            type: String,
            required: true
        }
    },
    courseMaterials: [
        {
            part: {
                type: Number,
                required: true
            },
            materialTitle: {
                type: String,
                required: true
            },
            materialContent: {
                type: String,
                required: true
            }
        }
    ],
    totalUsersEnrolled: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "Users",
            },
            isReview: {
                type: Boolean,
                default: false
            },
            rating: {
                type: Number,
                default: null
            },
            review: {
                type: String,
                default: null
            }
        }
    ]
}, {
    timestamps: true
})

global.Courses = global.Courses || model('Courses', coursesSchema)
export default global.Courses