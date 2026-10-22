const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({

    //ismein user ki ID store hogi jisne post ko like kiya hai
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'User ID is required']
    },

    //Ismein us post ki ID save hogi jise user ne like kiya hai
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        required: [true, 'Post ID is required']
    }
}, { timestamps: true })

// Ek user ek post ko sirf ek baar like kar sake
likeSchema.index({ user: 1, post: 1 }, { unique: true })

const likeModel = mongoose.model('likes', likeSchema)

module.exports = likeModel