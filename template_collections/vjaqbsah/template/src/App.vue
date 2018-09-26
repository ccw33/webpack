<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
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
