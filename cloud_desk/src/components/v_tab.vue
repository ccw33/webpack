<template>
  <div class="w-100 inline-column-center-center flex-nowrap">
    <form class="w-100">
      <header>
        <div class="img_text">
          <img src="../assets/2173-128.png" alt="" style="width: 1em; height:1em;">
          <span>{{lan.id}}</span>
        </div>
        <div class="text text-left">
          MAC：{{lan.mac}}
        </div>
      </header>
      <!--是否自动获得ip-->
      <div class="form-group is_auto">
        <div class="w-100 text-left">
          <div class="radio">
            <label>
              <input type="radio" name="optionsRadios" :id="this.lan.lan+'_ip_auto'" v-model="lan.is_auto"
                     :value="true">
              自动获取IP地址
            </label>
          </div>
          <div class="radio">
            <label>
              <input type="radio" name="optionsRadios" :id="this.lan.lan+'_ip_manual'" v-model="lan.is_auto"
                     :value="false" checked>
              使用下面的IP地址
            </label>
          </div>
        </div>
      </div>
      <!--ip-->
      <div class="form-group input-form-group">
        <label :for="this.lan.lan+'_ip'" class=" control-label">IP地址：</label>
        <div class="input">
          <input type="text" class="form-control" :id="this.lan.lan+'_ip'"
                 name="ip" :placeholder="lan.ip" v-model="lan.ip" :disabled="this.lan.is_auto">
        </div>
        <div class="help-block">IP样式必须为“xxx.xxx.xxx.xxx”,且xxx在0-255之间</div>
      </div>
      <!--subnet_mask-->
      <div class="form-group input-form-group">
        <label :for="this.lan.lan+'_subnet_mask'" class=" control-label">子网掩码：</label>
        <div class="input">
          <input type="text" class="form-control" :id="this.lan.lan+'_subnet_mask'" name="subnet_mask"
                 :placeholder="lan.subnet_mask"
                 v-model="lan.subnet_mask"
                 :disabled="this.lan.is_auto">
        </div>
        <div class="help-block">子网掩码样式必须为“xxx.xxx.xxx.xxx”,且xxx在0-255之间</div>
      </div>

      <!--gateway-->
      <div class="form-group input-form-group">
        <label :for="this.lan.lan+'_gateway'" class=" control-label">网关：</label>
        <div class="input">
          <input type="text" class="form-control" :id="this.lan.lan+'_gateway'" name="gateway"
                 :placeholder="lan.gateway"
                 v-model="lan.gateway"
                 :disabled="this.lan.is_auto">
        </div>
        <div class="help-block">网关样式必须为“xxx.xxx.xxx.xxx”,且xxx在0-255之间</div>
      </div>

      <!--dns-->
      <div class="form-group input-form-group">
        <label :for="this.lan.lan+'_dns'" class=" control-label">DNS：</label>
        <div class="input">
          <input type="text" class="form-control" :id="this.lan.lan+'_dns'" name="dns" :placeholder="lan.dns"
                 v-model="lan.dns"
                 :disabled="this.lan.is_auto">
        </div>
        <div class="help-block ">dns样式必须为“xxx.xxx.xxx.xxx”,且xxx在0-255之间</div>
      </div>


      <div class="form-group btn-form-group">
        <input type="button" class="btn btn-primary btn-sm" value="保存" @click="submit()"/>
        <input type="button" class="btn btn-default btn-sm" value="重置" @click="reset()"/>
      </div>
    </form>
  </div>

</template>

<script>

  import utils from '../utils';

  function normal_validate(vm, key, times, is_ok) {
    vm.lan[key].split('.').forEach((val, index, arr) => {
      // if (key == 'dns') {
      //   if (val == '' || !(0 <= Number(val) && Number(val) <= 255)) {
      //     debugger
      //     $(`#${vm.lan.lan+'_'+key}`).parents('.form-group').addClass('has-error');
      //     $(`#${vm.lan.lan+'_'+key}`).parents('.form-group').find('.help-block').show();
      //     is_ok = false;
      //   } else {
      //     $(`#${vm.lan.lan+'_'+key}`).parents('.form-group').removeClass('has-error');
      //     $(`#${vm.lan.lan+'_'+key}`).parents('.form-group').find('.help-block').hide();
      //     times++;
      //   }
      // } else {
      if (val == '' || !(0 <= Number(val) && Number(val) <= 255)) {
        $(`#${vm.lan.lan + '_' + key}`).parents('.form-group').addClass('has-error');
        $(`#${vm.lan.lan + '_' + key}`).parents('.form-group').find('.help-block').show();
        is_ok = false;
      } else {
        $(`#${vm.lan.lan + '_' + key}`).parents('.form-group').removeClass('has-error');
        $(`#${vm.lan.lan + '_' + key}`).parents('.form-group').find('.help-block').hide();
        times++;
      }
      // }
    });
    if (times < 4) {
      $(`#${vm.lan.lan + '_' + key}`).parents('.form-group').addClass('has-error');
      $(`#${vm.lan.lan + '_' + key}`).parents('.form-group').find('.help-block').show();
      is_ok = false
    }

    return is_ok
  }

  let old_data = {};
  export default {
    name: 'v_tab',

    props: {
      lan_data: {
        type: Object,
        required: true,
        validator: function (value) {
          let template = {
            lan: '',
            isActive: true,
            is_auto: false,
            ip: '',
            subnet_mask: '',
            gateway: '',
            dns: '',
            mac: ''
          };
          return utils.validate_template(value, template, 'lan_data');
        }
      },
      index: {
        type: Number,
        required: true,
      }
    },
    data() {
      return {
        // lan: {
        //   'lan': this.lan_data.lan,
        //   'isActive': this.lan_data.isActive,
        //   'is_auto': this.lan_data.is_auto,
        //   'ip': this.lan_data.ip,
        //   'subnet_mask': this.lan_data.subnet_mask,
        //   'gateway': this.lan_data.gateway,
        //   'dns': this.lan_data.dns,
        //   'mac': this.lan_data.mac
        // },
        lan: this.lan_data,
        alert: {
          success: {
            message: '修改配置成功',
            is_show: false,
          },
          fail: {
            message: '修改配置失败',
            is_show: false,
          }
        }
      }
    },
    computed: {
      // lan() {
      //   return this.lan_data
      // }
    },
    methods: {
      submit() {
        const vm = this;
        // 验证
        let is_ok = true;
        if (!vm.lan.is_auto) {
          for (let key in vm.lan) {
            let times = 0;
            if (key == 'lan' || key == 'is_auto' || key == 'isActive' || key == 'mac' || key == 'id') {
              continue;
            }
            if (key == 'subnet_mask') {
              if (Number(vm.lan[key])) {
                if (Number(vm.lan[key]) >= 0 && Number(vm.lan[key]) <= 32) {
                  $(`#${vm.lan.lan + '_' + key}`).parents('.form-group').removeClass('has-error');
                  $(`#${vm.lan.lan + '_' + key}`).parents('.form-group').find('.help-block').hide();
                }
                else {
                  $(`#${vm.lan.lan + '_' + key}`).parents('.form-group').addClass('has-error');
                  $(`#${vm.lan.lan + '_' + key}`).parents('.form-group').find('.help-block').show();
                }
              } else {
                is_ok = normal_validate(vm, key, times, is_ok)
              }
            } else {
              is_ok = normal_validate(vm, key, times, is_ok)
            }
          }
        }
        else {
          vm.lan.ip = '';
          vm.lan.subnet_mask = '';
          vm.lan.gateway = '';
          vm.lan.dns = '';
        }

        // 提交
        if (!is_ok) {
          return
        }
        vm.$ajax.post(
          `${vm.host}/api/operation_system/save_lan`,
          vm.$qs.stringify(vm.lan),
        ).then(function (response) {
          vm.$root.alert.success.is_show = true;
        }).catch(function (error) {
          vm.$root.alert.fail.is_show = true;
        });
      },
      reset() {
        this.lan = {...this.old_data};
      },
      clear() {
        this.lan = {};
      }
    },
    created() {
      this.old_data = {...this.$store.state.old_data_list[this.index]};
    },
    mounted() {
      $('.help-block').hide();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/sass/base";

  form {
    font-size: 0.8rem;
    padding: 10px;
    header {
      height: 50px;
      width: 100%;
      background-color: #f9f9f9;
      .img_text {
        text-align: left;
        img {
          display: inline-block;
        }
      }
      .text {
        font-family: '雅黑';
        font-size: 12px;
        line-height: 16px;
      }
    }
  }

  .is_auto {
    margin: 15px 70px;
  }

  .input-form-group {
    margin: 0;
    margin-bottom: 12px;
    /*height: 28px;*/
    position: relative;
    label {
      /*position: absolute;*/
      /*top: 3px;*/
      /*right: 330px;*/
      width: 100px;
      display: inline-block;
      font-size: 1em;
      text-align: right;
    }
    .input {
      /*position: absolute;*/
      /*top: 0;*/
      /*right: 72px;*/
      width: 250px;
      display: inline-block;
      input {
        height: 28px;
      }
    }
  }

  .btn-form-group {
    text-align: right;
    .btn {
      height: 28px;
      margin: 0 0.5em;
    }
  }

  .help-block {
    @extend .text-danger;
    font-size: 0.8em;
  }
</style>
