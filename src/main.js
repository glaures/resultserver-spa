import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './resultserver-api'
import store from './store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false

import Cloudinary from "cloudinary-vue";
Vue.use(Cloudinary, {
  configuration: { cloudName: "sandkastenliga" }
});

import './plugins/vue-fontawesome'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {
};
Vue.use(Toast, options);

import VueLuxon from 'vue-luxon'
Vue.use(VueLuxon)

Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
