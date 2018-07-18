<template>
  <div class="col-xs-12">
    <div style="width: 100%;">
      <li style="width: 100%;list-style-type:none;" v-for="wifi in wifi_list">
        <span class="clearfix visible-xs-block"></span>
        <span class="col-xs-7">{{wifi.name}}</span>
        <span class="col-xs-3">{{wifi.is_lock}}</span>
        <!--<span class="col-xs-2 clearfix wifi">{{wifi.strength}}</span>-->
        <i class="col-xs-2 fa fa-wifi"></i>
      </li>
    </div>
  </div>
</template>

<script>
  import v_tab from '@/components/v_tab';

  export default {
    name: 'Wifi',
    components: {v_tab},
    data() {
      return {
        wifi_list: [
          {
            name: '别连我dsfasefwagewt',
            is_lock: true,
            strength: 1,
          },
          {
            name: 'hahaha',
            is_lock: true,
            strength: 1,
          },
          {
            name: '嘻嘻嘻',
            is_lock: false,
            strength: 1,
          },
        ]
      }
    },
    methods: {},
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
        $('.alert-danger').show();
      }).finally(() => {
        vm.lan_data = vm.lans[0];
      });
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../../static/css/base";

  li {
    span {
      padding: 0;
    }
  }
</style>
