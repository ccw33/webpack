import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Panel from '@/components/Panel'
import Wifi from '@/components/Wifi'
import wifi_connect_win from '@/components/wifi_connect_win'
import screen_set from '@/components/screen_set'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'Panel',
      component: Panel
    },
    {
      path: '/wifi',
      name: 'Wifi',
      component: Wifi
    },
    {
      path: '/wifi_connect_win',
      name: 'wifi_connect_win',
      component: wifi_connect_win
    },
    {
      path: '/screen_set',
      name: 'screen_set',
      component: screen_set
    }
  ]
})
