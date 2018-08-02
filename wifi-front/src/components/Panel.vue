<template>
  <div class="col-xs-12">
    <ul class="col-xs-12">
      <li v-for="wifi in wifi_list">
        <span class="name">{{wifi.name}}</span>
        <span class="is_lock">{{wifi.is_lock}}</span>
        <span class="strength">{{wifi.strength}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import v_tab from '@/components/v_tab';

  export default {
    name: 'Panel',
    components: {v_tab},
    data() {
      return {
        wifi_list: [
          {
            name: '别连我',
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
  /*.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {*/
  /*position: relative;*/
  /*min-height: 1px;*/
  /*padding-right: 2px;*/
  /*padding-left: 2px;*/
  /*}*/

  li {
    .name {
      .inline-flex();
      width: 60%;
      text-align: center;
    }
    .is_lock, .strength {
      .inline-flex();
      width: 15%;
      min-width: 2rem;
      text-align: center;
    }
  }
</style>
