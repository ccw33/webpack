<template>
  <div class="container-fluid">
    <!--<div class="clearfix"></div>-->
    <section>
      <i class="fa fa-wifi fa-5x"></i>
      <div class="text">wifi网络 {{wifi.name}} 需要{{wifi.key_type}}密码</div>
    </section>

    <section>
      <label for="password">密码：</label>
      <input :type="password_type" class="form-control" id="password" placeholder="Password">
    </section>

    <section class="checkbox">
      <label>
        <input type="checkbox" v-model="pwd_is_show"> 显示密码
      </label>
      <label>
        <input type="checkbox"> 记住该网络
      </label>
    </section>
    <section>
      <button type="button" class="btn btn-default btn-xs"> 取消</button>
      <button type="button" class="btn btn-primary btn-xs"> 加入</button>
    </section>
  </div>
</template>

<script>
  import v_tab from '@/components/v_tab';

  export default {
    name: 'wifi_connect_win',
    components: {},
    prop: {
      wifi: {
        type: Object,
        required: true,
        validator: function (value) {
          return true;
        }
      },
    },
    data() {
      return {
        wifi: {
          name: '别连我dsfasefwagewt',
          is_lock: true,
          key_type: 'WPA2',
          strength: 1,
        },
        pwd_is_show:false
      }
    },
    computed: {
      password_type(){
        return this.pwd_is_show?'text':'password'
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
  @import "../../static/css/base";

  .container-fluid {
    margin-left: -10%;
    margin-top: 1rem;
    section {
      margin-top: 1rem;
    }
    section:nth-of-type(1) {
      .inline-flex();
      .fa-wifi {
        width: 30%;
        text-align: right;
      }
      .text {
        width: 70%;
        font-weight: bold;
      }
    }

    section:nth-of-type(2) {
      .inline-flex();
      margin-top: 2rem;
      width: 100%;
      label {
        font-weight: bold;
        text-align: right;
        margin-left: 10%;
        margin-right: 1rem;
        width: 20%;
      }
      input {
        width: 55%;
      }
    }
    section:nth-of-type(3) {
      .inline-flex(@flex-direction: column);
      margin-left: 1rem;
      label {
        margin-left: 30%;
        font-weight: bold;
      }
    }
    section:nth-of-type(4) {
      margin-left: 50%;
      button {
        width: 6rem;
        margin-right: 1rem;
      }
    }

  }

</style>
