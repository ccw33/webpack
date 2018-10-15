<template>
  <div id="app">
        <v_alert :c_alert="$root.alert" @hide_success="$root.alert.success.is_show=false"
             @hide_fail="$root.alert.fail.is_show=false"></v_alert>
    <loading :is_loading="$root.is_loading"></loading>
    <router-view/>
  </div>
</template>

<script>
  import loading from '@/common/loading';
  import v_alert from '@/common/v_alert';

  export default {
    name: 'App',
    components: {loading, v_alert}

  }
</script>

<style lang="scss">
  /*@import "~bootstrap/scss/bootstrap";*/
  @import "assets/sass/base";

  body {
    background-color: $color-withe;
    h1, h2, h3, h4, h5, h6, h7 {
      font-family: 'SentyTEA';
    }
  }
</style>
