<template>
  <div class="ip-setting-container">
    <!--<div class="top-img"></div>-->
    <header class="w-100 position-relative">
      <h6 class="position-absolute" style="">网络设置</h6>
      <div class="text-muted position-absolute"
           @click="$emit('close_ip_setting')">×
      </div>
    </header>
    <!--<b-tabs>-->
    <!--<b-tab v-for="(item, index) in lans" :title="item.lan"-->
    <!--@click="activate(index)" :key="item.ip">-->
    <!--<v_tab :lan_data="item" :key="item.id" :index="index"></v_tab>-->
    <!--</b-tab>-->
    <!--</b-tabs>-->
    <div class="content">
      <ul class="nav nav-tabs">
        <li class="nav-item" role="presentation" v-for="(item, index) in lans"
            @click="activate(index)">
          <a class="nav-link" :class="{'active':item.isActive}"
             href="#">{{item.lan}}</a></li>
      </ul>
      <template v-for="(lan, index)  in lans">
        <!--<transition enter-active-class="animated bounce">-->
        <template v-if="lan.isActive">    <!-- 保证v_lan组件在获取lan_data之后再渲染 -->
          <!--<keep-alive>-->
          <v_tab :lan_data="lans[index]" :key="lan.id" :index="index"></v_tab>
          <!--</keep-alive>-->
        </template>
        <!--</transition>-->
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
            'isActive': false,
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
      vm.$ajax.get(`${vm.host}/api/operation_system/get_lans`)
        .then(resp => {
          vm.lans = resp.data;
          vm.$store.commit('initial_old_data', vm.utils.copy(vm.lans));
        }).catch(error => {
        vm.$root.alert.fail.message = '获取网络配置失败'
        vm.$root.alert.fail.is_show = true;
      });
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/sass/base";

  .ip-setting-container {
    width: 100%;
    /*height: 100%;*/
    border-radius: 0.5em;
    background-color: $color-withe;

    header {
      height: 46px;
      h6 {
        line-height: 46px;
        top: 0;
        left: 1rem;
      }
      div {
        line-height: 46px;
        top: 0;
        right: 1rem;
        font-size: 2rem;
        color: $primary;
        &:hover {
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
    .content {
      ul, li, a {
        height: 40px;
        a {
          /*width: 100px;*/
        }
      }
    }
  }

</style>
