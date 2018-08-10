import conf from "../../front/src/config";

{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}


import axios from 'axios'
import qs from 'qs'
require('jquery');
require('bootstrap');
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Promise from 'es6-promise'
import 'animate.css'
Promise.polyfill()
import '../static/font-awesome-4.7.0/css/font-awesome.min.css'
import '../static/Hover-master/css/hover-min.css'
import '../static/css/base.css'
import conf from './config'
import utilss from './utils'

var utils = utilss;

Vue.prototype.$ajax = axios;
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;
Vue.prototype.host=conf.host;
Vue.prototype.utils = utilss;

// 全局注册组件
import v_alert from '@/common/v_alert';
Vue.component('v_alert',v_alert);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
