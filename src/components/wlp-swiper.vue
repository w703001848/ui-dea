<template>
  <div class="swiper" :class="options.type" :style="{'backgroundColor': themeColor.bg}">1222</div>
</template>


<script>
export default {
  props: {
    options: {
      type: Object,
      default () {
          return {}
      }
    }
  },
}
</script>
<style lang="scss">
  @import '@/style/_base.scss';
</style>