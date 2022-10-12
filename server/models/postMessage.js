import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    //below is for converting photo to string
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    // comments: { type: [String], default: [] },
    comments: [
        {
            content: String,
            resolved: Boolean,
        }
    ],
    width: Number,
    height: Number,
    version: Number,
    users: [String],
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage
