import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import routes from './router'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueRouter)

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdi' || 'fa', // default - only for display purposes
  },
})

const router = new VueRouter({
  mode: 'hash',
  routes
})

new Vue({
  render: h => h(App),
  vuetify,
  router
}).$mount('#app')
