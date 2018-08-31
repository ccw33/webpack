<template>
  <div class="container-fluid">
    <div class="row w-100">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active" href="#">Active</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
             aria-expanded="false">Dropdown</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>
    </div>
    <div class="row justify-content-center  ">
      <div id="carouselExampleControls" class="carousel slide w-50" data-ride="carousel">
        <div class="carousel-inner ">
          <div class="carousel-item active">
            <img class="d-block w-100" src="http://www.wallpaper-box.com/cat/images/cat14.jpg" alt="First slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="http://www.wallpaper-box.com/cat/images/cat11.jpg" alt="Second slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="http://www.wallpaper-box.com/cat/images/cat21.jpg" alt="Third slide">
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>

  </div>
</template>

<script>

  // $('.carousel').carousel({
  //   pause:true,
  // });
  export default {
    name: 'Panel',
    components: {v_tab},
    data() {
      return {
        lans: [
          {
            'lan': '',
            'isActive': true,
            'is_auto': false,
            'ip': '',
            'subnet_mask': '',
            'gateway': '',
            'DNS': ''
          },
        ],
        lan_data: ''
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
  /*.col {*/
  /*border-width: 1px !important;*/
  /*border: #26a69a solid !important;*/
  /*background-color: #e1e1e1;*/
  /*}*/

</style>
