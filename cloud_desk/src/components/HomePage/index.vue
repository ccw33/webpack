<template>
  <div class="w-100 h-100 p-3 my-container animated bounceInDown">
    <header class="w-100 position-relative">
      <div class="logo position-relative"></div>
      <div class="buttons ml-auto position-absolute">
        <div class="reset_pass position-relative" @click="modalShow = !modalShow">
          <div class="icon"></div>
          <div class="text-primary w-100 text-center">修改密码</div>
        </div>
        <div class="exit position-absolute" @click="exit">
          <div class="icon"></div>
          <div class="text-primary w-100 text-center">退出</div>
        </div>
      </div>
    </header>
    <article class="w-100 text-center">
      <h1 class="w-100 text-center">蓝盾云桌面管理系统</h1>
      <div class="buttons-home" v-if="!vm_show">
        <div class="vms icon hvr-grow" @click="vm_show=true"></div>
        <div class="ip_set icon hvr-grow" @click="show_my_modal('ip_setting_show')"></div>
        <div class="resolution icon hvr-grow" @click="show_my_modal('resolution_setting_show')"></div>
      </div>

      <div class="buttons-vm" v-if="vm_show">
        <div v-for="(vm,index) in vm_list" @dblclick="vm_ready(virtual_machine)" class="vm text-center d-inline-block">
          <div class="icon hvr-grow">
            <div :class="[vm.iconName]"></div>
          </div>
          <div class="name text-center text-white">{{vm.sConfigName}}</div>
        </div>
      </div>
      <div class="modal_background" v-show="modal_background_show">
        <!--网络设置-->
        <transition enter-active-class="animated fadeInDown">
          <panel class="ip_setting" v-if="ip_setting_show"
                 @close_ip_setting="close_my_modal('ip_setting_show')"></panel>
        </transition>
        <!--分辨率设置-->
        <transition enter-active-class="animated fadeInDown">
          <screen_set class="resolution_setting" v-if="resolution_setting_show"
                      @close_resolution_setting="close_my_modal('resolution_setting_show')">
          </screen_set>
        </transition>
      </div>
      <!--wifi list-->
      <div class="wifi_list_container" v-if="wifi_list_show" @click.self="wifi_list_show=false">
        <wifi class="wifi_list"
              @close_wifi_list="wifi_list_show=false"
              @open_wifi_connect_win="open_wifi_connect_win"></wifi>
      </div>
      <!--wifi_connect_win-->
      <div class="wifi_connect_win_container" v-if="wifi_connection_show">
        <wifi_connect_win :prop_wifi="wifi" @cancel="wifi_connection_show=false"></wifi_connect_win>
      </div>


    </article>
    <footer class="w-100">
      <copy_right class="text-center "></copy_right>
      <div class="buttons">
        <button class="btn btn-primary" @click="wifi_list_show=true">wifi</button>
      </div>
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


    <!--虚机状态提示-->
    <b-modal ref="vm_status" size="sm"
             no-close-on-backdrop no-close-on-esc centered
             hide-footer hide-header-close
             title="状态提示">
      <div class="w-100 position-relative">
        <spinner class="mr-2 position-relative" style="left: 2px;"></spinner>
        <h6 class="m-0 position-absolute" style="top: 6px;left: 37px">{{ linking_vm.text }}</h6>
      </div>
      <b-btn class="mt-3" variant="outline-secondary" block @click="close_vm_status">取消</b-btn>
    </b-modal>

  </div>
</template>

<script>
  import copy_right from '@/common/copy_right';
  import loading from '@/common/loading';
  import spinner from '@/common/spinner';
  import Panel from '@/components/Panel';
  import screen_set from '@/components/screen_set';
  import Wifi from '@/components/Wifi';
  import wifi_connect_win from '@/components/wifi_connect_win';

  let it = '';

  function request(vm, virtual_machine) {
    console.log('request');
    vm.$ajax.get('/api/common_api/api.ServerSPICEConsole', {
      params: {
        configId: virtual_machine.configId,
        systemType: vm.utils.get_system_typenum(),
      }
    }).then(resp => {
      if (resp.data.errorInfo == 'success') {
        switch (resp.data.status) {
          case "ERROR":
            vm.linking_vm.text = '错误,虚机处于错误状态'
            break;
          case  "BUILD":
            vm.linking_vm.text = '创建中,请再次发请求到这个地址获取结果'
            break;
          case "PAUSE":
            vm.linking_vm.text = '虚机暂停,请再次发请求到这个地址获取结果'
            break;
          case "SHUTOFF":
            vm.linking_vm.text = '关闭虚机,请再次发送请求到这个这个地址获取结果'
            break;
          case "REBOOT":
            vm.linking_vm.text = '软重启中,请再次发请求到这个地址获取结果'
            break;
          case "HARD_REBOOT":
            vm.linking_vm.text = '硬重启中,请再次发请求到这个地址获取结果'
            break
          case "REBUILD":
            vm.linking_vm.text = '虚拟机重建中,请再次发请求到这个地址获取结果'
            break;
          case "BACKUP":
            vm.linking_vm.text = '虚拟机备份中,请关闭请求'
            break;
          case "ACTIVE":
            vm.linking_vm.text = '活动中,可以使用';
            window.clearInterval(it);
            // 打开虚机界面
            debugger;
            vm.$ajax.get('/api/operation_system/link_vm', {
              params: {
                'configId': virtual_machine.configId,
                // 'console': resp.data.console,
                'vm_name': virtual_machine.sConfigName
              }
            }).then(resp => {
              console.log('连接虚机成功')
              //nothing to do
            }).catch(error => {
              debugger
              if (error.response.status == 401)
                return
              vm.$root.alert.fail.message = '连接虚机失败';
              vm.$root.alert.fail.is_show = true;
            }).finally(()=>window.clearInterval(it));
            // 关闭modal
            break;
          default:
            vm.linking_vm.text = '没有此状态';
        }
      }
      else {
        vm.$refs.vm_status.hide();
        window.clearInterval(it);
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
  }

  export default {
    name: 'HomePage',
    components: {copy_right, loading, spinner, Panel, screen_set, Wifi, wifi_connect_win},
    data() {
      return {
        linking_vm: {
          is_loading: true,
          status_zh: "错误",
          status: "ERROR",
          errorInfo: "success",
          console: "",
          text: '',
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
        wifi: {
          name: '',
          is_lock: true,
          key_type: '',
          strength: 0,
          password: '',
          remember_pwd: false,
        },
        vm_show: false,
        ip_setting_show: false,
        wifi_list_show: false,
        wifi_connection_show: false,
        resolution_setting_show: false,
        modal_background_show: false,
        modalShow: false,
      }
    },
    computed: {
      systemType() {
        this.utils.get_system_typenum()
      }
    },
    methods: {
      open_wifi_connect_win(wifi) {
        const vm = this;
        vm.wifi = wifi;
        vm.wifi_connection_show = true
      },
      close_my_modal(need_to_close) {
        this[need_to_close] = false;
        this.modal_background_show = false;
      },
      show_my_modal(need_to_show) {
        this[need_to_show] = true;
        this.modal_background_show = true;
      },
      close_vm_status() {
        const vm = this;
        vm.$refs.vm_status.hide();
        window.clearInterval(it);
      },
      vm_ready(virtual_machine) {
        const vm = this;
        vm.$root.is_loading = true;
        vm.$ajax.get('/api/common_api/api.ServerSPICEConsole', {
          params: {
            configId: virtual_machine.configId,
            systemType: vm.utils.get_system_typenum(),
          }
        }).then(resp => {
          if (resp.data.errorInfo == 'success') {
            vm.$refs.vm_status.show();
            request(vm, virtual_machine.configId, resp.data.console);
            vm.link_to_vm(virtual_machine);
            // let it = window.setInterval(vm.link_to_vm(configId), 1000)
          }
          else {
            vm.$root.alert.fail.message = resp.data.status_zh;
            vm.$root.alert.fail.is_show = true;
            console.log('server error: ' + resp.data.errorInfo)
          }
          vm.linking_vm = Object.assign(vm.linking_vm, resp.data)
        }).catch(error => {
          if (error.response.status == 401)
            return
          vm.$root.alert.fail.message = '服务器发生错误，请联系管理员';
          vm.$root.alert.fail.is_show = true;
        }).finally(() => vm.$root.is_loading = false);
      },
      link_to_vm(virtual_machine) {
        const vm = this;
        it = window.setInterval(() => request(vm, virtual_machine), 2000);


        // while (true) {
        //   if (vm.linking_vm.status == 'ACTIVE') {
        //     vm.$refs.vm_status.hide();
        //     window.clearTimeout(it);
        //     // todo 调用钟伟的方法
        //     break;
        //   }
        // }


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
        text-align: right;
        .reset_pass, .exit {
          width: $height;
          text-align: center;
          .icon {
            width: $height;
            height: $height*0.8;
            margin: 0;
            background: {
              position: center;
              repeat: no-repeat;
              size: contain;
            }
          }
          .text-primary {
            width: 100%;
          }
          &:hover {
            .text-primary {
              color: $color-withe !important;
            }
          }
        }
        .reset_pass {
          .icon {
            background: {
              image: url("/static/img/icon/icon_setting.png");
            }
          }
          &:hover {
            .icon {
              background-image: url("/static/img/icon/icon_setting_hover.png");
            }
          }
        }
        .exit {
          top: 0;
          right: 1em;
          .icon {
            background: {
              image: url("/static/img/icon/icon_exit.png");
            }
          }
          &:hover {
            .icon {
              background-image: url("/static/img/icon/icon_exit_hover.png");
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
      .buttons-home {
        margin: 0 10%;
        margin-top: 3em;
        $height: 15em;
        .icon {
          width: $height;
          height: $height;
          margin: 1em;
          display: inline-block;
          background: {
            position: center;
            repeat: no-repeat;
            size: contain;
          }
        }
        .vms {
          background: {
            image: url("/static/img/later-images-01/yzm_14_01.png");
          }
          &:hover {
            background: {
              image: url("/static/img/later-images-01/yzm_14_02.png");
            }
            cursor: pointer;
          }
        }
        .ip_set {
          background: {
            image: url("/static/img/later-images-01/yzm_15_01.png");
          }
          &:hover {
            background: {
              image: url("/static/img/later-images-01/yzm_15_02.png");
            }
            cursor: pointer;
          }
        }
        .resolution {
          background: {
            image: url("/static/img/later-images-01/yzm_16_01.png");
          }
          &:hover {
            background: {
              image: url("/static/img/later-images-01/yzm_16_02.png");
            }
            cursor: pointer;
          }
        }
      }
      .wifi_list_container, .wifi_connect_win_container {
        padding: 0;
        position: fixed;
        z-index: 999;
        width: 100%;
        height: 100%;
        background-color: transparent;
        left: 0;
        top: 0;
      }

      .wifi_connect_win_container {
        text-align: center;
      }

      .buttons-vm {
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
      .modal_background {
        width: 100%;
        height: 100%;
        background-color: rgba(0.3, 0.3, 0.3, 0.3);
        position: fixed;
        z-index: 999;
        left: 0;
        top: 0;
        .ip_setting {
          width: 520px;
          /*height: 450px;*/
          margin: auto;
          margin-top: 15%;
        }
        .resolution_setting {
          width: 460px;
          margin-top: 15%;
          border-radius: 0.5em;
          background-color: $color-withe;
        }
      }

    }
    footer {
      position: absolute;
      bottom: 2em;
      .buttons {
        position: absolute;
        right: 2em;
        top: 0;
      }
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
