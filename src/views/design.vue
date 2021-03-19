<template>
  <el-container :style="'height:' + height + 'px'">
    <el-aside width="38vw" style="min-height: 300px;">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="风格 STYLE" name="1">
          <div class="grid">
            <div class="grid__item styleType">
              <div class="styleType__card">UIdea</div>
              <span class="styleType__name">NEU</span>
            </div>
            <div class="grid__item styleType">
              <div class="styleType__card">UIdea</div>
              <span class="styleType__name">MD</span>
            </div>
            <div class="grid__item styleType">
              <div class="styleType__card">UIdea</div>
              <span class="styleType__name">FLAT</span>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="配色 COLOR" name="2">
          <div class="grid">
            <div class="grid__item styleColor" v-for="(item, index) of colorData" :key="index">
              <div class="styleColor__main" :style="'backgroundColor:' + item.bg"></div>
              <div class="styleColor__bottom">
                <span class="styleColor__helper" :style="'backgroundColor:' + item.primary"></span>
                <span class="styleColor__helper" :style="'backgroundColor:' + item.text"></span>
                <span class="styleColor__helper" :style="'backgroundColor:' + item.grey"></span>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="组件 COMPONENT" name="3">
          <div class="grid">
            <div class="grid__item styleType" v-for="(item, index) of componentData" :key="index" @click="handleComponent(item)">
              <div class="styleType__icon">
                <wlp-icons type="listing-content" color="#ccc" size="32"></wlp-icons>
              </div>
              <span class="styleType__name">{{item.name}}</span>
              <span class="styleType__txt">{{item.type}}</span>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-aside>

    <el-container>
      <el-main>
        <div class="app" :class="{'app--status-bar': !navBar && statusBar}">
          <!-- 系统栏 -->
          <wlp-status-bar v-if="!navBar && statusBar" :options="statusBar"></wlp-status-bar>
          <page-phone :statusBar="statusBar" :navBar="navBar" :options="optionsData" :isBox="isBox" @change="changePagePhone" @click="handleBox"/>
        </div>
      </el-main>
      
      <el-footer>
        <el-row :gutter="20">
          <el-col :span="4"><el-button size="mini" type="text" @click="save()">保存页面</el-button></el-col>
          <el-col :span="8"><el-checkbox v-model="isBox">是否显示组件框</el-checkbox></el-col>
          
          
        </el-row>
      </el-footer>
    </el-container>

    <el-aside>
      属性
    </el-aside>

  </el-container>
</template>

<script>
import wlpStatusBar from '@/components/wlp-status-bar.vue';
import wlpIcons from '@/components/wlp-icons/wlp-icons.vue';
import pagePhone from '@/components/page-phone.vue';

import { colorData, statusBar, componentData, designDefault } from '@/config/component.data.js';
// import design from '@/config/design.temp.json';

import { deepClone, writeFile } from '@/common/util.js';

let id = 0;
let design;

export default {
  name: 'Index',
  components: {
    wlpStatusBar,
    wlpIcons,
    pagePhone
  },
  data() {
    return {
      height: 300,
      activeNames: ['1'],
      colorData: colorData,
      statusBar: statusBar, // 头部状态栏
      navBar: false,        // 导航栏
      optionsData: [],
      componentData: componentData,
      isBox: true,
    }
  },
  created() {
    this.id = 1;
    this.height = document.documentElement.clientHeight - 64;
    design = JSON.parse(this.$storage.get('designData')) || deepClone(designDefault);
    this.optionsData = design[this.$store.state.designId];
    console.log(design, this.$store.state.designId)
    this.optionsData.map(item => {
      if(item.id > this.id) this.id = item.id;
    });
    this.id ++;
  },
  methods: {
    handleComponent(e){
      this.optionsData.push({
        ...e,
        id: this.id,
      })
      this.id ++;
    },
    handleBox(e){
      console.log(e);
    },
    changePagePhone(e){
      this.optionsData = e;
    },
    save(){
      design[this.$store.state.designId] = this.optionsData;
      this.$storage.set('designData', JSON.stringify(design[this.$store.state.designId]));
    }
  }
}
</script>

<style lang="scss">
  @import '@/style/_base.scss';
  // 开发环境使用,排除错位css
  @import '@/style/dev.scss';

  .el-collapse{
    border: 0;

    .el-collapse-item{
      margin-bottom: $spacing-col-lg;
    }

    .el-collapse-item__header, .el-collapse-item__wrap{
      color: $text-color;
      background-color: #3f474d;
      border-bottom: 0;
    }

    .el-collapse-item__header, .el-collapse-item__content{
      box-sizing: border-box;
      color: $text-color;
      padding-left: $spacing-row-base;
      padding-right: $spacing-row-base;
    }

    .grid{
      @include flex(null, null, null, wrap);
      margin: 0 - $spacing-col-base 0 - 1vw 0 0;

      &__item{
        width: 8vw;
        height: 8vw;
        line-height: 1.4;
        margin: $spacing-col-base 1vw 0 0;
        background-color: $bg-color;
        border-radius: $border-radius-lg;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);
      }

      .styleType{
        @include flex(center, center, column);

        &__card{
          @include flex(center, center);
          width: 60%;
          height: 40%;
          margin-bottom: $spacing-col-base;
          color: rgb(88, 255, 245);
          background-color: rgb(103, 145, 167);
        }

        &__icon{
          margin-bottom: $spacing-col-sm;
        }

        &__name{
          font-size: 13px;
        }

        &__txt{
          font-size: 11px;
        }
      }

      .styleColor{
        @include flex(null, null, column);
        overflow: hidden;

        &__main{
          height: 100%;
        }
        &__bottom{
          @include flex();
        }
        &__helper{
          width: 100%;
          height: 2.5vw;
        }
      }
    }
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

  .app{
    position: relative;
    width: 375px;
    height: 667px;
    color: #333;
    background-color: #ffffff;
    overflow-y: scroll;

    &::-webkit-scrollbar{
      display: none;
    }

    &--status-bar{
      padding-top: 22px;
    }
  }
</style>