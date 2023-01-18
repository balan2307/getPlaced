import axios from 'axios';
import store from '@/store';

// @todo Logic can be bettered to prevent hard-coding authenticated requests
axios.interceptors.request.use(

    request => {
        // request.headers['Content-Type'] = 'application/json';
        // request.headers['Access-Control-Allow-Origin'] = '*';
        if( !request.url.includes( 'login' ) || !request.url.includes( 'register' )  ) {
   
            request.headers['Authorization'] = `Bearer ${store.state.auth.token}`;
        }


        return request;
    },
    error =>{
        console.log("reject error")
     Promise.reject( error )
    }
);