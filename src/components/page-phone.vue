<template>
  <div class="page" :class="themeType">
    <!-- 导航栏 -->
    <wlp-nav-bar v-if="navBar" :statusBar="statusBar"></wlp-nav-bar>
    <draggable v-model="list" @end="onEnd">
      <transition-group class="drop-wrapper">
        <template v-for="(item, index) of list">
          <!-- 占位 -->
          <div v-if="item.type === 'wrap'" :class="{'box': isBox, 'mouseHover': index === currentId}" :key="index" @click="handleBox(item, index)">
            <div class="wrap" :style="'height:' + item.height + 'px'"></div>
          </div>
          <!-- 轮播图 -->
          <div v-else-if="item.type === 'swiper'" :class="{'box': isBox, 'mouseHover': index === currentId}" :key="index" @click="handleBox(item, index)">
            <div class="box__remove" v-if="isBox" @click.stop.prevent="handleRemove(index)">
              <wlp-icons type="delete" color="#ffffff" size="12"></wlp-icons>
            </div>
            <wlp-swiper :key="item.id" :options="item.options"></wlp-swiper>
          </div>
        </template>
      </transition-group>
   </draggable>
  </div>
</template>

<script>
import wlpIcons from '@/components/wlp-icons/wlp-icons.vue';
import wlpNavBar from '@/components/wlp-nav-bar.vue';
import wlpSwiper from '@/components/wlp-swiper.vue';
import draggable from 'vuedraggable';

export default {
  name: 'PagePhone',
  components: {
    wlpIcons,
    wlpNavBar,
    wlpSwiper,
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
    handleBox(event, index){
      this.currentId = index;
      this.$emit('click', {event, index});
    },
    handleRemove(index){
      this.currentId = null;
      this.list.splice(index, 1);
      this.onEnd();
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
      z-index: 9997;
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

  .wrap{
    width: 100%;
    height: 10px;
  }
</style>
