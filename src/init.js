import '@/services/plugin.js'
import Vue from 'vue'

import '@/services/configAxios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue ,IconsPlugin} from 'bootstrap-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass,faThumbsUp as faThumbsUpSolid,faThumbsDown as faThumbsDownSolid ,faHatWizard
,faCalendarDays, 
faGraduationCap} from '@fortawesome/free-solid-svg-icons'




library.add(faHatWizard,faCalendarDays,faGraduationCap,faMagnifyingGlass,)
library.add(faThumbsUpSolid,faThumbsDownSolid)



Vue.use(BootstrapVue)
Vue.use(IconsPlugin)



import '@/services/configAxios'


Vue.component('font-awesome-icon', FontAwesomeIcon)
