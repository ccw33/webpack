<template>
  <div class="w-100 h-100 inline-column-start-center p-3 my-container animated bounceInDown">


    <header class="w-100 inline-row-center-center justify-content-between">
      <div class="logo"></div>
      <div class="buttons inline-row-center-center">
        <div class="setting inline-column-center-center mr-2" @click="modalShow = !modalShow">
          <div class="icon"></div>
          <div class="text-primary">设置</div>
        </div>
        <div class="exit inline-column-center-center" @click="exit">
          <div class="icon"></div>
          <div class="text-primary">退出</div>
        </div>
      </div>
    </header>
    <article class="w-100 inline-column-center-center">
      <h1 class="">蓝盾云桌面管理系统</h1>
      <div class="buttons w-50 inline-row-center-center justify-content-around">
        <div v-for="(vm,index) in vm_list" class="vm inline-column-center-center">
          <div class="icon hvr-grow inline-row-center-center">
            <div :class="[vm.vm_type]"></div>
          </div>
          <div class="name text-white">{{vm.name}}</div>
        </div>
      </div>
    </article>
    <footer class="mt-auto">
      <copy_right></copy_right>
    </footer>

    <!-- Modal Component -->
    <b-modal class="my-modal" :no-close-on-backdrop="true" v-model="modalShow">
      <div slot="modal-title" class="w-100">
        <h3>修改密码</h3>
      </div>
      <form class="w-100">
        <div class="input w-100 inline-row-start-start">
          <label class="w-25">原始密码：</label>
          <div class="w-75 inline-column-start-start">
            <input type="password" class="form-control form-control-sm w-100" placeholder="输入密码"
                   :class="{'is-invalid':form.old_pass.is_invalid}"
                   v-model="form.old_pass.val">
            <div class="invalid-feedback">
              {{form.old_pass.help_text}}
            </div>
          </div>
        </div>

        <div class="input w-100 inline-row-start-start">
          <label class="w-25">新原密码：</label>
          <div class="w-75 inline-column-start-start">
            <input type="password" class="form-control form-control-sm w-100" placeholder="输入密码"
                   :class="{'is-invalid':form.new_pass.is_invalid}"
                   v-model="form.new_pass.val">
            <div class="invalid-feedback">
              {{form.new_pass.help_text}}
            </div>
          </div>
        </div>

        <div class="input w-100 inline-row-start-start">
          <label class="w-25">确认新密码：</label>
          <div class="w-75 inline-column-start-start">
            <input type="password" class="form-control form-control-sm w-100" placeholder="输入密码"
                   :class="{'is-invalid':form.repeat_pass.is_invalid}"
                   v-model="form.repeat_pass.val">
            <div class="invalid-feedback">
              {{form.repeat_pass.help_text}}
            </div>
          </div>
        </div>
      </form>
      <div slot="modal-footer" class="w-100 footer inline-row-end-baseline">
        <button class="btn btn-default" @click="modalShow = false">取消</button>
        <button class="btn btn-primary" @click="reset_password">提交</button>
      </div>
    </b-modal>

  </div>
</template>

<script>
  import copy_right from '@/common/copy_right';

  export default {
    name: 'HomePage',
    components: {copy_right},
    data() {
      return {
        form: {
          old_pass: {
            val: '',
            is_invalid: false,
            help_text: '密码不能为空',
          },
          new_pass: {
            val: '',
            is_invalid: false,
            help_text: '密码不能为空',
          },
          repeat_pass: {
            val: '',
            is_invalid: false,
            help_text: '输入的新密码不一致',
          },
        },
        vm_list: [
          {
            name: 'fujian-win7',
            vm_type: 'windows',
          },
          {
            name: 'win7-5-18',
            vm_type: 'ubuntu',
          },
          {
            name: 'win7-5-18',
            vm_type: 'linux',
          },
          {
            name: 'win7-5-18',
            vm_type: 'centos',
          },
        ],
        modalShow: false,
      }
    },
    methods: {
      reset_password() {
        const vm = this;
        vm.$ajax.get('/api/common_api/api.EditPassword', {
          params: {
            password: vm.form.old_pass.val,
            newPassword: vm.form.new_pass.val,
            rePassword: vm.form.repeat_pass.val,
            systemType: vm.utils.get_system_typenum(),
          }
        }).then(resp => {
          debugger
          if (resp.data.errorinfo == 'success') {
            vm.$root.alert.success.message = '修改密码成功';
            vm.$root.alert.success.is_show = true;
          }
          else {
            vm.$root.alert.fail.message = resp.data.errorinfo;
            vm.$root.alert.fail.is_show = true;
          }
        }).catch(error => {
          debugger
          if (error.response.status == 401)
            return
          console.log(error.response.data)
          vm.$root.alert.fail.message = '修改密码失败';
          vm.$root.alert.fail.is_show = true;
        })
      },
      exit() {
        const vm = this;
        vm.$ajax.get(`/api/account/logout`)
          .then(resp => {
            vm.$router.push('/login');
          }).catch(error => {
          if (error.response.status == 401)
            return
          if (error.response)
            console.error(error.response.data.content);
          vm.$root.alert.fail.is_show = true;
          vm.$root.alert.fail.message = '登出失败';
        }).finally(() => {
          // vm.lan_data = vm.lans[0];
        });
      }
    },
    beforeCreate() {
      let vm = this;
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
    font-size: 1rem;
    background: {
      image: url("/static/img/HomePage/bg.jpg");
      position: center;
      size: cover;
    }
    header {
      $height: 4em;
      .logo {
        width: $height*2;
        height: $height;
        background: {
          image: url("/static/img/logo/new_logo.png");
          position: center;
          repeat: no-repeat;
          size: contain;
        }
      }
      .buttons {
        .setting {
          .icon {
            width: $height*0.8;
            height: $height*0.8;
            background: {
              image: url("/static/img/icon/icon_setting.png");
              position: center;
              repeat: no-repeat;
              size: contain;
            }
          }
          &:hover {
            .icon {
              background-image: url("/static/img/icon/icon_setting_hover.png");
            }
            .text-primary {
              color: $color-withe !important;
            }
          }
        }
        .exit {
          .icon {
            width: $height*0.8;
            height: $height*0.8;
            background: {
              image: url("/static/img/icon/icon_exit.png");
              position: center;
              repeat: no-repeat;
              size: contain;
            }
          }
          &:hover {
            .icon {
              background-image: url("/static/img/icon/icon_exit_hover.png");
            }
            .text-primary {
              color: $color-withe !important;
            }
          }
        }
      }
    }

    article {
      height: 60%;
      h1 {
        color: $color-withe-gray;
      }
      .buttons {
        .icon {
          $height: 6em;
          width: $height;
          height: $height;
          margin: 2em 2em 0 2em;
          background: {
            image: url("/static/img/HomePage/vmbg01.png");
            position: center;
            repeat: no-repeat;
            size: contain;
          }
          &:hover {
            background-image: url("/static/img/HomePage/vmbg_hover01.png");
          }
          .windows, .linux, .ubuntu, .centos {
            width: 50%;
            height: 50%;
            background: {
              position: center;
              repeat: no-repeat;
              size: contain;
            }
          }
          .windows {
            width: 50%;
            height: 50%;
            background-image: url("/static/img/HomePage/windows.png");
          }
          .linux {
            background-image: url("/static/img/HomePage/linux.png");
          }
          .ubuntu {
            background-image: url("/static/img/HomePage/ubuntu.png");
          }
          .centos {
            background-image: url("/static/img/HomePage/centos.png");
          }

        }
      }
    }
    footer {

    }

    .my-modal {
      form {
        padding: 1em;
        .input {
          margin: 0.5em 0;
          label {
            margin-top: 0.3em;
          }
        }
      }

      .footer {
        button {
          margin-right: 1em;
        }
      }

    }

  }

</style>
