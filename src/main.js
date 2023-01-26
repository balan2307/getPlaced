import './init'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import store from '@/store'
import App from './App.vue'
import router from './router';



Vue.config.productionTip = false
export const eventBus=new Vue();
Vue.use(Vuelidate)
import axios from 'axios'
axios.defaults.baseURL=process.env.VUE_APP_BASE_URL
// Vue.prototype.$publicpath = './../../public'

import errorMessage from '@/components/Utils/ErrorMessage'
import LoadingIcon from '@/components/Utils/Loading.vue'
import AlertMessage from '@/components/Utils/AlertMessage.vue'

import NotFound from '@/components/Utils/NotFound'


Vue.component('errorMessage', errorMessage)
Vue.component('LoadingIcon', LoadingIcon)
Vue.component('AlertMessage', AlertMessage)
Vue.component('NotFound',NotFound)


// Vue.component('boxIcon',BoxIcons)





new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
