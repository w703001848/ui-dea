<template>
  <nav class="status-bar" :class="{'status-bar--white': options.textStyle === 'white','status-bar--black': options.textStyle === 'black'}" :style="'backgroundColor:' + options.backgroundColor">
    123.33
  </nav>
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

  .status-bar{
    @include position-header();

    &--black{
      color: #000000;
      background-color: #ffffff;
    }

    &--white{
      color: #ffffff;
      background-color: #000000;
    }
  }

  .status-bar{
    width: 100%;
    height: 22px;
  }
</style>