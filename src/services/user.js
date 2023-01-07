import axios from 'axios';
import { Buffer } from 'buffer';
// const base_url='http://localhost:3000'

export const getUserName=async(uid)=>{

    try{

    const response=await axios.get(`/username/${uid}`);
    console.log("Username",response.data.username)
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


export const registerUser=async(userCred,router)=>{

  await axios.post(`/user/auth/register`,userCred).then(() => {
        // this.error = '';
       router.push('/login');
      }, err => {
        console.log("error",err.response)
        // this.error = err.response.data.error
      })
}

export const deleteUserProfileImage=async(id)=> {

  try {
    await axios.post(`/user/deleteImage/${id}`);
    // this.error = "";
  } catch (err) {
    console.log("error", err.response);
    // this.error = err.response.data.error;
  }
}



export const getUserProfile=async(id)=>{

  try {
    const res=await axios.get(`/user/profile/${id}`);
    console.log("Res",res)
    if(res) return res;
    // this.error = "";
  } catch (err) {
    console.log("error", err);
    // this.error = err.response.data.error;
  }


}


export const EditProfile=async(id,fd)=>{

  try {
    await axios.post(`/user/profile/${id}`, fd);
    // this.error = "";
  } catch (err) {
    console.log("error", err.response);
    // this.error = err.response.data.error;
  }
}

