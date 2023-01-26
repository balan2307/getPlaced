const KEY_TOKEN='token';
const KEY_UID='uid';
const KEY_NAME='uname'
// import { getUserName } from '@/Server/Controllers/userController';
import { login } from '@/services/auth';
import { getUserId } from '@/services/user';
// localStorage.getItem(KEY_UID)
const auth={
    state:{
        token:localStorage.getItem(KEY_TOKEN) || '',
        uid: getUserId(localStorage.getItem(KEY_TOKEN)) || '',
        username:localStorage.getItem(KEY_NAME) || '',
        tokenstatus:true,
        shownav:true,
        isAuthorized:true
        
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
            // console.log("Uid called",state.uid)
            return state.uid;
        },
        getToken(state)
        {
            return state.token;
        },
        getTokenstatus(state)
        {
            return state.tokenstatus;
        },
        isAuthorized(state)
        {
            return state.isAuthorized;
        }
        // getNavstatus(state)
        // {
        //     return state.shownav;
        // }
 
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
        },
        setTokenStatus(state,status)
        {
            state.tokenstatus=status
        },
        setNavStatus(state)
        {
            state.shownav=this.getTokenstatus && this.isAuthenticated
        },
        setAuthorized(state,status)
        {
            state.isAuthorized=status;
        }
    
    },

    actions:{
        async login({commit},credentials){

            try{
                const data=await login(credentials);
                // console.log("Response",data)
                const {token,uid,username}=data.data;
              
                localStorage.setItem(KEY_TOKEN,token);
                localStorage.setItem(KEY_UID,uid);
                localStorage.setItem(KEY_NAME,username);

                // console.log("token,uid",token,uid,data)

                commit('setToken',token)
                commit('setUid',uid)
                commit('setUserName',username)
                return uid;

             
            }
            catch(err){
                console.log("store Error ",err);
                throw err;
            }

        },

        logout( { commit } ) {
            localStorage.removeItem( KEY_TOKEN );
            localStorage.removeItem( KEY_UID );
            localStorage.removeItem( KEY_NAME );
   
        
            commit( 'setToken', '' );
            commit( 'setUid', '' );
            commit( 'setUserName', '' );
    
            return Promise.resolve();
        }

    }
}


export default auth;