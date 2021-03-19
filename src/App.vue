<template>
  <div class="body" id="app">
    <header class="body__head head">
        <div class="head__logo">我的工作台</div>
        <el-menu background-color="#3e464c" text-color="#fff" active-text-color="#ffd04b" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item index="Index" :router="true">项目</el-menu-item>
          <el-menu-item index="Design" :router="true">设计</el-menu-item>
          <el-menu-item index="Icons" :router="true">图标库</el-menu-item>
          <el-menu-item index="Images" :router="true">图片库</el-menu-item>
          <el-menu-item index="About" :router="true">更多</el-menu-item>
        </el-menu>
    </header>
    <div class="body__content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 'Index',
    }
  },
  created() {
    this.activeIndex = 'Design';
    this.$router.push({ name: 'Design'});
  },
  methods: {
    handleSelect(key, keyPath){
      // console.log(key, keyPath);
      this.$router.push({ name: key });
    }
  }
}
</script>

<style lang="scss">
  @import '@/style/_base.scss';

  html, body{
    height: 100%;
  }

  body{
    margin: 0;
  }

  .body{
    height: 100%;
    color: $text-color;

    &__head{
      box-sizing: border-box;
      height: 64px;
      background-color: #3e464c;
      box-shadow: 0 2px 4px -1px rgb(0,0,0.2);

      .el-menu.el-menu--horizontal{
        border: 0;
      }
    }

    &__content{
      box-sizing: border-box;
      display: flex;
      min-height: 100%;
      padding: 64px 0 0;
      background-color: #374046;
    }
  }

  .head{
    @include position-header();
    @include flex(null, center);
    padding: $spacing-col-sm $spacing-row-base;

    &__logo{
      color: $text-color;
      font-size: 24px;
      text-align: center;
      width: 200px;
    }
  }
</style>
