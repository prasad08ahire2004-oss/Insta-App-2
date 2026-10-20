const postModel = require('../models/post.model')

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

module.exports = {
    createPostController
}