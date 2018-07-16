<template>
  <div>
    <div class="alert alert-danger alert-dismissible" role="alert">
      <button type="button" class="close" aria-label="Close"><span @click="hide('.alert-danger')"
                                                                   aria-hidden="true">&times;</span></button>
      <strong>Warning!</strong> Better check yourself, you're not looking too good.
    </div>

    <ul class="nav nav-tabs">
      <li role="presentation" v-for="(item, index) in lans" :class="{'active':item.isActive}" @click="activate(index)">
        <a
          href="#">{{item.lan}}</a></li>
    </ul>
    <v_tab :lan_data="lan_data"></v_tab>
  </div>
</template>

<script>
  import v_tab from '@/components/v_tab';

  export default {
    name: 'Panel',
    components: {v_tab},
    data() {
      return {
        lans: [
          {
            'lan': '',
            'isActive': true,
            'is_auto': false,
            'ip': '',
            'subnet_mask': '',
            'gateway': '',
            'DNS': ''
          },
        ],
        lan_data: {
          'lan': '',
          'isActive': true,
          'is_auto': false,
          'ip': '',
          'subnet_mask': '',
          'gateway': '',
          'DNS': ''
        },
      }
    },
    methods: {
      activate(index) {
        this.lans.forEach((item, index, arr) => {
          item.isActive = false;
        });
        this.lans[index].isActive = true;
        this.lan_data = this.lans[index];
      },
      hide(selector) {
        $(selector).hide();
      }
    },
    mounted() {
      let vm = this;
      // $.get(`${vm.host}/get_lans`,
      //   function (resp) {
      //     vm.lans = resp;
      //     vm.lan_data = vm.lans[0];
      //   });

      vm.$ajax.get(`${vm.host}/get_lans`)
        .then(resp => {
          vm.lans = resp.data;
        }).catch(error => {
        $('.alert-danger').show();
      }).finally(() => {
        vm.lan_data = vm.lans[0];
      });
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .alert-danger {
    position: absolute;
    right: 3rem;
    top: 10rem;
    display: none;
    z-index: 9999;
  }

</style>
