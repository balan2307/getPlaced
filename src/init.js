
// import Vuex from 'vuex'
import '@/services/plugin.js'
import Vue from 'vue'

import '@/services/configAxios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue ,IconsPlugin} from 'bootstrap-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp as faThumbsUpSolid,faThumbsDown as faThumbsDownSolid  } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp,faThumbsDown } from '@fortawesome/free-regular-svg-icons'
// import Router from 'vue-router';


library.add(faThumbsUp,faThumbsDown)
library.add(faThumbsUpSolid,faThumbsDownSolid)


// Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
// Vue.use(Router)

import '@/services/configAxios'


Vue.component('font-awesome-icon', FontAwesomeIcon)
