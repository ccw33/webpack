<template>
  <div class="container-fluid">
    <ul style="width: 100%;">
      <template v-for="(wifi,index) in wifi_list">
        <li class="hvr-grow btn-group" role="group"
            data-toggle="collapse" :data-target="'#'+index+'-wifi'" aria-expanded="false"
            :aria-controls="index+'-wifi'">
          <span class="clearfix visible-xs-block"></span>
          <span class="col-xs-10 text-muted">{{wifi.name}}</span>
          <!--<span class="col-xs-3">{{wifi.is_lock}}</span>-->
          <!--<span class="col-xs-2">{{wifi.strength}}</span>-->
          <wifi_icon class="col-xs-2" :wifi_data="wifi"></wifi_icon>
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
          // {
          //   name: '别连我dsfasefwagewt',
          //   is_lock: true,
          //   key_type: 'WPA2',
          //   strength: 1,
          //   is_connected:false,
          // },
          // {
          //   name: 'hahaha',
          //   is_lock: true,
          //   key_type: 'WPA2',
          //   strength: 2,
          //   is_connected:false,
          // },
          // {
          //   name: '嘻嘻嘻',
          //   is_lock: false,
          //   key_type: 'WPA2',
          //   strength: 4,
          //   is_connected:false,
          // },
        ]
      }
    },
    methods: {
      open_wifi_link(wifi) {
        const vm = this;
        debugger;
        // 打开wifi连接窗口并关闭本窗口
        vm.$ajax.post(
          `${vm.host}/open_wifi_setting`,
          vm.$qs.stringify(wifi),
        ).then(function (response) {
          debugger;
          console.log(response);
        }).catch(function (error) {
          debugger;
          console.log(error);
        });
      },
      disconnect_wifi(wifi, selector) {
        const vm = this;
        // $(selector).removeClass('in');
        vm.$ajax.post(
          `${vm.host}/disconnect_wifi`,
          vm.$qs.stringify(wifi),
        ).then(function (response) {
          debugger;
          console.log(response);
        }).catch(function (error) {
          debugger;
          console.log(error);
        });
      }


    },
    beforeCreate() {
      let vm = this;
      // $.get(`${vm.host}/get_lans`,
      //   function (resp) {
      //     vm.lans = resp;
      //     vm.lan_data = vm.lans[0];
      //   });

      vm.$ajax.get(`${vm.host}/get_wifis`)
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
        console.error(`SERVER----------:${error.response.data.content}`);
        $('.alert-danger').show();
      }).finally(() => {
        // vm.lan_data = vm.lans[0];
      });
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../../static/css/base";

  .container-fluid {
    padding: 0;
    ul {
      background-color: #e1e1e1;

      padding-left: 0rem;
      li {
        width: 100%;
        height: 2rem;
        list-style-type: none;
        padding-left: 1rem;
        padding-top: 0.2rem;
        span {
          padding: 0;
        }
      }
      .hvr-grow:hover {
        border-radius: 0.5rem;
        background-color: #eeeeee;
      }
    }
  }
</style>
