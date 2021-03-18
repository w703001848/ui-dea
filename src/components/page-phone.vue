<template>
  <div class="page">
    <nav class="system-bar"></nav>
    <header class="header"></header>
    <draggable v-model="list" @end="onEnd">
      <transition-group class="drop-wrapper">
        <template v-for="item of list">
          <div v-if="item.component === 'box'" :key="item.id">{{item.component}} - {{item.id}}</div>
        </template>
      </transition-group>
   </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'PagePhone',
  components: {
    draggable
  },
  props: {
    options: {
      type: Array,
      default () {
          return []
      }
    }
  },
  watch: {
    options(val){
      this.list = val;
    }
  },
  data() {
    return {
      list: [
        {
          id: 0,
          component: 'box'
        },
        {
          id: 1,
          component: 'box'
        },
        {
          id: 2,
          component: 'box'
        }
      ]
    }
  },
  methods: {
    onEnd() {
      this.$emit('change', this.list);
    },
  },
}
</script>

<style lang="scss" scoped>
  @import '@/style/_base.scss';

  .page{
    @include flex(null, null, column);
    width: 375px;
    height: 667px;
    overflow: hidden;
    color: #333;
    background-color: #ffffff;
  }

  .system-bar{
    @include position-header();
  }

</style>
