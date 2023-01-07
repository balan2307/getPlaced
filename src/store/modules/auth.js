const KEY_TOKEN='token';
const KEY_UID='uid';
// import { getUserName } from '@/Server/Controllers/userController';
import { login } from '@/services/auth';
import { getUserId } from '@/services/user';
// localStorage.getItem(KEY_UID)
const auth={
    state:{
        token:localStorage.getItem(KEY_TOKEN) || '',
        uid:  getUserId(localStorage.getItem(KEY_TOKEN)) ||'',
        username:""
        
    },
    getters:{
        
        isAuthenticated(state){
            // console.log("token ",state.token)
            return (state.token!='')
        },
        getUserName(state)
        {
            // console.log("called",state.token)
            return state.username;

        },
        getUid(state)
        {
            console.log("Uid called",state.uid)
            return state.uid;
        },
        getToken(state)
        {
            return state.token;
        }
 
    },
    mutations:{
        setToken(state,token){
            state.token=token
        },
        setUid(state,uid){
            state.uid=uid 
        },
        setUserName(state,name)
        {
            state.username=name
        }
    },

    actions:{
        async login({commit},credentials){

            try{
                const data=await login(credentials);
                console.log("Response",data)
                const {token,uid}=data;
                localStorage.setItem(KEY_TOKEN,token);
                localStorage.setItem(KEY_UID,uid);

                commit('setToken',token)
                commit('setUid',uid)
                return uid;

             
            }
            catch(err){
                console.log("Error ",err);
                throw err.message;
            }

        },

        logout( { commit } ) {
            localStorage.removeItem( KEY_TOKEN );
            localStorage.removeItem( KEY_UID );
   
        
            commit( 'setToken', '' );
            commit( 'setUid', '' );
    
            return Promise.resolve();
        }

        // getUserName({state})
        // {

        //     if(state.uid)

        //     {
        //         await getUsername(uid);
        //     }

        // }
    }
}


export default auth;