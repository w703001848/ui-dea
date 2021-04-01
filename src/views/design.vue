<template>
  <el-container :style="'height:' + height + 'px'">
    <el-aside width="38vw" style="min-height: 300px;">
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="`风格 STYLE（ ${themeType} ）`" name="type">
          <div class="grid">
            <div class="grid__item styleType" :class="item" v-for="(item, index) of themeTypeList" :key="index" @click="handleType(item)">
              <div class="styleType__card" :class="item + '__main'">UIdea</div>
              <span class="styleType__name">{{item}}</span>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item :title="`配色 COLOR（ ${themeColor.name} ）`" name="color">
          <div class="grid">
            <div class="grid__item styleColor" v-for="(item, index) of themeColorList" :key="index" @click="handleColor(item)">
              <div class="styleColor__main" :style="'backgroundColor:' + item.bg" @click="handleColorEdit(item, 'bg')"></div>
              <div class="styleColor__bottom">
                <span class="styleColor__helper" :style="'backgroundColor:' + item.primary" @click="handleColorEdit(item, 'primary')"></span>
                <span class="styleColor__helper" :style="'backgroundColor:' + item.text" @click="handleColorEdit(item, 'text')"></span>
                <span class="styleColor__helper" :style="'backgroundColor:' + item.grey" @click="handleColorEdit(item, 'grey')"></span>
              </div>
              {{item.name}}
            </div>
            <el-color-picker
              ref="colorPicker"
              v-model="themeColor[colorKey]"
              @change="handleColorChange">
            </el-color-picker>
          </div>
        </el-collapse-item>
        <el-collapse-item title="组件 COMPONENT" name="component">
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
      <div v-if="current > -1">
        属性
        <div v-for="(item, key) of optionsData[current]" :key="key">
          {{item}}-{{key}}
        </div>
      </div>
    </el-aside>

  </el-container>
</template>

<script>
import wlpStatusBar from '@/components/wlp-status-bar.vue';
import wlpIcons from '@/components/wlp-icons/wlp-icons.vue';
import pagePhone from '@/components/page-phone.vue';

import { themeType, themeColor, statusBar, componentData, designDefault } from '@/config/constData.config.js';
import { swiperTemp } from '@/config/components.temp.js';

import { deepClone } from '@/common/util.js';

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
      activeNames: ['component'], // 'type', 'color', 
      themeTypeList: themeType,
      themeColorList: themeColor,
      colorKey: 'bg',
      statusBar: statusBar, // 头部状态栏
      navBar: false,        // 导航栏
      optionsData: [],
      componentData: componentData,
      isBox: true,
      current: -1,
    }
  },
  created() {
    this.id = 0;
    this.height = document.documentElement.clientHeight - 64;
    this.design = JSON.parse(this.$storage.get('designData')) || deepClone(designDefault);
    // console.log(this.design, this.$store.state.designId)
    this.optionsData = this.design[this.$store.state.designId];
    this.optionsData.map(item => {
      if(item.id > this.id) this.id = item.id;
    });
    // console.log(this.optionsData, this.id)
  },
  methods: {
    handleType(item){
      this.$store.commit('setThemeType', item);
    },
    handleColor(item){
      if(item.name === themeColor.name) return;
      this.$store.commit('setThemeColor', item);
    },
    handleColorEdit(item, key){
      if(item.name === 'custom'){
        // console.log(this.$refs.colorPicker, item, key)
        this.colorKey = key;
        this.$refs.colorPicker.showPicker= true
      }
    },
    handleColorChange(val){
      this.themeColor[this.colorKey] = val;
      this.$storage.set('customThemeColor-' + this.colorKey, val);
      this.$store.commit('setThemeColor', this.themeColor);
    },
    handleComponent(e){
      if(e.type === 'swiper'){
        e.banners = swiperTemp;
      }
      console.log(e)
      this.id ++;
      this.optionsData.push({
        ...e,
        id: this.id,
      })
    },
    handleBox(e){
      this.current = e.index;
    },
    changePagePhone(e){
      this.optionsData = e;
    },
    save(){
      this.design[this.$store.state.designId] = this.optionsData;
      this.$storage.set('designData', JSON.stringify(this.design));
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
          border-radius: 3px;
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
        text-align: center;
        line-height: 1.8;

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
    .el-color-picker{
      display: none;
    }
  }
  .el-color-picker__panel{
    top: 30% !important;
    left: 80px !important;
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