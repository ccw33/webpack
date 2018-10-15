// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);


import axios from 'axios'
import qs from 'qs'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap'
import Promise from 'es6-promise'
import 'animate.css'
import Swiper from 'swiper'
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
Vue.prototype.host = conf.host;
Vue.prototype.conf = conf;
Vue.prototype.utils = utilss;
Vue.prototype.$ = $;

// // 全局注册组件
// import v_alert from '@/common/v_alert';
// Vue.component('v_alert',v_alert);

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
  if (config.url.search('ServerSPICEConsole') != -1) {
    return config;
  }
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
    window.setTimeout(() => {
      vm.$root.alert.success.is_show = false
      vm.$root.alert.fail.is_show = false
    }, 3000)
    return response;
  },
  error => {
    vm.$root.is_loading = false;
    window.setTimeout(() => {
      vm.$root.alert.success.is_show = false
      vm.$root.alert.fail.is_show = false
    }, 3000)
    try {
      debugger;
      console.error(`SERVER----------:${error.response.data}`);
    } catch (err) {
      console.error('处理服务器错误出错' + err.message)
    }
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回登录页
          vm.$router.push('/Account/login');
          vm.$root.alert.fail.message = '请先登录'
          vm.$root.alert.fail.is_show = false
      }
    }
    return Promise.reject(error);
  });
