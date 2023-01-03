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


