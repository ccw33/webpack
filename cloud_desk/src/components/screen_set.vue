<template>
  <div class="container-fluid">
    <header class="w-100 position-relative">
      <h6 class="position-absolute" style="">分辨率设置</h6>
      <div class="text-muted position-absolute"
           @click="$emit('close_resolution_setting')">×
      </div>
    </header>
    <article>
      <form>
        <div class="form-group ">
          <label class="control-label">当前分辨率：</label>
          <p class="form-control-static">{{current_resolution}}</p>
        </div>
        <div class="form-group " :class="{'has-error':has_error}">
          <label class="control-label">选择分辨率：</label>
          <select class="form-control" v-model="selected">
            <option value="" disabled>请选择</option>
            <option v-for="resolution in resolution_list">{{ resolution }}</option>
          </select>
          <div class="help-block text-danger" v-if="has_error">请选择分辨率</div>
        </div>
      </form>
    </article>
    <footer>
      <button type="button" class="btn btn-sm btn-default" @click="$emit('close_resolution_setting')">取消</button>
      <button type="button" class="btn btn-sm btn-primary" @click="submit">保存</button>
    </footer>

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
          // '1400*251',
          // '1400*252',
          // '1400*253',
          // '1400*254',
        ],
        selected: '',
        has_error: false,
        // alert: {
        //   success: {
        //     message: '修改配置成功',
        //     is_show: false,
        //   },
        //   fail: {
        //     message: '获取配置失败',
        //     is_show: false,
        //   }
        // }
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
          `${vm.host}/api/operation_system/set_resolution`,
          vm.$qs.stringify({'selected': vm.selected}),
        ).then(function (response) {
          vm.$root.alert.success.message = '操作成功';
          vm.$root.alert.success.is_show = true;
          vm.has_error = false;
          vm.$emit('close_resolution_setting')
        }).catch(function (error) {
          vm.$root.alert.fail.message = '操作失败';
          vm.$root.alert.fail.is_show = true;
        });
      },
    },
    beforeCreate() {
      let vm = this;
      // $.get(`${vm.host}/api/operation_system/get_lans`,
      //   function (resp) {
      //     vm.lans = resp;
      //     vm.lan_data = vm.lans[0];
      //   });

      vm.$ajax.get(`${vm.host}/api/operation_system/get_resolution`)
        .then(resp => {
          vm.current_resolution = resp.data[0];
          resp.data.splice(0, 1);
          vm.resolution_list = resp.data;

        }).catch(error => {
        console.error(`SERVER----------:${error.response.data.content}`);
        vm.$root.alert.fail.is_show = true;
      });
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../assets/sass/base";

  .container-fluid {
    /*margin: 0;*/
    font-size: 1rem;
    padding: 0;

    header {
      height: 46px;
      h6 {
        line-height: 46px;
        top: 0;
        left: 1rem;
      }
      div {
        line-height: 46px;
        top: 0;
        right: 1rem;
        font-size: 2rem;
        color: $primary;
        &:hover {
          font-weight: bold;
          cursor: pointer;
        }
      }
    }

    article {
      text-align: left;
      padding: 1em;
      form {
        width: 100%;
        .form-group {
          height: 1.5em;
          width: 100%;
          position: relative;
          label {
            position: absolute;
            width: 6em;
            left: 4em;
            top: 0;
          }
          p, select, .help-block {
            position: absolute;
            width: 10em;
            font-size: 1em;
            left: 11em;
            top: 0;
          }
          select {
            top: -0.4em;
          }
          .help-block {
            top: 2.3em
          }
        }
      }

    }
    footer {
      padding: 1em;
      height: 4em;
      button {
        float: right;
        margin-left: 1em;
      }
    }
  }

</style>
