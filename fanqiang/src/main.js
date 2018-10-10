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


Vue.prototype.$ajax = axios;
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;
Vue.prototype.host=conf.host;
Vue.prototype.conf = conf;
Vue.prototype.utils = utilss;
Vue.prototype.$ = $;

// 全局注册组件
import v_alert from '@/common/v_alert';
Vue.component('v_alert',v_alert);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
