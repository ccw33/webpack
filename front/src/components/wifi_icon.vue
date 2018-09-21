<template>
  <span class="wifi-icon" :class="[strengthLevel,is_connected]">
    <span class="wifi-1"></span>
    <span class="wifi-2"></span>
    <span class="wifi-3"></span>
    <span class="wifi-4"></span>
    <span v-if="wifi.is_lock" class="lock"></span>
  </span>
</template>

<script>
  import utils from '../utils'
  export default {
    name: 'wifi_icon',
    components: {},
    props: {
      wifi_data: {
        type: Object,
        required: true,
        validator:function(value) {
          let template = {
            is_lock: true,
            strength: 1,
            is_connected:false,
          };
          return utils.validate_template(value, template, 'wifi_icon')
        }

      },
    },
    data() {
      return {
        wifi: this.$props.wifi_data
      }
    },
    computed: {
      // isLock() {
      //   return this.wifi.is_lock ? 'strength-ready' : 'strength-no'
      // },
      strengthLevel() {
        return this.wifi.strength>0?`strength-${this.wifi.strength}`:''
      },
      is_connected(){
        return this.wifi_data.is_connected?'strength-ready':'strength-no'
      },
    },
    methods: {},
    beforeCreate() {
      let vm = this;
      // // $.get(`${vm.host}/get_lans`,
      // //   function (resp) {
      // //     vm.lans = resp;
      // //     vm.lan_data = vm.lans[0];
      // //   });
      //
      // vm.$ajax.get(`${vm.host}/get_lans`)
      //   .then(resp => {
      //     vm.lans = resp.data;
      //   }).catch(error => {
      //   $('.alert-danger').show();
      // }).finally(() => {
      //   vm.lan_data = vm.lans[0];
      // });
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  /*.wifi-icon {*/
  /*transform: scale(0.8);*/
  /*}*/
</style>
