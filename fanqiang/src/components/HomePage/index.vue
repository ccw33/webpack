<template>
  <div class="w-100 main-container">
    <header id="homepage_head" class="w-100 d-inline-flex-wrap align-items-start justify-content-between">
      <!--<div class="logo ml-1 shadow-lg">{{logo_name}}</div>-->
      <logo class="logo ml-1"></logo>
      <div class="buttons d-inline-flex-wrap">
        <div class="btn-group shadow-lg" role="group" aria-label="Button group with nested dropdown">
          <button type="button" class="download btn btn-link">下载</button>
          <div class="btn-group" role="group">
            <button id="btnGroupDrop1" type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
              账户
            </button>
            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <router-link to="/Account/login" class="dropdown-item">登录</router-link>
              <router-link to="/Account/sign_in" class="dropdown-item">注册</router-link>
            </div>
          </div>
          <router-link to="/Pay" class="btn btn-link">商店</router-link>
          <router-link :to="{ name: 'Download'}" class="btn btn-link">关于我们</router-link>
        </div>

      </div>
    </header>

    <section class="w-100 banner d-inline-flex flex-column justify-content-center align-items-center">
      <div class="text w-100 d-inline-flex flex-column justify-content-center align-items-center">
        <h1>{{logo_name}}</h1>
        <h2>--自由的访问网络，不再受到限制！！！</h2>
        <h2>--便宜！稳定！安全！快速！不限设备！！！</h2>
      </div>
      <div class="buttons w-100 d-inline-flex flex-row justify-content-center flex-wrap">
        <button type="button" class="btn btn-info btn-lg hvr-hang" @click="$router.push({ name: 'Pay'})">立即购买</button>
        <button type="button" class="btn btn-secondary btn-lg hvr-hang">限时优惠15/月 <br>
          价格是vpn的1/5
        </button>
      </div>
      <div class="nav d-inline-flex flex-row justify-content-center align-items-baseline flex-wrap">
        <div class="shadow-lg hvr-grow-rotate"><a href="#"
                                                  @click="utils.slowly_scroll_to('#cheap')">便宜</a></div>
        <div class="shadow-lg hvr-grow-rotate"><a href="#"
                                                  @click="utils.slowly_scroll_to('#stable')">稳定</a></div>
        <div class="shadow-lg hvr-grow-rotate"><a href="#"
                                                  @click="utils.slowly_scroll_to('#safe')">安全</a></div>
        <div class="shadow-lg hvr-grow-rotate"><a href="#"
                                                  @click="utils.slowly_scroll_to('#unlimit')">不限设备</a></div>
      </div>


    </section>

    <section id="cheap"
             class="bg-section w-100 h-auto">
      <div class="img"></div>
      <div class="text d-inline-flex flex-column justify-content-center align-items-center">
        <h1 class="">省钱</h1>
        <h2 class="text-muted ">
          ——价格是VPN的1/4
        </h2>
        <h2 class="text-muted ">
          ——新用户<b> 免费体验！！！</b>
        </h2>
        <h2 class="text-muted ">
          ——购买越多优惠越多
        </h2>
      </div>
    </section>

    <section id="stable"
             class="bg-section w-100 h-auto">
      <div class="text d-inline-flex flex-column justify-content-center align-items-center">
        <h1 class="">稳定</h1>
        <h2 class="text-muted ">
          ——提供每个账号提供一个以上的备用服务器，随时候命。
        </h2>
        <h2 class="text-muted ">
          由于vpn只提供一个服务器，一旦遭到封锁就会导致客户无法连接，
          <b> {{ logo_name }} </b>提供多个服务器进行备用，保证客户网络保持流畅，妈妈再也不用担心我游戏断线了
        </h2>
      </div>
      <div class="img"></div>
    </section>

    <section id="safe"
             class="bg-section w-100 h-auto">
      <div class="img"></div>
      <div class="text d-inline-flex flex-column justify-content-center align-items-center">
        <h1 class="">安全</h1>
        <h2 class="text-muted ">
          ——经过国外不同国家的多次跳转（仍然保持高速），隐藏真实ip，无法追踪
        </h2>
        <h2 class="text-muted font-itali！c">
          ——结合开源技术进行代理，直连国外服务器，没有中间商监听流量。
        </h2>
      </div>
    </section>

    <section id="unlimit"
             class="bg-section w-100 h-auto">
      <div class="img"></div>
      <div class="text d-inline-flex flex-column justify-content-center align-items-center">
        <h1 class="">不限设备</h1>
        <h2 class="text-muted ">
          ——同一账号可以在不同设备使用，数量不限！！！
          市面上的vpn都会限制设备使用数量，使用设备越多价格越高。
        </h2>
        <h2 class="text-muted ">
          ——但是 <b> {{logo_name}} </b>不作限制！！！
        </h2>
      </div>
    </section>


    <footer id="homepage_foot" class="w-100 d-inline-flex flex-column justify-content-center align-items-center">
      <h1>最后的寄语</h1>
      <h2>——提供Mondo的初衷是为了让大家有一个自由上网的环境，而不是散布不当言论。</h2>
      <h2>希望大家能够在自己国家的法律法规范围内，把Mondo使用在娱乐、学习和工作上</h2>
    </footer>
    <div style="height: 10rem;"></div>
    <i class="fa fa-arrow-up hvr-bob" aria-hidden="true" @click="utils.slowly_scroll_to('.main-container')"></i>
  </div>
</template>

<script>
  import logo from '@/common/logo';
  // $('.carousel').carousel({
  //   pause:true,
  // });
  export default {
    name: 'HomePage',
    components: {logo},
    data() {
      return {
        logo_name: this.conf.logo_name
      }
    },
    methods: {
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
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../../assets/sass/base";

  .main-container {

    font-size: 1rem;
    //@media all and (max-width: $phone-max-landscape-width) {
    //  font-size: 1rem;
    //}

    @media all and (max-width: $phone-max-portrait-width) {
      font-size: 0.8rem;
    }
    $header-height: 3em;
    #homepage_head {
      $height: $header-height;
      height: $height;
      font-family: 'HanyiSentyChalk';
      background-color: transparent;
      margin-bottom: 0.3em;
      .logo {
        font-size: $height*0.7;
        //color:$bg-color-4
      }
      .buttons {
        button, a {
          font-size: $height*0.5;
          color: $color-secondary-1-0;
          @media all and (max-width: $phone-max-portrait-width) {
            color: $color-secondary-1-1;
          }
          border: {
            style: solid;
            color: $color-secondary-1-0;
            width: 0;
            bottom-width: 2px;
          }
          @media all and (max-width: $phone-max-portrait-width) {
            border-bottom-color: $color-secondary-1-1;
          }
        }
        //.download {
        //  color: $color-secondary-2-3;
        //  border-color: $color-secondary-2-3;
        // }
      }
    }

    .banner {
      /*padding-bottom: 44%;*/
      /*height: 35em;*/
      padding: 2em;
      @media all and (max-width: $phone-max-portrait-width) {
        padding-top: $header-height+2em;
      }
      background: {
        image: url("/static/img/homepage/twitter-292988_1280_3.jpg");
        size: cover;
      }
      .text {
        font-family: 'SentyTEA';
        color: $color-secondary-2-2;
      }
      .buttons {
        button {
          margin: 2em;
          @media all and (max-width: $phone-max-portrait-width) {
            margin: 1em;
          }
          font-family: 'HanyiSentyChalk';
        }
      }

      .nav {
        font-size: 2em;
        font-family: 'HanyiSentyDiary';
        div {
          $tansparent: 0.2;
          background-color: rgba($tansparent, $tansparent, $tansparent, $tansparent);
          margin: 0.5em;
          padding: 0 0.2em;
          -webkit-border-radius: 0.1em;
          -moz-border-radius: 0.1em;
          border: {
            radius: 0.1em;
            style: solid;
            width: 1px;
            color: $color-withe;
          }
          a {
            color: $color-withe;
            &:hover {
              text-decoration: none;
            }
          }
        }
      }

    }

    section.bg-section {
      @extend .d-inline-flex;
      @extend .flex-row;
      @extend .justify-content-center;
      @extend .align-items-center;
      @extend .flex-wrap;

      $fontsize: 5em;
      .img {
        width: 50%;
        padding-bottom: 50%;
        @media all and (max-width: $phone-max-portrait-width) {
          width: 100%;
          padding-bottom: 100%;
        }
        background: {
          repeat: no-repeat;
          size: contain;
          position: center;
        }
      }
      .text {
        font-family: 'SentyTEA';
        width: 50%;
        padding: 1em;
        @media all and (max-width: $phone-max-portrait-width) {
          width: 100%;
        }
        h1 {
          font-size: $fontsize;
        }
        h2 {
          font-size: $fontsize/3;
          text-indent: 2em;
        }
      }
    }

    #cheap {
      background-color: transparent;
      .img {
        background: {
          image: url("/static/img/homepage/pig-20180912-175737.png");
        }
      }
    }
    #stable {
      background-color: $color-primary-1;
      .img {
        background: {
          image: url("/static/img/homepage/7f69ac0def40cb490eb0f6d61af35df6-min.png");
        }
      }
    }
    #safe {
      background-color: transparent;
      .img {
        background: {
          image: url("/static/img/homepage/fcebb317d1e0af023b624dff11befbad-min.png");
        }
      }
    }
    #unlimit {
      background-color: $color-primary-1;
      .img {
        background: {
          image: url("/static/img/homepage/b6e421a3b5227b90732d15dbb0351709.png");
        }
      }
    }

    #homepage_foot {
      padding: 3em;
      height: auto;
      background: {
        image: url("/static/img/homepage/1be9da1dec13c71ee533f2bf739f1216.jpg");
        size: cover;
      }
      font-family: 'HanyiSentyChalk';
    }

    .fa-arrow-up {
      position: fixed;
      font-size: 2em;
      bottom: 1em;
      right: 1em;
      color:$info;
      padding: 0.2em;
      border: {
        style: solid;
        width: 1px;
        color: $info;
        radius: 0.2em;
      }
    }

  }

</style>
