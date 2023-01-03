import axios from 'axios';
import { Buffer } from 'buffer';

export const getUserName=async(uid)=>{

    try{

    const response=await axios.get(`http://localhost:3000/username/${uid}`);
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

  await axios.post('http://localhost:3000/user/register',userCred).then(() => {
        // this.error = '';
       router.push('/login');
      }, err => {
        console.log("error",err.response)
        // this.error = err.response.data.error
      })
}

export const deleteUserProfileImage=async(id)=> {

  try {
    await axios.post(`http://localhost:3000/user/deleteImage/${id}`);
    // this.error = "";
  } catch (err) {
    console.log("error", err.response);
    // this.error = err.response.data.error;
  }
}

export const getUserProfile=async(id)=>
{
  try {
    await axios.post(`http://localhost:3000/user/profile/${id}`);
    // this.error = "";
  } catch (err) {
    console.log("error", err.response);
    // this.error = err.response.data.error;
  }

}