<template>
  <div class="container" :class="{'container--edit': isEdit && !isDraggable}" :style="{'height': style.height + 'px', 'width': style.width + 'px', 'padding': style.padding, 'margin': style.margin, 'backgroundColor': style.bgColor}">
    <div v-if="isDraggable && !isEdit" class="container__mask" @click.stop="handleBox" @dblclick.stop="dblHandleBox"></div>
    <draggable :disabled="isDraggable" v-model="list" @end="onEnd">
      <transition-group class="drop-wrapper">
        <template v-for="(item, index) of list">
          <!-- 容器 -->
          <template v-if="item.type === 'container'">
            <wlp-container :key="index" :children="item.children" :options="item.style" :isDraggable="item.isDraggable" :isEdit="item.isEdit" @click="handleItem({index})" @clickItem="handleItem" @dblclick="dblHandleBox({index})"></wlp-container>
          </template>
          <!-- 轮播图 -->
          <div class="box" v-else-if="item.type === 'swiper'" :key="index" @click="handleItem({index})">
            <wlp-swiper :options="item"></wlp-swiper>
          </div>
          <!-- 水平分割线 -->
          <div v-else-if="item.type === 'divider'" :key="index" @click="handleItem({index})">
            <wlp-divider :color="item.color" :thickness="item.thickness" :indent="item.indent" :endIndent="item.endIndent"></wlp-divider>
          </div>
          <!-- 图标 -->
          <template v-else-if="item.type === 'icon'">
            <wlp-icons :key="index" :color="item.color" :type="item.fontType" :size="item.size" @click="handleItem({index})"></wlp-icons>
          </template>

        </template>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import wlpSwiper from '@/components/wlp-swiper.vue';
import wlpDivider from '@/components/wlp-divider.vue';
import wlpIcons from '@/components/wlp-icons/wlp-icons.vue';

export default{
  name: 'WlpContainer',
  components: {
    draggable,
    wlpSwiper,
    wlpDivider,
    wlpIcons,
  },
  props: {
    // 样式
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    // 内容
    children: {
      type: Array,
      default () {
        return []
      }
    },
    // 拖动
    isDraggable: {
      type: Boolean,
      default: false
    },
    // 修改中
    isEdit: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    options(newVal, oldVal){
      this.style = newVal;
    },
    children(newVal, oldVal){
      this.list = newVal;
    }
  },
  data() {
    return {
      style: [],
      list: [],
    }
  },
  created() {
    this.list = this.children;
    this.style = this.options;
  },
  methods: {
    _test(){
      alert('12')
    },
    handleBox(){
      this.$emit('click');
    },
    dblHandleBox(e){
      this.$emit('dblclick', e);
    },
    // 组件点击
    handleItem(e){
      // console.log('handleItem',this.isEdit, e);
      if(this.isEdit){
        this.$emit('clickItem', {type: 'container', id: this.children[e.index].id});
      }else{
        this.$emit('clickItem', e);
      }
    },
    // 组件拖动更新数据
    onEnd() {
      this.options.children = this.list;
      this.$emit('change', this.options);
    }
  },
}
</script>

<style lang="scss">
  .container{
    position: relative;

    &__mask{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1000;
    }

    &--edit{
      margin: -1px;
      border: 1px dashed red;
      z-index: 1001;
    }
  }

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
  }
</style>