// import Post from '@/Server/models/Post';
import axios from 'axios';

// const base_url='http://localhost:3000'
export const createPost=async(fd)=>{

    const response=await  axios.post(`/user/post`,fd)
    return response;

}

export const getPost=async(id)=>
{

    const response=await axios.get(`/user/post/${id}`)
    return response;

}

export const getAllPosts=async()=>{
    const response=await axios.get(`/user/posts`);
    return response;
}

export const getTaggedPosts=async(tag)=>{
    const response=await axios.get(`/posts/${tag}`);
    return response;
}







export const editPost=async(id,fd)=>
{

    const response=await axios.post(`/user/post/${id}`,fd)
    return response;

}

export const deletePost=async(id)=>
{
    const response=await axios.delete(`/user/post/${id}`);
    return response;

    
}

export const upvotePost=async(postid,userid)=>
{

    console.log("Upvote ",userid,postid)
    await axios.patch(`/user/${userid}/post/${postid}/upvote`);
    // console.log("Response ",response)
    // return response;
}


export const downvotePost=async(postid,userid)=>
{

    console.log("Downvote ",userid,postid)
     await axios.patch(`/user/${userid}/post/${postid}/downvote`);
    // console.log("Response ",response)
    // return response;
}

export const getPostsPages=async(tag,currpage,perpage)=>{

    console.log("services getpostpages")
    const response=await axios.get(`/posts/pages/${tag}` ,{
        params:{
            page:currpage,
            limit:perpage
        }

    })

    return response


}

export const getUserPosts=async(id,currpage,perpage)=>
{
    console.log("User posts",id)
    const posts=await axios.get(`/user/posts/${id}`,{
        params:{
            page:currpage,
            limit:perpage
        }
    })
    return posts;


}