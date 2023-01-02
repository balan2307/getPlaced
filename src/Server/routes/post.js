const express = require("express");
const router = express.Router();
const PostController=require('../Controllers/postController')
const {storage}=require('../cloudinary/index')
const multer  = require('multer')
const upload = multer({ storage })

router.route('/post')
.post(upload.single('image'),PostController.createPost)

router.route('/post/:id')
.get(PostController.getPost)
.post(upload.single('image'),PostController.editPost)

module.exports=router;

