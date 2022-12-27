const KEY_TOKEN='token';
const KEY_UID='uid';
import { login } from '@/services/auth';

const auth={
    store:{
        token:localStorage.getItem(KEY_TOKEN) || '',
        uid:localStorage.getItem(KEY_UID) ||''
    },
    getters:{

        isAuthenticated(state){
            return state.token!=''
        }
 
    },
    mutations:{
        setToken(state,token){
            state.token=token
        },
        setUid(state,uid){
            state.uid=uid 
        }
    },

    actions:{
        async login({commit},credentials){

            try{
                const data=await login(credentials);
                console.log("Response",data)
                const {token,uid}=data;
                localStorage.setItem(KEY_TOKEN,token);
               
                


                

                commit('setToken',token)
                commit('setUid',uid)
                return uid;

             
            }
            catch(err){
                console.log("Error ",err);
                throw err.message;
            }

        }
    }
}


export default auth;