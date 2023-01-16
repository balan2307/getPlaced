
import {successHandler,errorHandler} from './helper'
import axios from 'axios';

// const base_url='http://localhost:3000'

export const login = ( credentials ) => {
    return axios.post(
                `/user/auth/login`,
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




export const authUser = ( token ) => {
    

 
    return  axios.get(`/user/auth/authorize/${token}`)
    .then( successHandler )
    .catch( errorHandler );
   
}
