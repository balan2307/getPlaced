import axios from 'axios';


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