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

