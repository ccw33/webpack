<template>
  <span class="wifi-icon" :class="[strengthLevel]">
    <span class="wifi-1"></span>
    <span class="wifi-2"></span>
    <span class="wifi-3"></span>
    <span class="wifi-4"></span>
    <span v-if="wifi.is_lock" class="lock"></span>
  </span>
</template>

<script>
  import v_tab from '@/components/v_tab';

  export default {
    name: 'wifi_icon',
    components: {},
    prop: {
      wifi_data: {
        type: Object,
        required: true,
        validator(value) {
          let template = {
            is_lock: true,
            strength: 1,
          };
          return utils.validator(value, template, 'wifi_data')
        }
      },
    },
    data() {
      return {
        wifi:this.$attrs.wifi_data
      }
    },
    computed: {
      // isLock() {
      //   return this.wifi.is_lock ? 'strength-ready' : 'strength-no'
      // },
      strengthLevel() {
        return `strength-${this.wifi.strength}`
      }
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
