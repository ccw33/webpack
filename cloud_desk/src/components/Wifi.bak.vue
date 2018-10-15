<template>
  <div class="container-fluid">
    <header class="w-100 position-relative">
      <h6 class="position-absolute" style="">可用网络</h6>
      <div class="position-absolute" @click="get_wifi_list"></div>
    </header>
    <ul style="width: 100%;">
      <template v-for="(wifi,index) in wifi_list">
        <li class=" btn-group" role="group"
            data-toggle="collapse" :data-target="'#'+index+'-wifi'" aria-expanded="false"
            :aria-controls="index+'-wifi'">
          <span class="clearfix visible-xs-block"></span>
          <span class="col-xs-10 text-muted">{{wifi.name}}</span>
          <!--<span class="col-xs-3">{{wifi.is_lock}}</span>-->
          <!--<span class="col-xs-2">{{wifi.strength}}</span>-->
          <!--<wifi_icon class="col-xs-2" :wifi_data="wifi"></wifi_icon>-->
        </li>
        <div class="collapse w-100" :id="index+'-wifi'">
          <div class="card card-body w-100">
            <button type="button" class="btn btn-success btn-xs" style="margin-left: 1rem;"
                    @click="open_wifi_link(wifi)">打开
            </button>
            <button type="button" class="btn btn-danger btn-xs" style="margin-left: 2rem;"
                    @click="disconnect_wifi(wifi,'#'+index+'-wifi')"
                    v-if="wifi.is_connected">断开
            </button>
          </div>
        </div>
        <!--<transition enter-active-class="animated slideInDown">-->
        <!--<div v-if="wifi.is_clicked" class="row w-100">-->
        <!--<button type="button" class="btn btn-secondary col-xs-3">连接</button>-->
        <!--<button type="button" class="btn btn-secondary col-xs-3">断开</button>-->
        <!--</div>-->
        <!--</transition>-->
      </template>
    </ul>
  </div>
</template>

<script>
  import wifi_icon from '@/components/wifi_icon';

  export default {
    name: 'Wifi',
    components: {wifi_icon},
    data() {
      return {
        wifi_list: [
          {
            name: '别连我dsfasefwagewt',
            is_lock: true,
            key_type: 'WPA2',
            strength: 1,
            is_connected: false,
          },
          {
            name: 'hahaha',
            is_lock: true,
            key_type: 'WPA2',
            strength: 2,
            is_connected: false,
          },
          {
            name: '嘻嘻嘻',
            is_lock: false,
            key_type: 'WPA2',
            strength: 4,
            is_connected: false,
          },
        ]
      }
    },
    methods: {
      get_wifi_list() {
        const vm = this;
        vm.$ajax.get(`${vm.host}/api/operation_system/get_wifis`)
          .then(resp => {
            vm.wifi_list = resp.data;
            for (let i = 0; i < vm.wifi_list.length; i++) {
              if (vm.wifi_list[i].is_connected) {
                let temp = vm.wifi_list.splice(i, 1)[0];
                vm.wifi_list.splice(0, 0, temp);
                break;
              }
            }
          }).catch(error => {
          $('.alert-danger').show();
        }).finally(() => {
          // vm.lan_data = vm.lans[0];
        });
      },
      open_wifi_link(wifi) {
        const vm = this;
        debugger;
        // 打开wifi连接窗口并关闭本窗口
        vm.$ajax.post(
          `${vm.host}/api/operation_system/open_wifi_setting`,
          vm.$qs.stringify(wifi),
        ).then(function (response) {
          debugger;
          console.log(response);
        }).catch(function (error) {
          debugger;
        });
      },
      disconnect_wifi(wifi, selector) {
        const vm = this;
        // $(selector).removeClass('in');
        vm.$ajax.post(
          `${vm.host}/api/operation_system/disconnect_wifi`,
          vm.$qs.stringify(wifi),
        ).then(function (response) {
          debugger;
          console.log(response);
        }).catch(function (error) {
          debugger;
        });
      }


    },
    beforeCreate() {
      let vm = this;
      // $.get(`${vm.host}/api/operation_system/get_lans`,
      //   function (resp) {
      //     vm.lans = resp;
      //     vm.lan_data = vm.lans[0];
      //   });
      vm.get_wifi_list();
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  /*@import "../../static/css/base";*/
  @import "../assets/sass/base";

  .container-fluid {
    padding: 0;
    position: fixed;
    z-index: 9999;
    bottom: 1em;
    right: 2em;
    width: 280px;
    height: 450px;
    background-color: $color-withe;
    border-radius: 0.5em;

    header {
      height: 46px;
      h6 {
        line-height: 46px;
        top: 0;
        left: 1em;
      }
      div {
        top: 0.8em;
        right: 1em;
        height: 1em;
        width: 1em;
        background: {
          position: center;
          repeat: no-repeat;
          size: contain;
          image: url("/static/img/later-images-01/yzm_36_01.png");
        }
        &:hover {
          background: {
            image: url("/static/img/later-images-01/yzm_36_02.png");
          }
        }
      }

      ul {
        padding: 10px;
        li {
          width: 100%;
          height: 40px;
          list-style-type: none;
          border-bottom: {
            style: solid;
            width: 1px;
            color: $primary;
          }
          &:hover {
            background-color: #eeeeee;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
