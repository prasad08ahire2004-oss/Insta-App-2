const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: '',
        trim: true
    },

    imgUrl: {
        type: String,
        required: [true, 'Image URL is required to create a post'],
        trim: true
    },

    // Ye property batati hai ki post kis user ne create ki hai.
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'User ID is required to create a post']
    }
}, { timestamps: true })

const postModel = mongoose.model('posts', postSchema)

module.exports = postModel