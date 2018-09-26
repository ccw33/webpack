import Vue from 'vue'
import Router from 'vue-router'
const HomePage = ()=>import('@/components/HomePage/index');
const Pay = ()=>import('@/components/PayPage/index');
const Download = ()=>import('@/components/DownloadPage/index');
const Account = ()=>import('@/components/AccountPage/index');
const login = ()=>import('@/components/AccountPage/login');
const sign_in = ()=>import('@/components/AccountPage/sign_in');

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/Pay',
      name: 'Pay',
      component: Pay,
    },
    {
      path: '/Download',
      name: 'Download',
      component: Download,
    },
    {
      path: '/Account',
      name: 'Account',
      component: Account,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: login,
        },
        {
          path: 'sign_in',
          name: 'SignIn',
          component: sign_in,
        },
      ]
    },
  ]
})
