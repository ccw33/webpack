// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
require('jquery');
require('bootstrap');
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.prototype.$ajax = axios;
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;
Vue.prototype.host='http://172.16.125.67:5000';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
