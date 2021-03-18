<template>
  <nav class="status-bar" :class="{'status-bar--white': options.textStyle === 'white','status-bar--black': options.textStyle === 'black'}" :style="'backgroundColor:' + options.backgroundColor">
    <span>
      中国电信
      <wlp-icons></wlp-icons>
      <wlp-icons></wlp-icons>
      <wlp-icons></wlp-icons>
    </span>
    <span>
      <wlp-icons></wlp-icons>
      <wlp-icons></wlp-icons>
      {{time}}
    </span>
  </nav>
</template>


<script>
import wlpIcons from '@/components/wlp-icons.vue';
export default {
  components: {
    wlpIcons
  },
  props: {
    options: {
      type: Object,
      default () {
          return {}
      }
    }
  },
  data() {
    return {
      time: 'PM 22:22'
    }
  },
}
</script>
<style lang="scss">
  @import '@/style/_base.scss';

  .status-bar{
    @include position-header();
    @include flex(between, center);
    box-sizing: border-box;
    width: 100%;
    height: 22px;
    padding: 0 4px;
    font-size: 11px;

    &--black{
      color: #000000;
      background-color: #ffffff;
    }

    &--white{
      color: #ffffff;
      background-color: #000000;
    }
  }
</style>