import axios from 'axios';
import { Buffer } from 'buffer';


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




export const getUserProfile=(id)=>{


 return axios.get(`/user/profile/${id}`)
  .then((res)=>{
     return res

  })
  .catch((err)=>{
    throw err
  })




}


export const EditProfile=(id,fd)=>{


  return axios.patch(`/user/profile/${id}`, fd)
  .then((res) =>{
   return res
  })
  .catch((err)=>{ throw err})
   
    
  



}

