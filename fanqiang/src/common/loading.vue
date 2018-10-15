<template>
  <!--<transition enter-active-class="animated fadeIn"-->
  <!--leave-active-class="animated fadeOut">-->
  <div v-if="is_loading" class="loading-container w-100 h-100 text-center">
    <slot>
      <slot name="after_spinner"></slot>
    </slot>
  </div>

  <!--</transition>-->
</template>

<script>
  import spinner from '@/common/spinner';
  // $('.carousel').carousel({
  //   pause:true,
  // });
  export default {
    name: 'loading',
    props: {
      is_loading: Boolean,
    },
    data() {
      return {
      }
    },
    components: {spinner},
    methods: {},
    mounted() {
      const vm = this;
    },
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
<style scoped lang="scss">
  @import "../assets/sass/base";

  .loading-container {
    background-color: rgba(0.3, 0.3, 0.3, 0.3);
    /*width: 10em;*/
    /*height: 4em;*/
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
  }


</style>
