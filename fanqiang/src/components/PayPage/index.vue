<template>
  <div class="my-container">
    <my_header></my_header>
    <hr>
    <section id="step1" class="w-100 d-inline-flex flex-column justify-content-center align-items-center">
      <h5 class="title align-self-start text-muted">第一步、选择套餐</h5>
      <section class="set_selections d-inline-flex flex-row justify-content-around align-items-center flex-nowrap">

      </section>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div v-for="(item,index) in  sets"
               class="swiper-slide d-inline-flex flex-column justify-content-center align-items-center">
            <div class="title_mention" v-if="item.title_mention">{{item.title_mention}}</div>
            <h1 class="name">{{item.name}}</h1>
            <div class="price_preview">{{item.price_preview}}</div>
            <button class="learn_more btn btn-primary" type="button" data-toggle="collapse"
                    :data-target="'#'+item.price_detail_id"
                    aria-expanded="true" :aria-controls="item.price_detail_id"
                    @click="utils.slowly_scroll_to('#'+item.price_detail_id)">
              购买
            </button>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div class="collapse" data-parent="#step1" :id="item.price_detail_id" v-for="(item,index) in sets">
        <div class="card card-body w-100 d-inline-flex flex-column justify-content-center align-items-center">
          <h1>{{item.name}}</h1>
          <div class="chosen w-100 d-inline-flex flex-row justify-content-center align-items-center flex-wrap">
            <div class="p_detail d-inline-flex flex-column justify-content-center align-items-center"
                 v-for="(p_detail,p_index) in item.price_detail">
              <div class="hvr-icon-up  d-inline-flex flex-row justify-content-center align-items-baseline">
                <h4 class="text-primary">{{p_detail.title}}</h4>
                <i class="fa fa-question-circle hvr-icon" aria-hidden="true" data-toggle="popover" data-placement="top"
                   :data-title="p_detail.title"
                   :data-content="p_detail.instruction"
                   @click="$('.fa-question-circle').popover('hide')"></i>
              </div>
              <div>共{{p_detail.total_price}}元</div>
              <button class="buy_button btn btn-info">{{p_detail.per_mon_price}}元/月</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <hr>

    <section id="step2" class="w-100 d-inline-flex flex-column justify-content-center align-items-center">
      <h5 class="title align-self-start text-muted">第二步、完成支付</h5>

      <div class="accordion w-75" id="accordionExample">
        <div class="card">
          <div class="card-header p-0" id="headingOne">
            <h5 class="mb-0">
              <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne"
                      aria-expanded="true" aria-controls="collapseOne">
                Collapsible Group Item #1
              </button>
            </h5>
          </div>

          <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body w-100 d-inline-flex flex-column justify-content-center align-items-center">
              <div class="w-100 d-inline-flex flex-row justify-content-between align-items-baseline">
                <div class="ml-1">选择套餐</div>
                <div class="mr-1">2年paperplane套餐</div>
              </div>
              <div class="w-100 d-inline-flex flex-row justify-content-between align-items-baseline">
                <div class="ml-1">价格</div>
                <div class="mr-1 ">308.88元</div>
              </div>
              <div class="w-100 d-inline-flex flex-row justify-content-between align-items-baseline">
                <div class="ml-1">使用优惠</div>
                <div class="mr-1 ">-0元</div>
              </div>
              <hr>
              <div class="w-100 d-inline-flex flex-row justify-content-between align-items-baseline">
                <div class="ml-1">总计</div>
                <div class="mr-1 ">308.88元</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

    <footer style="height: 10em;"></footer>


  </div>
</template>

<script>
  import my_header from '@/common/my_header';

  // $('.carousel').carousel({
  //   pause:true,
  // });
  export default {
    name: 'Pay',
    components: {my_header},
    data() {
      return {
        sets: [
          {
            title_mention: '',
            name: '1月套餐',
            price_preview: '19.9元/月起',
            price_detail_id: 'one_mon_detail',
            price_detail: [
              {
                type: 'normal',
                title: '普通版',
                total_price: 19.9,
                per_mon_price: 19.9,
                instruction: '1、经过一次跳转具备隐藏ip功能。  \n2、自动替换可用代理，防止服务器封锁'
              },
              {
                type: 'onion',
                title: '洋葱版',
                total_price: 25.87,
                per_mon_price: 25.87,
                instruction: '1、经过多次跳转，深度隐藏ip。  \n2、自动替换可用代理，防止服务器封锁'
              },
              {
                type: 'stable',
                title: '极速稳定版',
                total_price: 29.85,
                per_mon_price: 29.85,
                instruction: '1、经过一次跳转具备隐藏ip功能。  \n2、带有一个以上备用代理，保持网络通畅，适用于游戏'
              },
              {
                type: 'stable_onion',
                title: '极速稳定洋葱版',
                total_price: 35.82,
                per_mon_price: 35.82,
                instruction: '1、经过多次跳转，深度隐藏ip。  \n2、带有一个以上备用代理，保持网络通畅，适用于游戏'
              },
            ]
          },
          {
            title_mention: 'Hotest!!!',
            name: '2年套餐',
            price_preview: '9.9元/月起',
            price_detail_id: 'two_year_detail',
            price_detail: [
              {
                type: 'normal',
                title: '普通版',
                total_price: 237.6,
                per_mon_price: 9.9,
                instruction: '1、经过一次跳转具备隐藏ip功能。  \n2、自动替换可用代理，防止服务器封锁'
              },
              {
                type: 'onion',
                title: '洋葱版',
                total_price: 308.88,
                per_mon_price: 12.87,
                instruction: '1、经过多次跳转，深度隐藏ip。  \n2、自动替换可用代理，防止服务器封锁'

              },
              {
                type: 'stable',
                title: '极速稳定版',
                total_price: 356.4,
                per_mon_price: 14.85,
                instruction: '1、经过一次跳转具备隐藏ip功能。  \n2、带有一个以上备用代理，保持网络通畅，适用于游戏'
              },
              {
                type: 'stable_onion',
                title: '极速稳定洋葱版',
                total_price: 427.68,
                per_mon_price: 17.82,
                instruction: '1、经过多次跳转，深度隐藏ip。  \n2、带有一个以上备用代理，保持网络通畅，适用于游戏'
              },
            ]
          },
          {
            title_mention: '',
            name: '1年套餐',
            price_preview: '14.9元/月起',
            price_detail_id: 'one_year_detail',
            price_detail: [
              {
                type: 'normal',
                title: '普通版',
                total_price: 178.8,
                per_mon_price: 14.9,
                instruction: '1、经过一次跳转具备隐藏ip功能。  \n2、自动替换可用代理，防止服务器封锁'
              },
              {
                type: 'onion',
                title: '洋葱版',
                total_price: 232.44,
                per_mon_price: 19.37,
                instruction: '1、经过多次跳转，深度隐藏ip。  \n2、自动替换可用代理，防止服务器封锁'
              },
              {
                type: 'stable',
                title: '极速稳定版',
                total_price: 268.2,
                per_mon_price: 22.35,
                instruction: '1、经过一次跳转具备隐藏ip功能。  \n2、带有一个以上备用代理，保持网络通畅，适用于游戏'
              },
              {
                type: 'stable_onion',
                title: '极速稳定洋葱版',
                total_price: 321.84,
                per_mon_price: 26.82,
                instruction: '1、经过多次跳转，深度隐藏ip。  \n2、带有一个以上备用代理，保持网络通畅，适用于游戏'
              },
            ]
          },
        ],
        selection: {
          price_detail_id: '',
          type: '',
          total_price: 0,
          per_mon_price: 0,
        }
      }
    },
    computed: {
      initialSlide() {
        const vm = this;
        for (let index in vm.sets) {
          if (vm.sets[index].title_mention) {
            return index;
          }
        }
        return 0
      }
    },
    methods: {
      select(){
        const vm = this;
        //todo 选择好购买套餐后，在这里修改vm.selection,vm.selection会显示在支付section上
      }
    },
    beforeCreate() {
      let vm = this;
      // // $.get(`${vm.host}/get_lans`,
      // //   function (resp) {
      // //     vm.lans = resp;
      // //     vm.lan_data = vm.lans[0];
      // //   });
      //
      // vm.$ajax.get(`${vm.host}/get_lans`)
      //   .then(resp => {
      //     vm.lans = resp.data;
      //   }).catch(error => {
      //   $('.alert-danger').show();
      // }).finally(() => {
      //   vm.lan_data = vm.lans[0];
      // });
    },
    mounted() {
      const vm = this;
      //激活banner
      let mySwiper = new vm.utils.Swiper('.swiper-container', {
        initialSlide: vm.initialSlide,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: '.swiper-pagination',
        },
      })
      //激活popover
      $('[data-toggle="popover"]').popover({})
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../../assets/sass/base";

  .my-container {
    font-size: 1rem;
    font-family: 'HanyiSentyChalk';
    /*font-family: $font-family-base;*/
    h5.title {
      margin: 1em 0.5em;
    }
    #step1 {
      .swiper-container {
        width: 100%;
        padding-top: 50px;
        padding-bottom: 50px;
        .swiper-slide {
          /*background-position: center;*/
          /*background-size: cover;*/
          border: {
            style: solid;
            width: 0.2em;
            color: $color-primary-3;
            radius: 0.5em;
          }
          width: 20em;
          height: 20em;
          .title_mention {
            font-size: 2em;
            color: $danger;
          }
          .name {
            color: $primary;
          }
          .price_preview {
            font-size: 1.5em;
          }
          .learn_more {
            margin-top: 2em;
          }

        }
      }
      .collapse {
        .card {
          .chosen {
            .p_detail {
              margin: 2em;
              .buy_button {
                margin-top: 0.5em;
              }
            }
          }
        }
      }
    }

    #step2 {
      .accordion {
        min-width: 20em;
        max-width: 60em;
      }
    }

  }

</style>
