<template>
  <div class="box" :class="{'mouseHover': isChecked}" :key="index" @click="handleBox(index)">
    <div class="box__remove" @click.stop.prevent="handleRemove(index)">
      <wlp-icons type="delete" color="#ffffff" size="12"></wlp-icons>
    </div>
    <slot/>
  </div>
</template>

<script>
  import wlpIcons from '@/components/wlp-icons/wlp-icons.vue';

  export default {
    name: 'PageBox',
    components: {
      wlpIcons,
    },
    props: {
      index: {
        type: Number,
        default: 0
      },
      isChecked: {
        type: Boolean,
        default: true
      },
    },
    methods: {
      handleBox(index){
        this.$emit('handleBox', index);
      },
      handleRemove(index){
        this.$emit('handleRemove', index);
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '@/style/_base.scss';

  .box{
    position: relative;

    &::after{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 9997;
      box-sizing: border-box;
      content: '';
      width: 100%;
      height: 100%;
      border: 1px dashed rgba($color: #333, $alpha: 0.3);
    }

    &.mouseHover::after{
      border-style: solid;
      border-color: $color-error;
    }

    &__remove{
      position: absolute;
      right: 0;
      top: 0;
      background-color: rgba($color: #000000, $alpha: 0.3);
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      z-index: 9998;
    }

  }
</style>