{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);



import axios from 'axios/dist/axios'
import qs from 'qs/dist/qs'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap'

import Promise from 'es6-promise/dist/es6-promise'
import 'animate.css'
import Swiper from 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.css'

Promise.polyfill()
import 'font-awesome/css/font-awesome.css'
import '../static/Hover-master/css/hover.css'
import conf from './config'
import utilss from './utils'

utilss.Swiper = Swiper;

//前后端分离时异步请求可带cookie
axios.defaults.withCredentials = true;
//异步请求通用属性
const instance = axios.create({
  baseURL: conf.host,
  // timeout: 1000,
});
Vue.prototype.$ajax = instance;
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;
Vue.prototype.host=conf.host;
Vue.prototype.conf = conf;
Vue.prototype.utils = utilss;
Vue.prototype.$ = $;

// 全局注册组件
// import v_alert from '@/common/v_alert';
// Vue.component('v_alert', v_alert);

//全局mixin
Vue.mixin({
  data() {
    return {}
  },
})

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  data: {
    is_loading: false,
    alert: {
      success: {
        message: '操作成功',
        is_show: false,
      },
      fail: {
        message: '操作失败',
        is_show: false,
      }
    },
  },
  components: {App},
  template: '<App/>'
})

//请求拦截
vm.$ajax.interceptors.request.use(function (config) {
  vm.$root.is_loading = true;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

//响应拦截
vm.$ajax.interceptors.response.use(
  response => {
    vm.$root.is_loading = false;
    return response;
  },
  error => {
    vm.$root.is_loading = false;
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回登录页
          vm.$router.push('/login');
      }
    }
    return Promise.reject(error);
  });

