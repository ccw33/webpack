<template>
  <div class="my-container w-100 d-inline-flex flex-column justify-content-center align-items-center">
    <h2 class="title">登录{{ conf.logo_name }}</h2>
    <div id="selete_login_type" class="btn-group btn-group-toggle" data-toggle="buttons">
      <label class="btn btn-primary active" @click="form.account.type='account'">
        <input type="radio"> 账号
      </label>
      <label class="btn btn-primary" @click="form.account.type='email'">
        <input type="radio"> 邮箱
      </label>
      <label class="btn btn-primary" @click="form.account.type='wechat'">
        <input type="radio"> 微信
      </label>
    </div>
    <form class="d-inline-flex flex-column justify-content-center align-items-center">
      <div id="account" class="form-group">
        <label>{{ account_type }}：</label>
        <input type="text" class="form-control"
               :class="{'is-invalid':form.account.is_invalid}"
               :placeholder="'请输入'+account_type" v-model="form.account.val"
               required>
        <div class="invalid-feedback">
          {{ form.account.help_text }}
        </div>
      </div>
      <div id="password" class="form-group">
        <label>密码：</label>
        <input type="password" class="form-control"
               :class="{'is-invalid':form.password.is_invalid}"
               placeholder="请输入密码" v-model="form.password.val"
               required>
        <div class="invalid-feedback">
          {{ form.password.help_text }}
        </div>
      </div>
    </form>
    <button id="submit" type="button" class="btn-info">登录</button>
    <div id="other_option" class="d-inline-flex flex-row justify-content-between align-items-baseline">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="is_remember_me">
        <label class="form-check-label" for="is_remember_me">
          记住我
        </label>
      </div>
      <a href="#" class="badge badge-warning">忘记密码</a>
    </div>
  </div>
</template>

<script>

  // $('.carousel').carousel({
  //   pause:true,
  // });
  export default {
    name: 'Login',
    components: {},
    data() {
      return {
        form: {
          account: {
            val: '',
            type: 'account',
            is_invalid: false,
            help_text: '不存在此账号',
          },
          password: {
            val: '',
            is_invalid: false,
            help_text: '密码错误',
          }
        }
      }
    },
    computed: {
      account_type() {
        const vm = this;
        if (vm.form.account.type == 'account')
          return '账号'
        if (vm.form.account.type == 'email')
          return '邮箱'
        if (vm.form.account.type == 'wechat')
          return '微信'
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
<style scoped lang="scss">
  @import "../../assets/sass/base";

  .my-container {
    font-family: 'HanyiSentyChalk';
    font-size: 1.3rem;
    @media all and (max-width: $phone-max-portrait-width) {
      font-size: 1rem;
    }
    .title {
      margin: 1.5em 0;
    }
    #selete_login_type {
      margin-bottom: 1em;
      padding-left: 2em;
      label {
        width: 11em;
      }
      @media all and (max-width: $phone-max-portrait-width) {
        padding-left: 1em;
        label {
          width: 6em;
        }
      }
    }
    form {
      label, input {
        margin-right: 0.5em;
      }
      label {
        width: 5em;
        text-align: right;
      }
      input {
        width: 25em;
        @media all and (max-width: $phone-max-portrait-width) {
          width: 15em;
        }
      }
      .invalid-feedback {
        width: 10em;
      }
      .form-group{
        @extend .d-inline-flex;
        @extend .flex-row;
        @extend .justify-content-center;
        @extend .align-items-baseline;
        @extend .flex-wrap;
        margin: 0.3em 0;
        .invalid-feedback{
          font-size: 0.6em;
        }
      }
    }

    #submit {
      width: 25em;
      margin-left: 2em;
      @media all and (max-width: $phone-max-portrait-width) {
        margin-left: 1em;
        width: 19em;
      }
      margin-top: 1em;
      -webkit-border-radius: 0.2em;
      -moz-border-radius: 0.2em;
      border-radius: 0.2em;
    }

    #other_option {
      margin: 0.5em;
      width: 24em;
      margin-left: 2em;
      @media all and (max-width: $phone-max-portrait-width) {
        margin-left: 1em;
        width: 19em;
      }
      .form-check {
        font-size: 0.8em;
      }
    }

  }


</style>
