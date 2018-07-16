<template>
  <form class="form-horizontal">
    <!--是否自动获得ip-->
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <div class="radio">
          <label>
            <input type="radio" name="optionsRadios" id="ip_auto" v-model="lan_data.is_auto" value="true"
                   onclick="$('#ip_fieldset').attr({'disabled':'disabled'})">
            自动获取IP地址
          </label>
        </div>
        <div class="radio">
          <label>
            <input type="radio" name="optionsRadios" id="ip_manual" v-model="lan_data.is_auto" value="false" checked
                   onclick="$('#ip_fieldset').removeAttr('disabled')">
            使用下面的IP地址
          </label>
        </div>
      </div>
    </div>
    <fieldset id="ip_fieldset">
      <!--ip-->
      <div class="form-group">
        <label for="ip" class="col-xs-2 control-label">IP地址</label>
        <div class="col-xs-10">
          <input type="text" class="form-control" id="ip" name="ip" :placeholder="lan_data.ip" v-model="lan_data.ip">
          <span class="help-block">IP样式必须为“xxx.xxx.xxx.xxx”,且xxx在0-255之间</span>
        </div>
      </div>
      <!--subnet_mask-->
      <div class="form-group">
        <label for="subnet_mask" class="col-xs-2 control-label">子网掩码</label>
        <div class="col-xs-10">
          <input type="text" class="form-control" id="subnet_mask" name="subnet_mask"
                 :placeholder="lan_data.subnet_mask"
                 v-model="lan_data.subnet_mask">
          <span class="help-block">子网掩码样式必须为“xxx.xxx.xxx.xxx”,且xxx在0-255之间</span>

        </div>
      </div>

      <!--gateway-->
      <div class="form-group">
        <label for="gateway" class="col-xs-2 control-label">网关</label>
        <div class="col-xs-10">
          <input type="text" class="form-control" id="gateway" name="gateway" :placeholder="lan_data.gateway"
                 v-model="lan_data.gateway">
          <span class="help-block">网关样式必须为“xxx.xxx.xxx.xxx”,且xxx在0-255之间</span>
        </div>
      </div>
    </fieldset>


    <fieldset>
      <!--DNS-->
      <div class="form-group">
        <label for="DNS" class="col-xs-2 control-label">DNS</label>
        <div class="col-xs-10">
          <input type="text" class="form-control" id="DNS" name="DNS" :placeholder="lan_data.dns"
                 v-model="lan_data.dns">
          <span class="help-block">DNS样式必须为“xxx.xxx.xxx.xxx”,且xxx在0-255之间</span>
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
  function copy(obj) {
    var newobj = {};
    for (var attr in obj) {
      newobj[attr] = obj[attr];
    }
    return newobj;
  }

  export default {
    name: 'v_tab',
    props: {
      lan_data: {
        type: Object,
        required: true,
        validator: function (value) {
          // 这个值必须匹配下列字符串中的一个
          return true;
        }
      },
    },
    data() {
      return {}
    },
    methods: {
      submit() {

        const vm = this;
        // 验证
        let is_ok = true;
        for (let key in vm.lan_data) {
          let times = 0;
          if(key=='lan' || key=='is_auto' || key=='isActive'){
            continue;
          }
          vm.lan_data[key].split('.').forEach((val, index, arr) => {
            // debugger;
            if ( val && !(0 <= Number(val) && Number(val) <= 255)) {
              $(`#${key}`).parents('.form-group').addClass('has-error');
              $(`#${key}`).parents('.form-group').find('.help-block').show();
              is_ok=false;
            } else {
              $(`#${key}`).parents('.form-group').removeClass('has-error');
              $(`#${key}`).parents('.form-group').find('.help-block').hide();
              times++;
            }
          });
          if (times < 4) {

            $(`#${key}`).parents('.form-group').addClass('has-error');
            $(`#${key}`).parents('.form-group').find('.help-block').show();
            is_ok=false
          }
        }

        // 提交
        if(!is_ok){
          return
        }
        vm.$ajax.post(
          `${vm.host}/save_lan`,
          vm.$qs.stringify(vm.lan_data),
        ).then(function (response) {
          debugger;
          console.log(response);
        })
          .catch(function (error) {
            debugger;
            console.log(error);
          });
      },
      reset() {
        this.lan_data = copy(this.old_data);
      },
      clear() {
        this.lan_data = {};
      }
    },
    created() {
      this.old_data = copy(this.lan_data);
    },
    mounted() {
      $('.help-block').hide();
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
