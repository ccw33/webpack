<template>
  <form class="form-horizontal">
    <v_alert :alert="alert" @hide_success="alert.success.is_show=false" @hide_fail="alert.fail.is_show=false"></v_alert>

    <!--是否自动获得ip-->
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <div class="radio">
          <label>
            <input type="radio" name="optionsRadios" id="ip_auto" v-model="lan.is_auto" value="true"
                   @click="auto">
            自动获取IP地址
          </label>
        </div>
        <div class="radio">
          <label>
            <input type="radio" name="optionsRadios" id="ip_manual" v-model="lan.is_auto" value="false" checked
                   @click="not_auto">
            使用下面的IP地址
          </label>
        </div>
      </div>
    </div>
    <fieldset :id="fieldset_id">
      <!--ip-->
      <div class="form-group">
        <label for="ip" class="col-xs-2 control-label">IP地址</label>
        <div class="col-xs-10">
          <input type="text" class="form-control" id="ip" name="ip" :placeholder="lan.ip" v-model="lan.ip">
          <span class="help-block">IP样式必须为“xxx.xxx.xxx.xxx”,且xxx在0-255之间</span>
        </div>
      </div>
      <!--subnet_mask-->
      <div class="form-group">
        <label for="subnet_mask" class="col-xs-2 control-label">子网掩码</label>
        <div class="col-xs-10">
          <input type="text" class="form-control" id="subnet_mask" name="subnet_mask"
                 :placeholder="lan.subnet_mask"
                 v-model="lan.subnet_mask">
          <span class="help-block">子网掩码样式必须为“xxx.xxx.xxx.xxx”,且xxx在0-255之间</span>

        </div>
      </div>

      <!--gateway-->
      <div class="form-group">
        <label for="gateway" class="col-xs-2 control-label">网关</label>
        <div class="col-xs-10">
          <input type="text" class="form-control" id="gateway" name="gateway" :placeholder="lan.gateway"
                 v-model="lan.gateway">
          <span class="help-block">网关样式必须为“xxx.xxx.xxx.xxx”,且xxx在0-255之间</span>
        </div>
      </div>

      <!--dns-->
      <div class="form-group">
        <label for="dns" class="col-xs-2 control-label">DNS</label>
        <div class="col-xs-10">
          <input type="text" class="form-control" id="dns" name="dns" :placeholder="lan.dns"
                 v-model="lan.dns">
          <span class="help-block">dns样式必须为“xxx.xxx.xxx.xxx”,且xxx在0-255之间</span>
        </div>
      </div>
    </fieldset>


    <div class="form-group">
      <div class="col-xs-offset-2 col-xs-1">
        <input type="button" class="btn btn-default" value="保存" @click="submit()"/>
      </div>
      <div class="col-xs-1" style="margin-left: 2rem;">
        <input type="button" class="btn btn-default" value="重置" @click="reset()"/>
      </div>
    </div>
  </form>

</template>

<script>

  function normal_validate(vm, key, times, is_ok) {
    vm.lan[key].split('.').forEach((val, index, arr) => {
      // if (key == 'dns') {
      //   if (val == '' || !(0 <= Number(val) && Number(val) <= 255)) {
      //     debugger
      //     $(`#${key}`).parents('.form-group').addClass('has-error');
      //     $(`#${key}`).parents('.form-group').find('.help-block').show();
      //     is_ok = false;
      //   } else {
      //     $(`#${key}`).parents('.form-group').removeClass('has-error');
      //     $(`#${key}`).parents('.form-group').find('.help-block').hide();
      //     times++;
      //   }
      // } else {
      if (val == '' || !(0 <= Number(val) && Number(val) <= 255)) {
        $(`#${key}`).parents('.form-group').addClass('has-error');
        $(`#${key}`).parents('.form-group').find('.help-block').show();
        is_ok = false;
      } else {
        $(`#${key}`).parents('.form-group').removeClass('has-error');
        $(`#${key}`).parents('.form-group').find('.help-block').hide();
        times++;
      }
      // }
    });
    if (times < 4) {
      $(`#${key}`).parents('.form-group').addClass('has-error');
      $(`#${key}`).parents('.form-group').find('.help-block').show();
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
          return true;
        }
      },
      index:{
        type:Number,
        required:true,
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
        lan:this.lan_data,
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
      fieldset_id(){
        return `${this.lan.lan}_ip_fieldset`
      }
    },
    methods: {
      auto() {
        $(`#${this.lan.lan}_ip_fieldset`).attr({'disabled': 'true'});
        this.lan.is_auto = true;
      },
      not_auto() {
        $(`#${this.lan.lan}_ip_fieldset`).removeAttr('disabled');
        this.lan.is_auto = false;
      },
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
                  $(`#${key}`).parents('.form-group').removeClass('has-error');
                  $(`#${key}`).parents('.form-group').find('.help-block').hide();
                }
                else {
                  $(`#${key}`).parents('.form-group').addClass('has-error');
                  $(`#${key}`).parents('.form-group').find('.help-block').show();
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
          `${vm.host}/save_lan`,
          vm.$qs.stringify(vm.lan),
        ).then(function (response) {
          vm.alert.success.is_show = true;
        }).catch(function (error) {
          console.error(`SERVER----------:${error.response.data.content}`);
          vm.alert.fail.is_show = true;
        });
      },
      reset() {
        debugger
        this.lan = {...this.old_data};
        if (JSON.parse(this.lan.is_auto)) {
          $(`#${this.lan.lan}_ip_fieldset`).attr({'disabled': 'disabled'});
        } else {
          $(`#${this.lan.lan}_ip_fieldset`).removeAttr('disabled');
        }
      },
      clear() {
        this.lan = {};
      }
    },
    created() {
      debugger;
      this.old_data = {...this.$store.state.old_data_list[this.index]};
    },
    mounted() {
      $('.help-block').hide();
      debugger;
      if (JSON.parse(this.lan.is_auto)) {
        $(`#${this.lan.lan}_ip_fieldset`).attr({'disabled': 'disabled'});
      } else {
        $(`#${this.lan.lan}_ip_fieldset`).removeAttr('disabled');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .form-horizontal {
    margin: 5rem;
  }

  fieldset {
    border-radius: 1rem;
    padding: 2rem !important;
    margin: 2rem !important;
    border: 1px dashed #bce8f1 !important;
  }
</style>
