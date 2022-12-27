import Vuex from 'vuex';
import auth from './modules/auth'

const store=new Vuex.Store({
    modules:{
        auth,
        namespaced: true
    }
})

export default store;