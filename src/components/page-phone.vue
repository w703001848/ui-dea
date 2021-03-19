<template>
  <div class="page">
    <!-- 导航栏 -->
    <wlp-nav-bar v-if="navBar" :statusBar="statusBar"></wlp-nav-bar>
    <draggable v-model="list" @end="onEnd">
      <transition-group class="drop-wrapper">
        <template v-for="item of list">
          <!-- 占位 -->
          <div v-if="item.component === 'wrap'" :class="{'box': isBox, 'mouseHover': item.id === currentId}" :key="item.id" @click="handleBox(item)">
            <div class="wrap" :style="'height:' + item.height + 'px'"></div>
          </div>
          <!-- 轮播图 -->
          <div v-else-if="item.component === 'swiper'" :class="{'box': isBox, 'mouseHover': item.id === currentId}" :key="item.id" @click="handleBox(item)">
            <wlp-swiper :key="item.id" :options="item.options" @click="handleBox(item)"></wlp-swiper>
          </div>
        </template>
      </transition-group>
   </draggable>
  </div>
</template>

<script>
import wlpNavBar from '@/components/wlp-nav-bar.vue';
import wlpSwiper from '@/components/wlp-swiper.vue';
import draggable from 'vuedraggable';

export default {
  name: 'PagePhone',
  components: {
    wlpSwiper,
    wlpNavBar,
    draggable,
  },
  props: {
    isBox: {
      type: Boolean,
      default: false
    },
    statusBar: {
      type: [Object, Boolean],
      default () {
          return false
      }
    },
    navBar: {
      type: [Object, Boolean],
      default () {
          return false
      }
    },
    options: {
      type: Array,
      default () {
          return []
      }
    }
  },
  watch: {
    options(newVal, oldVal){
      this.list = newVal;
    }
  },
  data() {
    return {
      list: [],
      currentId: null,
    }
  },
  created() {
    this.list = this.options;
  },
  methods: {
    handleBox(event){
      this.currentId = event.id;
      this.$emit('click', event);
    },
    onEnd() {
      this.$emit('change', this.list);
    },
  },
}
</script>

<style lang="scss">
  @import '@/style/_base.scss';
  @import '@/style/core/_setting-phone.scss';
  @import '@/style/base2021.scss';

  .box{
    position: relative;
    &::after{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 9999;
      box-sizing: border-box;
      content: '';
      width: 100%;
      height: 100%;
      border: 1px dashed rgba($color: $color-primary, $alpha: 0.3);
    }
    &.mouseHover::after{
      border-style: solid;
      border-color: $color-error;
    }
  }

  .wrap{
    width: 100%;
    height: 10px;
  }
</style>
