import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './resultserver-api'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false

import Cloudinary from "cloudinary-vue";
Vue.use(Cloudinary, {
  configuration: { cloudName: "sandkastenliga" }
});

import './plugins/vue-fontawesome'


Vue.prototype.$api = api;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
