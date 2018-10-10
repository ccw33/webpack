<template>
  <!--<transition enter-active-class="animated fadeIn"-->
  <!--leave-active-class="animated fadeOut">-->
  <div v-if="is_loading" class="my-container w-100 h-100 inline-row-center-center">
    <slot>
      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </slot>
  </div>

  <!--</transition>-->
</template>

<script>

  // $('.carousel').carousel({
  //   pause:true,
  // });
  export default {
    name: 'loading',
    props: {
      is_loading: Boolean
    },
    components: {},
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
<style scoped lang="scss">
  @import "../assets/sass/base";

  .my-container {
    background-color: rgba(0.3, 0.3, 0.3, 0.3);
    width: 10em;
    height: 4em;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    color: $color-withe-gray;
  }

  .spinner {
    margin: 100px auto;
    width: 50px;
    height: 60px;
    text-align: center;
    font-size: 10px;
    background-color: transparent;
  }

  .spinner > div {
    background-color: $primary;
    height: 100%;
    width: 6px;
    display: inline-block;

    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
  }

  .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  @-webkit-keyframes stretchdelay {
    0%, 40%, 100% {
      -webkit-transform: scaleY(0.4)
    }
    20% {
      -webkit-transform: scaleY(1.0)
    }
  }

  @keyframes stretchdelay {
    0%, 40%, 100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
    }
  }

</style>
