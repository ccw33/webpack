<template>
  <div class="my-container">
    <!--<div class="top-img"></div>-->
    <div class="content">
      <ul class="nav nav-tabs">
        <li class="nav-item" role="presentation" v-for="(item, index) in lans"
            @click="activate(index)">
          <a class="nav-link" :class="{'active':item.isActive}"
             href="#">{{item.lan}}</a></li>
      </ul>
      <template v-for="(lan, index)  in lans">
        <transition enter-active-class="animated bounce">
          <template v-if="lan.isActive">    <!-- 保证v_lan组件在获取lan_data之后再渲染 -->
            <!--<keep-alive>-->
            <v_tab :lan_data="lans[index]" :key="lan.id" :index="index"></v_tab>
            <!--</keep-alive>-->
          </template>
        </transition>
      </template>
    </div>
  </div>
</template>

<script>
  import v_tab from '@/components/v_tab';
  import Vuex from 'vuex'
  import Vue from 'vue'

  Vue.use(Vuex);

  const store = new Vuex.Store({
    state: {
      old_data_list: []
    },
    mutations: {
      initial_old_data(state, old_data_list) {
        state.old_data_list = old_data_list;
      }
    },
    getters: {
      get_old_data: (state) => (index) => state.old_data_list[index]
    }
  });

  export default {
    name: 'Panel',
    store: store,
    components: {v_tab},
    data() {
      return {
        lans: [
          {
            'lan': '11111',
            'isActive': true,
            'is_auto': false,
            'id': '11111',
            'ip': '11111',
            'subnet_mask': '11111',
            'gateway': '11111',
            'dns': '11111',
            'mac': '11111'
          },
          {
            'lan': '22222',
            'id': '22222',
            'isActive': true,
            'is_auto': false,
            'ip': '22222',
            'subnet_mask': '22222',
            'gateway': '22222',
            'dns': '22222',
            'mac': '22222'
          },
        ],
        alert: {
          success: {
            message: '',
            is_show: false,
          },
          fail: {
            message: '获取配置失败',
            is_show: false,
          }
        }
      }
    },
    methods: {
      activate(index) {
        this.lans.forEach((item, index, arr) => {
          item.isActive = false;
        });
        this.lans[index].isActive = true;
      },
    },
    beforeCreate() {
      let vm = this;
      // vm.$ajax.get(`${vm.host}/get_lans`)
      //   .then(resp => {
      //     vm.lans = resp.data;
      //     vm.$store.commit('initial_old_data', vm.utils.copy(vm.lans));
      //   }).catch(error => {
      //   console.error(`SERVER----------:${error.response.data.content}`);
      //   vm.$root.alert.fail.is_show = true;
      // });
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .my-container {
    /*.top-img{*/
    /*width: 100%;*/
    /*padding-bottom: 30%;*/
    /*!*background-image: url("/static/img/yzm_18_2.png");*!*/
    /*background-size: 100% auto;*/
    /*}*/
  }

</style>
