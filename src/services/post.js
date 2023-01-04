// import Post from '@/Server/models/Post';
import axios from 'axios';


export const createPost=async(fd)=>{

    const response=await  axios.post("http://localhost:3000/user/post",fd)
    return response;

}

export const getPost=async(id)=>
{

    const response=await axios.get(`http://localhost:3000/user/post/${id}`)
    return response;

}

export const getAllPosts=async()=>{
    const response=await axios.get('http://localhost:3000/user/posts');
    return response;
}

export const getTaggedPosts=async(tag)=>{
    const response=await axios.get(`http://localhost:3000/posts/${tag}`);
    return response;
}




export const editPost=async(id,fd)=>
{

    const response=await axios.post(`http://localhost:3000/user/post/${id}`,fd)
    return response;

}

export const deletePost=async(id)=>
{
    const response=await axios.delete(`http://localhost:3000/user/post/${id}`);
    return response;

    
}

export const upvotePost=async(postid,userid)=>
{

    console.log("Upvote ",userid,postid)
    await axios.patch(`http://localhost:3000/user/${userid}/post/${postid}/upvote`);
    // console.log("Response ",response)
    // return response;
}


export const downvotePost=async(postid,userid)=>
{

    console.log("Downvote ",userid,postid)
     await axios.patch(`http://localhost:3000/user/${userid}/post/${postid}/downvote`);
    // console.log("Response ",response)
    // return response;
}

export const getUserPosts=async(id)=>
{
    console.log("User posts",id)
    const posts=await axios.get(`http://localhost:3000/user/posts/${id}`)
    return posts;


}