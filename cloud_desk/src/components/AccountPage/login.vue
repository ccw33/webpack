<template>
  <div class="my-container w-100 h-100 animated bounceInDown">
    <div class="logo"></div>
    <header class="w-100  mt-5">
      <h1 class="text-center">云桌面用户登录</h1>
    </header>

    <form class="h-50 form ml-auto mr-auto">
      <div class="input w-100">
        <input type="text" class="form-control w-100" placeholder="输入用户名"
               :class="{'is-invalid':form.account.is_invalid}"
               v-model="form.account.val">
        <div class="account"></div>
        <div class="invalid-feedback">
          {{form.account.help_text}}
        </div>
      </div>
      <div class="input w-100">
        <input type="password" class="form-control w-100" placeholder="输入密码"
               :class="{'is-invalid':form.password.is_invalid}"
               v-model="form.password.val">
        <div class="password"></div>
        <div class="invalid-feedback">
          {{form.password.help_text}}
        </div>
      </div>
      <div class="input w-100" v-if="form.dynamicPass.is_use">
        <input type="text" class="form-control w-100" placeholder="输入动态密码"
               :class="{'is-invalid':form.dynamicPass.is_invalid}"
               v-model="form.dynamicPass.val">
        <div class="password"></div>
        <div class="invalid-feedback">
          {{form.dynamicPass.help_text}}
        </div>
      </div>
      <button type="button" class="btn btn-primary w-100" @click="submit">登录</button>
    </form>
    <footer class="w-100">
      <copy_right class="text-center"></copy_right>
    </footer>
  </div>
</template>

<script>

  import copy_right from '@/common/copy_right';

  export default {
    name: 'Login',
    components: {copy_right},
    data() {
      return {
        form: {
          account: {
            val: '',
            type: 'account',
            is_invalid: false,
            help_text: '账号不能为空',
          },
          password: {
            val: '',
            is_invalid: false,
            help_text: '密码不能为空',
          },
          dynamicPass: {
            is_use: false,
            val: '',
            is_invalid: false,
            help_text: '动态密码不能为空',
          },
        },

      }
    },
    computed: {},
    methods: {
      submit() {
        const vm = this;
        for (let key in vm.form) {
          vm.form[key].is_invalid = false;
        }
        if (!vm.form.account.val || !vm.form.password.val) {
          if (!vm.form.account.val) {
            vm.form.account.is_invalid = true;
          }
          if (!vm.form.password.val) {
            vm.form.password.is_invalid = true;
          }
          if (!vm.form.dynamicPass.val) {
            vm.form.dynamicPass.is_invalid = true;
          }
          return
        }
        vm.$ajax.get(`/api/account/login`, {
          params: {
            account: vm.form.account.val,
            password: vm.form.password.val,
            dynamicPass: vm.form.dynamicPass.val,
            systemType: vm.utils.get_system_typenum(),
          }
        })
          .then(resp => {
            vm.conf.account = vm.form.account.val;
            vm.$router.push('/');
          }).catch(error => {
          if (error.response)
            vm.$root.alert.fail.message = error.response.data.content;
          vm.$root.alert.fail.is_show = true;
        }).finally(() => {
        });

        // vm.$ajax.get(`/api/common_api/api.login`, {
        //   params: {
        //     account: vm.form.account.val,
        //     password: vm.form.password.val,
        //     systemType: system_type,
        //   }
        // })
        //   .then(resp => {
        //     if (resp.data.errorinfo == 'success') {
        //       debugger;
        //       vm.$router.push('/');
        //     } else {
        //       vm.$root.alert.fail.message = resp.data.errorinfo;
        //       vm.$root.alert.fail.is_show = true;
        //     }
        //
        //   }).catch(error => {
        //   vm.$root.alert.fail.is_show = true;
        // }).finally(() => {
        //   // vm.lan_data = vm.lans[0];
        // });
      }
    },
    beforeCreate() {
      let vm = this;
      //
      vm.$ajax.get('/api/account/is_dynamic', {})
        .then(resp => {
          if (resp.data.content == 'true') {
            vm.form.dynamicPass.is_use = true;
          }
          else {
            vm.form.dynamicPass.is_use = false;
          }
        }).catch(error => {
        vm.$root.alert.fail.message = error.response.data.content;
        vm.$root.alert.fail.is_show = true;
      })
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../../assets/sass/base";

  .my-container {
    font-size: 1rem;
    padding: 1em;
    background: {
      image: url("/static/img/HomePage/bg.jpg");
      position: center;
      size: cover;
    }
    .logo {
      width: 8em;
      height: 4em;
      padding-top: 1em;
      margin-left: 1em;
      background: {
        image: url("/static/img/logo/new_logo.png");
        position: center;
        repeat: no-repeat;
        size: contain;
      }
    }
    header {
      height: 15%;
      h1 {
        color: $color-withe-gray;
      }
    }
    form {
      width: 18em;
      .input {
        position: relative;
        margin-top: 1em;
        input {
          padding-left: 1.8em;
        }
        div.account, div.password {
          position: absolute;
          top: 0;
          left: 0;
          margin-left: 0.3em;
          width: 1.5em;
          height: 2.3em;
          background: {
            position: center;
            repeat: no-repeat;
            size: contain;
          }
        }
        div.account {
          background: {
            image: url("/static/img/icon/icon_username.png");
          }
        }
        div.password {
          background: {
            image: url("/static/img/icon/icon_password.png");
          }
        }
      }
      button {
        margin-top: 3em;
      }
    }
    footer {
      position: absolute;
      bottom: 2em;
    }
  }


</style>
