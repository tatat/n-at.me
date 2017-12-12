import 'es6-shim'
import Vue from 'vue'
import Meta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(Meta)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})
