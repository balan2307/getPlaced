const express = require("express");
const router = express.Router();
const PostController=require('../Controllers/postController')
const {storage}=require('../cloudinary/index')
const multer  = require('multer')
const upload = multer({ storage })

router.route('/user/post')
.post(upload.single('image'),PostController.createPost)

router.route('/user/post/:id')
.get(PostController.getPost)
.post(upload.single('image'),PostController.editPost)
.delete(PostController.deletePost)


router.route('/user/posts')
.get(PostController.getAllPosts)


module.exports=router;

