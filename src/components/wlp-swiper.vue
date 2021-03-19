<template>
  <div class="swiper" :class="options.type">1</div>
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