<template>
  <div class="alert-box">
    <transition enter-active-class="animated bounceInRight"
                leave-active-class="animated bounceOutRight">
      <div v-show="alert.success.is_show" class="alert alert-success alert-dismissible" role="alert">
        <button type="button" class="close" aria-label="Close"><span @click="$emit('hide_success')"
                                                                     aria-hidden="true">&times;</span></button>
        <strong>Success!</strong> {{alert.success.message}}
      </div>
    </transition>

    <transition enter-active-class="animated bounceInRight"
                leave-active-class="animated bounceOutRight">
      <div v-show="alert.fail.is_show" class="alert alert-danger alert-dismissible" role="alert">
        <button type="button" class="close" aria-label="Close"><span @click="$emit('hide_fail')"
                                                                     aria-hidden="true">&times;</span></button>
        <strong>Warning!</strong> {{alert.fail.message}}
      </div>
    </transition>

  </div>
</template>

<script>
  import utils from "../utils";

  export default {
    name: "v_alert",
    props: {
      alert: {
        type: Object,
        required: true,
        validator(value) {
          let template = {
            success: {
              message: '修改配置成功',
              is_show: false,
            },
            fail: {
              message: '修改配置失败',
              is_show: false,
            }
          };
          return utils.validate_template(value,template,'alert')
        }
      },
    },
    data() {
      return {
        success: this.alert.success,
        fail: this.alert.fail
      }
    }

  }
</script>

<style scoped lang="less">
  .alert-box {
    position: absolute;
    right: 3rem;
    top: 10rem;
    z-index: 9999;
    #get_setting_fail, #change_setting_failed, #change_setting_succeed {
      display: none;
    }
  }


</style>
