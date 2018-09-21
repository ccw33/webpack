<template>
  <div class="main-container">
    <div class="top-img"></div>
    <div class="content">
      <v_alert :alert="alert" @hide_success="alert.success.is_show=false"
               @hide_fail="alert.fail.is_show=false"></v_alert>
      <ul class="nav nav-tabs">
        <li role="presentation" v-for="(item, index) in lans" :class="{'active':item.isActive}"
            @click="activate(index)">
          <a
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
          // {
          //   'lan': '',
          //   'isActive': true,
          //   'is_auto': false,
          //   'ip': '',
          //   'subnet_mask': '',
          //   'gateway': '',
          //   'dns': '',
          //   'mac': ''
          // },
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
      // $.get(`${vm.host}/get_lans`,
      //   function (resp) {
      //     vm.lans = resp;
      //     vm.lan_data = vm.lans[0];
      //   });

      vm.$ajax.get(`${vm.host}/get_lans`)
        .then(resp => {
          vm.lans = resp.data;
          vm.$store.commit('initial_old_data', vm.utils.copy(vm.lans));
        }).catch(error => {
        console.error(`SERVER----------:${error.response.data.content}`);
        vm.alert.fail.is_show = true;
      });
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .main-container {
    .top-img{
      width: 100%;
      padding-bottom: 30%;
      background-image: url("/static/img/yzm_18_2.png");
      background-size: 100% auto;
    }
  }

</style>
