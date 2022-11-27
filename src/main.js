import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import customFuncs from '@/mixins'
import './http/'

Vue.config.productionTip = false

Vue.mixin(customFuncs)

window.app = new Vue({
  data: {
    // Would typically have this data state managed in VueX or Pinia
    client_id: localStorage.getItem('client_id'),
    favList: localStorage.getItem('fav_list') ? localStorage.getItem('fav_list').split(',') : []
  },
  router,
  render: h => h(App)
}).$mount('#app')
