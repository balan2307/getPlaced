import axios from 'axios';
import store from '@/store';

// @todo Logic can be bettered to prevent hard-coding authenticated requests
axios.interceptors.request.use(
    // this function is called automatically whenever any request goes out
    request => {
        if( !request.url.includes( 'login' ) || !request.url.includes( 'register' )  ) {
            // console.log("checking token",request.url)
            request.headers['Authorization'] = `Bearer ${store.state.auth.token}`;
        }

        // console.log("Request ",request)
        return request;
    },
    error =>{
        console.log("reject error")
     Promise.reject( error )
    }
);