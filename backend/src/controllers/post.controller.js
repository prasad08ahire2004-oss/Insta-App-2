const postModel = require('../models/post.model')

const likeModel = require('../models/like.model')

const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')

// ImageKit client create karna
const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {
    try {
        // Step 1: Check karo ki image upload hui hai ya nahi
        if (!req.file) {
            return res.status(400).json({
                message: 'Please select an image to create a post.'
            })
        }

        // Step 2: Check karo ki authenticated user ki ID available hai
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: 'Unauthorized. Please login first.'
            })
        }

        // Step 3: Check karo ki ImageKit private key configured hai
        if (!process.env.IMAGEKIT_PRIVATE_KEY) {
            console.error('IMAGEKIT_PRIVATE_KEY is missing')

            return res.status(500).json({
                message: 'Image upload service is not configured.'
            })
        }

        // Step 4: ImageKit par image upload karo
        const file = await imageKit.files.upload({
            file: await toFile(
                req.file.buffer,
                req.file.originalname
            ),
            fileName: req.file.originalname,
            folder: '/insta-clone'
        })

        // Step 5: ImageKit se mila URL aur post details MongoDB mein save karo
        const post = await postModel.create({
            caption: req.body.caption || '',
            imgUrl: file.url,
            user: req.user.id
        })

        // Step 6: Frontend ko success response bhejo
        return res.status(201).json({
            message: 'Post created successfully',
            post
        })

    } catch (error) {
        // Server terminal mein actual error log karo
        console.error('Create post error:', error)

        // Frontend ko appropriate error response bhejo
        return res.status(500).json({
            message: 'Failed to create post. Please try again.'
        })
    }
}

// Feed ke liye saari posts fetch karna
async function getFeedController(req, res) {
    try {
        // MongoDB se posts fetch karna
        const posts = await postModel
            .find({})
            .sort({ _id: -1 })
            .populate('user')     // populate('user') bhi kuch aisa hi karta hai: post mein stored user ID ki help se user ki information laata hai.
            .lean()

        // Successfully fetched posts frontend ko bhejna
        return res.status(200).json({
            success: true,
            message: 'Feed fetched successfully',
            posts
        })

    } catch (error) {
        // Error ko terminal mein dekhne ke liye
        console.error('Get feed error:', error)

        // Database ya server error hone par response bhejna
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch feed. Please try again.'
        })
    }
}

async function toggleLikeController(req, res) {
    try {
        const { postId } = req.params
        const userId = req.user.id

        // Check karo ki post database mein exist karti hai ya nahi
        const post = await postModel.findById(postId)

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found.'
            })
        }

        // Check karo ki user ne is post ko pehle like kiya hai ya nahi
        const existingLike = await likeModel.findOne({
            user: userId,
            post: postId
        })

        if (existingLike) {
            // Pehle se like hai, toh unlike karo
            await likeModel.deleteOne({
                _id: existingLike._id
            })

            return res.status(200).json({
                success: true,
                liked: false,
                message: 'Post unliked successfully.'
            })
        }

        // Like nahi hai, toh naya like create karo
        await likeModel.create({
            user: userId,
            post: postId
        })

        return res.status(201).json({
            success: true,
            liked: true,
            message: 'Post liked successfully.'
        })
    } catch (error) {
        console.error('Toggle like error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to like or unlike post.'
        })
    }
}

module.exports = {
    createPostController,
    getFeedController,
    toggleLikeController
}