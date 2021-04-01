<template>
  <div class="page" :class="themeType">
    <!-- 导航栏 -->
    <wlp-nav-bar v-if="navBar" :statusBar="statusBar"></wlp-nav-bar>
    <draggable v-model="list" @end="onEnd">
      <transition-group class="drop-wrapper">
        <template v-for="(item, index) of list">
          <!-- 轮播图 -->
          <template v-if="item.type === 'swiper'">
            <page-box v-if="isBox" :isChecked="index === current" :index="index" :key="index" @handleBox="handleBox" @handleRemove="handleRemove">
              <wlp-swiper :options="item"></wlp-swiper>
            </page-box>
            <wlp-swiper v-else :key="index" :options="item"></wlp-swiper>
          </template>
          <!-- 水平分割线 -->
          <template v-else-if="item.type === 'divider'">
            <page-box v-if="isBox" :isChecked="index === current" :index="index" :key="index" @handleBox="handleBox" @handleRemove="handleRemove">
              <wlp-divider :color="item.color" :thickness="item.thickness" :indent="item.indent" :endIndent="item.endIndent"></wlp-divider>
            </page-box>
            <wlp-divider v-else :key="index" :color="item.color" :thickness="item.thickness" :indent="item.indent" :endIndent="item.endIndent"></wlp-divider>
          </template>

        </template>
      </transition-group>
   </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import pageBox from '@/components/page-box.vue';
import wlpIcons from '@/components/wlp-icons/wlp-icons.vue';
import wlpNavBar from '@/components/wlp-nav-bar.vue';
import wlpSwiper from '@/components/wlp-swiper.vue';
import wlpDivider from '@/components/wlp-divider.vue';

export default {
  name: 'PagePhone',
  components: {
    draggable,
    pageBox,
    wlpIcons,
    wlpNavBar,
    wlpSwiper,
    wlpDivider,
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
      current: null,
    }
  },
  created() {
    this.list = this.options;
  },
  methods: {
    handleBox(index){
      this.current = index;
      this.$emit('click', {index});
    },
    handleRemove(index){
      this.current = null;
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

  @import '@/style/theme/NEU.scss';
  @import '@/style/theme/MD.scss';
  @import '@/style/theme/FLAT.scss';

  .wrap{
    width: 100%;
    height: 10px;
  }
</style>
