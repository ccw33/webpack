<template>
  <div class="w-100 h-100 p-3 my-container animated bounceInDown">
    <loading :is_loading="linking_vm.is_loading">
      <h1>{{ linking_vm.status_zh }}</h1>
    </loading>
    <header class="w-100 position-relative">
      <div class="logo position-relative"></div>
      <div class="buttons ml-auto position-absolute">
        <div class="setting position-relative mr-2" @click="modalShow = !modalShow">
          <div class="icon"></div>
          <div class="text-primary w-100 text-center">设置</div>
        </div>
        <div class="exit position-absolute" @click="exit">
          <div class="icon"></div>
          <div class="text-primary w-100 text-center">退出</div>
        </div>
      </div>
    </header>
    <article class="w-100 text-center">
      <h1 class="w-100 text-center">蓝盾云桌面管理系统</h1>
      <div class="buttons">
        <div v-for="(vm,index) in vm_list" @click="vm_ready(vm.configId)" class="vm text-center d-inline-block">
          <div class="icon hvr-grow">
            <div :class="[vm.iconName]"></div>
          </div>
          <div class="name text-center text-white">{{vm.sConfigName}}</div>
        </div>
      </div>
    </article>
    <footer class="w-100">
      <copy_right class="text-center "></copy_right>
    </footer>

    <!-- Modal Component -->
    <b-modal ref="myModalRef" class="my-modal" :no-close-on-backdrop="true" v-model="modalShow">
      <div slot="modal-title" class="w-100">
        <h3>修改密码</h3>
      </div>
      <div slot="modal-header-close">
        <button type="button" aria-label="Close" class="close" style="position: absolute; top: 1em; right: 1em;">×
        </button>
      </div>
      <form class="w-100">
        <div class="input w-100 position-relative">
          <label class="w-25 position-relative">原始密码：</label>
          <div class="w-75 in_help position-absolute">
            <input type="password" class="form-control form-control-sm w-100" placeholder="输入密码"
                   :class="{'is-invalid':form.old_pass.is_invalid}"
                   v-model="form.old_pass.val">
            <div class="invalid-feedback w-100">
              {{form.old_pass.help_text}}
            </div>
          </div>
        </div>

        <div class="input w-100 position-relative">
          <label class="w-25 position-relative">新原密码：</label>
          <div class="w-75 in_help position-absolute">
            <input type="password" class="form-control form-control-sm w-100" placeholder="输入密码"
                   :class="{'is-invalid':form.new_pass.is_invalid}"
                   v-model="form.new_pass.val">
            <div class="invalid-feedback">
              {{form.new_pass.help_text}}
            </div>
          </div>
        </div>

        <div class="input w-100 position-relative">
          <label class="w-25 position-relative">确认新密码：</label>
          <div class="w-75 in_help position-absolute">
            <input type="password" class="form-control form-control-sm w-100" placeholder="输入密码"
                   :class="{'is-invalid':form.repeat_pass.is_invalid}"
                   v-model="form.repeat_pass.val">
            <div class="invalid-feedback">
              {{form.repeat_pass.help_text}}
            </div>
          </div>
        </div>
      </form>
      <div slot="modal-footer" class="w-100 footer text-right">
        <button class="btn btn-default " @click="modalShow = false">取消</button>
        <button class="btn btn-primary " @click="reset_password">提交</button>
      </div>
    </b-modal>

  </div>
</template>

<script>
  import copy_right from '@/common/copy_right';
  import loading from '@/common/loading';

  export default {
    name: 'HomePage',
    components: {copy_right,loading},
    data() {
      return {
        linking_vm: {
          is_loading: false,
          status_zh: ''
        },
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
          // {
          //   "configId": "160",
          //   "sConfigName": "fujian-win7",
          //   "type": 2,
          //   "iconName": "win7",
          //   "sServerId": "33d3ad33-201b-45bd-95f5-005016dc8182"
          // },
          // {
          //   "configId": "134",
          //   "sConfigName": "win7-5-18",
          //   "type": 2,
          //   "iconName": "win7",
          //   "sServerId": 0
          // }
        ],
        modalShow: false,
      }
    },
    computed: {
      systemType() {
        this.utils.get_system_typenum()
      }
    },
    methods: {
      vm_ready(configId) {
        const vm = this;
        debugger
        vm.$ajax.get('/api/common_api/api.ServerSPICEConsole', {
          params: {
            configId: configId,
            systemType: vm.utils.get_system_typenum(),
          }
        }).then(resp => {
          if (resp.data.errorInfo == 'success') {
            vm.link_to_vm(configId)
            vm.linking_vm.is_loading = true;
          }
          else {
            vm.$root.alert.fail.message = resp.data.status_zh;
            vm.$root.alert.fail.is_show = true;
          }
          vm.linking_vm = Object.assign(vm.linking_vm, resp.data)
        }).catch(error => {
          if (error.response.status == 401)
            return
          console.log(error.response.data)
          vm.$root.alert.fail.message = '服务器发生错误，请联系管理员';
          vm.$root.alert.fail.is_show = true;
        })
      },
      link_to_vm(configId) {
        const vm = this;
        vm.$ajax.get('/api/common_api/api.ServerSPICEConsole', {
          params: {
            configId: configId,
            systemType: vm.utils.get_system_typenum(),
          }
        }).then(resp => {
          if (resp.data.errorInfo == 'success') {
            // vm.linking_vm.status = resp.data.status;
          }
          else {
            vm.linking_vm.is_loading = false;
            vm.$root.alert.fail.message = resp.data.status_zh;
            vm.$root.alert.fail.is_show = true;
          }
          vm.linking_vm = Object.assign(vm.linking_vm, resp.data)
        }).catch(error => {
          debugger
          if (error.response.status == 401)
            return
          console.log(error.response.data)
          vm.$root.alert.fail.message = '服务器发生错误，请联系管理员';
          vm.$root.alert.fail.is_show = true;
        })
      },
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
            vm.$refs.myModalRef.hide()
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
      vm.$ajax.get('/api/common_api/api.list', {})
        .then(resp => {
          if (resp.data.errorinfo == 'success') {
            vm.vm_list = resp.data.list;
          }
          else {
            vm.$root.alert.fail.message = resp.data.errorinfo;
            vm.$root.alert.fail.is_show = true;
          }
        }).catch(error => {
        if (error.response.status == 401)
          return
        console.log(error.response.data)
        vm.$root.alert.fail.message = '获取虚机列表失败';
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
    background: {
      image: url("/static/img/HomePage/bg.jpg");
      position: center;
      size: cover;
    }
    header {
      $height: 4em;
      .logo {
        top: 0;
        left: 1em;
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
        top: 0;
        right: 1em;
        width: $height*0.8*2+3em;
        .setting {
          top: 0;
          left: 1em;
          width: $height*0.8;
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
          top: 0;
          right: 1em;
          width: $height*0.8;
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
        margin-top: 1em;
        color: $color-withe-gray;
      }
      .buttons {
        margin: 0 25%;
        $height: 6em;
        .icon {
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
          .win7, .linux, .ubuntu, .centos {
            width: 100%;
            height: 100%;
            background: {
              position: center;
              repeat: no-repeat;
              size: 50% 50%;
            }
          }
          .win7 {
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
      position: absolute;
      bottom: 2em;
    }

    .my-modal {
      button.close {
        position: relative;
        top: 1em;
        right: 1em;
      }
      form {
        padding: 1em;
        .input {
          margin: 0.5em 0;
          label {
            margin-top: 0.3em;
            top: 0em
          }
          .in_help {
            top: 0;
            right: 0;
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
