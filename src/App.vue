<template>
  <div class="body" id="app">
    <header class="body__head head">
        <div class="head__logo">我的工作台</div>
        <el-menu background-color="#3e464c" text-color="#fff" active-text-color="#ffd04b" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">设计</el-menu-item>
          <el-menu-item index="2">设计2</el-menu-item>
          <el-menu-item index="3">设计3</el-menu-item>
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
      activeIndex: '1',
    }
  },
  methods: {
    handleSelect(key, keyPath){
      console.log(key, keyPath);
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
    color: $text-color-inverse;

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
      color: $text-color-inverse;
      font-size: 24px;
      text-align: center;
      width: 200px;
    }
  }
</style>
