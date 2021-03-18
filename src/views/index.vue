<template>
  <el-container>
    <el-aside width="40vw">
      <el-collapse>
        <el-collapse-item title="风格" name="1">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
        <el-collapse-item title="配色" name="2">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="组件" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </el-collapse-item>
      </el-collapse>
    </el-aside>

    <el-container>
      <el-main>
        <page-phone :options="optionsData" @change="changePagePhone"/>
      </el-main>
      
      <el-footer>Footer</el-footer>
    </el-container>

    <el-aside>
      属性
    </el-aside>

  </el-container>
</template>

<script>
// @ is an alias to /src
import pagePhone from '@/components/page-phone.vue'

export default {
  name: 'Index',
  components: {
    pagePhone
  },
  data() {
    return {
      activeIndex: '1',
      optionsData: []
    }
  },
  methods: {
    handleSelect(key, keyPath){
      console.log(key, keyPath);
    },
    changePagePhone(e){
      this.optionsData = e;
    }
  }
}
</script>

<style lang="scss">
  @import '@/style/_base.scss';
  .el-collapse{
    border: 0;
  }
  .el-collapse-item{
    margin-bottom: $spacing-col-lg;
  }
  .el-collapse-item__header, .el-collapse-item__wrap{
    color: $text-color-inverse;
    background-color: #3f474d;
    border-bottom: 0;
  }
  .el-collapse-item__header, .el-collapse-item__content{
    box-sizing: border-box;
    color: $text-color-inverse;
    padding-left: $spacing-row-base;
    padding-right: $spacing-row-base;
  }
  .el-container{
    min-width: 415px;
  }
  .el-aside{
    min-width: 300px;
  }
  .el-main{
    @include flex(center, center);
  }
</style>