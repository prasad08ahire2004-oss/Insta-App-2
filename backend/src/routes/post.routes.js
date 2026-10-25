const express = require('express')

const postRouter = express.Router()

const postController = require('../controllers/post.controller')

const multer = require('multer')

// Image ko temporarily memory mein store karna
const upload = multer({
    storage: multer.memoryStorage()
})

// Token se user ki identity verify karna
const identifyUser = require('../middleware/auth.middleware')

// Post create API hume ne yaha ye bhi verify kiya ki konse user ne post create ki hai
postRouter.post('/', identifyUser, upload.single('image'), postController.createPostController)

postRouter.get('/feed' , identifyUser , postController.getFeedController)

postRouter.get('/myPosts' , identifyUser , postController.getMyPostsController)

// Logged-in user ki post delete karne ka route
postRouter.delete('/:postId', identifyUser, postController.deletePostController)

postRouter.post('/:postId/like', identifyUser, postController.toggleLikeController)

module.exports = postRouter


