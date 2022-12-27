// export const login=(userCred)=>
// {
//     axios.post('http://localhost:3000/login',userCred).then((res) => {
//     this.error = '';
//     console.log("Login Res",res)
//     if (res.status === 200) {
//       localStorage.setItem('token', res.data.token);
//       console.log("Check token",res.data)
//       this.$router.push('/');
//     }
//   }, err => {
//     console.log("error",err.response)
//     this.error = err.response.data.error
//   })
// }

import {successHandler,errorHandler} from './helper'
import axios from 'axios';

export const login = ( credentials ) => {
    return axios.post(
                'http://localhost:3000/login',
                credentials,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then( successHandler )
                .catch( errorHandler );
};