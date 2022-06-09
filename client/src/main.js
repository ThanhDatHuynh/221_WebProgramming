import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import App from './App.vue'
// import storeConfig from './store'
import routes from './routes'
import vuetify from './plugin/vuetify'


Vue.use(Vuex)
Vue.use(VueRouter)
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
