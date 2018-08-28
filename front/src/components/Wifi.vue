<template>
  <div class="container-fluid">
    <ul style="width: 100%;">
      <li class="hvr-grow" @click="open_wifi_link(wifi)"
          v-for="wifi in wifi_list">
        <span class="clearfix visible-xs-block"></span>
        <span class="col-xs-10 text-muted">{{wifi.name}}</span>
        <!--<span class="col-xs-3">{{wifi.is_lock}}</span>-->
        <!--<span class="col-xs-2">{{wifi.strength}}</span>-->
        <wifi_icon class="col-xs-2" :wifi_data="wifi"></wifi_icon>
      </li>
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
          // },
          // {
          //   name: 'hahaha',
          //   is_lock: true,
          //   key_type: 'WPA2',
          //   strength: 2,
          // },
          // {
          //   name: '嘻嘻嘻',
          //   is_lock: false,
          //   key_type: 'WPA2',
          //   strength: 4,
          // },
        ]
      }
    },
    methods: {
      open_wifi_link(wifi) {
        const vm = this;
        debugger
        // 打开wifi连接窗口并关闭本窗口
        vm.$ajax.post(
          `${vm.host}/open_wifi_setting`,
          vm.$qs.stringify(wifi),
        ).then(function (response) {
          debugger;
          console.log(response);
        })
          .catch(function (error) {
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
      padding-left: 0rem;
      li {
        width: 100%;
        height: 2rem;
        list-style-type: none;
        padding-left: 1rem;
        background-color: #e1e1e1;
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
