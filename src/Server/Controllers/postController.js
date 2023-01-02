const { default: axios } = require('axios');
const {cloudinary}=require('../cloudinary');
const Post=require('../models/Post')
module.exports.createPost=async(req,res)=>{

    console.log("create post backend",req.body,req.file)
    const post=req.body;
    const id=post.id;
    delete post.id;
 
    let date=new Date().toLocaleString();
    let time=Date.now();

    post.tags=post.tags.split(" ");
    post.postdate=date;
    post.time=time;
    post.user=id;

    let filename=""
    let path=""
    let image=""


    if(req.file)
    {
        filename=req.file.filename;
        path=req.file.path;
        image={url:path,filename}
        post.image=image

    }

    try
    {
        const newPost=new Post(post);
        console.log("Before")
        const saved=await newPost.save();
        console.log("Aafter")

        console.log("Saved ",saved)

    }
    catch(err)
    {
        console.log("Error ",err)
    }


    console.log(post);
}


module.exports.getPost=async(req,res)=>{


    const {id}=req.params;
    const post=await Post.find({_id:id})
     return res.status(200).json({
        title:"Success",
        post
      })

}



module.exports.editPost=async(req,res)=>{


    const {id}=req.params;
   
    
    const updatedPost=req.body;
    console.log("Body ",updatedPost,req.file);
    let post=await Post.find({_id:id})
    post=post[0]
    console.log("Postt",post)
    
    let filename=""
    let path=""
    
    if(updatedPost.tags!=undefined)
    {
        updatedPost.tags=updatedPost.tags.split(" ")
    }
    if(!req.file)
    {
        console.log("Check for deletion",updatedPost.imagedeletion)
        if(updatedPost.imagedeletion)
        {
           
        
            try{

            
            if(post.image!=undefined && post.image.url!=undefined) await cloudinary.uploader.destroy(post.image.filename);
            }
            catch(err)
            {
                console.log("Cloduinary error 1",err)
            }
            updatedPost.image={};
           
        }
    }
    else if(req.file)
    {
        console.log("Delete Image",post.image)

       if(post.image!=undefined && post.image.url!=undefined) 
       {
        console.log("inside cloudinary")
        try{
            await cloudinary.uploader.destroy(post.image.filename);
        }
        catch(err)
        {
            console.log("cloudinary error",err)
        }
        console.log(" cloudinary")
       }
       const {filename,path}=req.file;
       const image={url:path,filename}
       updatedPost.image=image;

    }

    try
    {
       const edited= await Post.findByIdAndUpdate(id,updatedPost)
       if(edited) console.log("Edit complete")
    }
    catch(err)
    {
        console.log("Error ",err)

    }
    
  



}


module.exports.deletePost=async(req,res)=>{
    const {id}=req.params;
    const post=await Post.find({_id:id});
    if(post.image!=undefined && post.image.url!=undefined)
    {
        await cloudinary.uploader.destroy(post.image.filename);
    }
    await Post.findByIdAndDelete({id:id});
}