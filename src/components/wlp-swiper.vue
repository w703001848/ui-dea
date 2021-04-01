<template>
  <swiper ref="mySwiper" 
    :options="swiperOption" 
    :style="{'width': options.width + 'px', 'height': options.height + 'px', '--swiper-theme-color': themeColor.text, '--swiper-navigation-size': options.navigation && options.navigation.size}">
    <div v-if="swiperOption.navigation" class="swiper-button-prev" slot="button-prev"></div>
    <swiper-slide v-for="(item, index) of options.values" :key="index" :style="{'color': item.color, 'backgroundColor': item.bgColor}">
      <img v-if="item.type === 'img'" :src="item.url">
      <div v-else>{{item.title}}</div>
    </swiper-slide>
    <div v-if="swiperOption.navigation" class="swiper-button-next" slot="button-next"></div>
    <div v-if="swiperOption.pagination" class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';

  import 'swiper/css/swiper.css';

  export default {
    name: 'wlpSwiper',
    components: {
      Swiper,
      SwiperSlide,
    },
    directives: {
      swiper: directive
    },
    props: {
      options: {
        type: Object,
        default () {
            return {}
        }
      },
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper;
      },
      swiperOption(){
        let e = {
          // 设置分页器
          // pagination: {
          //     el: '.swiper-pagination',
          //     // 设置点击可切换
          //     clickable :true
          // },
          // 设置前进后退按钮
          navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          },
          // speed: 300,
          // loop: true,
          // autoplay: {
          //   delay: 5000,
          // },
          ...this.options.setting
        };
        return e;
      },
    },
    data() {
      return {
        
      }
    },
    mounted() {
      // console.log('Current Swiper instance object', this.swiper)
      // this.swiper.slideTo(3, 1000, false)
    },
    methods: {

    },
  }
</script>
<style lang="scss" scoped>
  @import '@/style/_base.scss';

  .swiper-slide {
    @include flex(center, center);
  }
</style>