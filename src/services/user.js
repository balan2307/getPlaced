import axios from 'axios';
import { Buffer } from 'buffer';
// const base_url='http://localhost:3000'
// import { successHandler,errorHandler } from './helper';

export const getUserName=async(uid)=>{

    try{

    const response=await axios.get(`/username/${uid}`);
    // console.log("Username",response.data.username)
    return response.data.username;
    }
    catch(err)
    {
        console.log("error in getting username",err)
       

    }

}

export const getUserId=function (token)
{
    if(!token) return '';

    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).userId;

}


export const registerUser=(userCred,router)=>{

 return axios.post(`/user/auth/register`,userCred)
     .then(() => {
  
       router.push('/login');
      })
      .catch(err=>{
  
        throw err;
      })
}

export const deleteUserProfileImage=async(id)=> {

  try {
    await axios.delete(`/user/deleteImage/${id}`);
    // this.error = "";
  } catch (err) {
    console.log("error", err);
    // this.error = err.response.data.error;
  }
}



export const getUserProfile=async(id)=>{

  try {

    const res=await axios.get(`/user/profile/${id}`);

    if(res) {
   
      return res;
     
    }
    // this.error = "";
  } catch (error) {
    console.log("error serv", error);
    throw error;
    // this.error = err.response.data.error;
  }


}


export const EditProfile=async(id,fd)=>{

  try {
    const res=await axios.patch(`/user/profile/${id}`, fd);
    return res;
    // this.error = "";
  } catch (err) {
    
    console.log("error edit profile", err.response);
    throw err;

    // this.error = err.response.data.error;
  }
}

