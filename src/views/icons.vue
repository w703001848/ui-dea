<template>
  <el-container>
    <el-main>
      <div class="grid">
        <div class="grid__content">
          <div class="grid__item" v-for="(item, key, index) of list" :key="index" @click="handleSelect(key, index)">
            <wlp-icons :type="key" color="#ffffff" size="36"></wlp-icons>
            <span class="grid__note">{{key}}</span>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import wlpIcons from '@/components/wlp-icons/wlp-icons.vue';
import icons from '@/components/wlp-icons/icons.js';

export default {
  components: {
    wlpIcons
  },
  data() {
    return {
      list: icons,
    }
  },
  created() {
    
  },
  methods: {
    handleSelect(key, index){
      console.log(key, index);
    }
  },
}
</script>

<style lang="scss">
  @import '@/style/_base.scss';
  @import '@/style//page/grid.scss';

  .grid__content{
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .grid__item{
    width: 8vw;
    height: 8vw;
    line-height: 1.8;
  }

</style>