<template>
  <div class="container" :style="resStyle">
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
          <!-- 图标 -->
          <template v-else-if="item.type === 'icon'">
            <page-box v-if="isBox" :isChecked="index === current" :index="index" :key="index" @handleBox="handleBox" @handleRemove="handleRemove">
              <wlp-icons :color="item.color" :type="item.fontType" :size="item.size"></wlp-icons>
            </page-box>
            <wlp-icons v-else :key="index" :color="item.color" :type="item.fontType" :size="item.size"></wlp-icons>
          </template>
          <!-- 容器 -->
          <template v-else-if="item.type === 'container'">
            <page-box v-if="isBox" :isChecked="index === current" :index="index" :key="index" @handleBox="handleBox" @handleRemove="handleRemove">
              <wlp-container :options="item"></wlp-container>
            </page-box>
            <wlp-container v-else :key="index" :options="item"></wlp-container>
          </template>

        </template>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import pageBox from '@/components/page-box.vue';
import wlpSwiper from '@/components/wlp-swiper.vue';
import wlpDivider from '@/components/wlp-divider.vue';
import wlpIcons from '@/components/wlp-icons/wlp-icons.vue';
import wlpContainer from '@/components/wlp-container.vue';

export default{
  name: 'WlpContainer',
  components: {
    draggable,
    pageBox,
    wlpSwiper,
    wlpDivider,
    wlpIcons,
    wlpContainer,
  },
  props: {
    options: {
      type: Object,
      default () {
        return {
          style: null,
          children: []
        }
      }
    }
  },
  computed: {
    resStyle(){
      return `height: 100px;`
    }
  },
  watch: {
    options(newVal, oldVal){
      this.list = newVal.children;
    }
  },
  data() {
    return {
      list: [],
      current: null,
    }
  },
  created() {
    console.log(this.options)
    this.list = this.options.children;
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
      this.options.children = this.list;
      this.$emit('change', this.options);
    },
  },
}
</script>

<style lang="scss">
  .container{
    height: 100px;
  }
</style>