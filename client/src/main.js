import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
// import storeConfig from './store'
import routes from './routes'
import vuetify from './plugin/vuetify'
import Modal from "@burhanahmeed/vue-modal-2";
Vue.use(Modal, {
  componentName: "ModalVue"
});
Vue.use(Vuex)
Vue.use(VueRouter)

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faClock, faLocationDot, faPhone, faUserSecret, faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* add icons to the library */
library.add(faUserSecret, faLocationDot, faPhone, faClock, faCirclePlus, faCircleMinus)
/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

// const store = new Vuex.Store(storeConfig)
const router = new VueRouter({ routes, mode: 'history' })
let app = new Vue({
  //store,
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')

global.vm = app;
