<template>
  <div>
    <v_alert :alert="alert" @hide_success="alert.success.is_show=false" @hide_fail="alert.fail.is_show=false"></v_alert>
    <ul class="nav nav-tabs">
      <li role="presentation" v-for="(item, index) in lans" :class="{'active':item.isActive}" @click="activate(index)">
        <a
          href="#">{{item.lan}}</a></li>
    </ul>
    <transition enter-active-class="animated bounceInLeft"
                leave-active-class="animated bounceOutRight">
      <template v-if="lan_data">    <!-- 保证v_lan组件在获取lan_data之后再渲染 -->
        <keep-alive>
          <v_tab :lan_data="lan_data" v-on:success="show('#change_setting_succeed')"
                 v-on:fail="show('#change_setting_failed')"></v_tab>
        </keep-alive>
      </template>
    </transition>
  </div>
</template>

<script>
  import v_tab from '@/components/v_tab';

  export default {
    name: 'Panel',
    components: {v_tab},
    data() {
      return {
        lans: [
          {
            'lan': '',
            'isActive': true,
            'is_auto': false,
            'ip': '',
            'subnet_mask': '',
            'gateway': '',
            'dns': '',
            'mac': ''
          },
        ],
        lan_data: '',
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
        this.lan_data = this.lans[index];
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
        }).catch(error => {
        console.error(`SERVER----------:${error.response.data.content}`);
        vm.alert.fail.is_show = true;
      }).finally(() => {
        vm.lan_data = vm.lans[0];
      });
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
