<template>
  <nav class="nav-bar" :class="{'nav-bar--white': options.textStyle === 'white','nav-bar--black': options.textStyle === 'black'}" :style="'backgroundColor:' + options.backgroundColor">
  </nav>
</template>


<script>
export default {
  name: 'WlpNavBar',
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

  .nav-bar{
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

  .nav-bar{
    width: 100%;
    height: 22px;
  }
</style>