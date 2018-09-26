<template>
  <div class="container-fluid">
    <v_alert :alert="alert" @hide_success="alert.success.is_show=false" @hide_fail="alert.fail.is_show=false"></v_alert>
    <div class="col-xs-12 page-header" style=" margin-top: 1rem;">
      <h3 style="text-align: center;margin-top: 1rem;">分辨率设置</h3>
    </div>
    <div class="col-xs-12">
      <form class="form-horizontal">
        <div class="form-group ">
          <label class="col-xs-4 control-label" style="padding-top: 7px;">当前分辨率:</label>
          <div class="col-xs-8">
            <p class="form-control-static">{{current_resolution}}</p>
          </div>
        </div>
        <div class="form-group " :class="{'has-error':has_error}">
          <label class="col-xs-4 control-label" style="padding-top: 7px;">选择分辨率：</label>
          <div class="col-xs-8" style="padding: 0">
            <select class="form-control" v-model="selected">
              <option disabled value="">请选择</option>
              <option v-for="resolution in resolution_list">{{resolution}}</option>
            </select>
          </div>
          <div class="help-block col-xs-offset-4" style="margin-top: 3.5rem;" v-if="has_error">请选择分辨率</div>
        </div>
      </form>
    </div>
    <div class="col-xs-12 page-footer">
      <button type="button" class="btn btn-primary" style="margin-left: 2rem;" @click="submit">确定</button>
      <button type="button" class="btn btn-default" style="float: right;margin-right: 2rem;" @click="close">取消</button>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'screen_set',
    // store:store,
    components: {},
    data() {
      return {
        current_resolution: '',
        resolution_list: [
          // {
          //   'lan': '',
          //   'isActive': true,
          //   'is_auto': false,
          //   'ip': '',
          //   'subnet_mask': '',
          //   'gateway': '',
          //   'dns': '',
          //   'mac': ''
          // },
        ],
        selected: '',
        has_error: false,
        alert: {
          success: {
            message: '修改配置成功',
            is_show: false,
          },
          fail: {
            message: '获取配置失败',
            is_show: false,
          }
        }
      }
    },
    methods: {
      submit() {
        const vm = this;
        if (!vm.selected) {
          vm.has_error = true;
          return
        }
        vm.$ajax.post(
          `${vm.host}/set_resolution`,
          vm.$qs.stringify({'selected': vm.selected}),
        ).then(function (response) {
          vm.alert.success.is_show = true;
          vm.has_error = false;
        }).catch(function (error) {
          console.error(`SERVER----------:${error.response.data.content}`);
          vm.alert.fail.is_show = true;
        });
      },
      close() {
        const vm = this;
        vm.$ajax.post(
          `${vm.host}/close_screen_setting`,
          '',
        ).then(function (response) {
          console.log(response)
        }).catch(function (error) {
          console.error(`SERVER----------:${error.response.data.content}`);
          vm.alert.fail.is_show = true;
        });
      }
    },
    beforeCreate() {
      let vm = this;
      // $.get(`${vm.host}/get_lans`,
      //   function (resp) {
      //     vm.lans = resp;
      //     vm.lan_data = vm.lans[0];
      //   });

      vm.$ajax.get(`${vm.host}/get_resolution`)
        .then(resp => {
          vm.current_resolution = resp.data[0];
          resp.data.splice(0, 1);
          vm.resolution_list = resp.data;

        }).catch(error => {
        console.error(`SERVER----------:${error.response.data.content}`);
        vm.alert.fail.is_show = true;
      });
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  /*div {*/
  /*border: solid;*/
  /*border-width: 1px;*/
  /*border-color: #31b0d5;*/
  /*}*/
  .page-footer {
    margin-bottom: 20px;
    margin-top: 1rem;
    border-top: 1px solid #eee;
    padding: 9px 15px 0 15px;
  }
</style>
