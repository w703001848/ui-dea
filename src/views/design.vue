<template>
  <el-container :style="'height:' + height + 'px'">
    <el-aside width="38vw" style="min-height: 300px;">
      <el-collapse v-model="activeNames">
        <!-- <el-collapse-item :title="`风格 STYLE（ ${themeType} ）`" name="type">
          <div class="grid">
            <div class="grid__item styleType" :class="item" v-for="(item, index) of themeTypeList" :key="index" @click="handleType(item)">
              <div class="styleType__card" :class="item + '__main'">UIdea</div>
              <span class="styleType__name">{{item}}</span>
            </div>
          </div>
        </el-collapse-item> -->
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
        <el-collapse-item title="模块 module" name="module">
          <div class="grid">
            <div class="grid__item styleType">
              <div class="styleType__icon">
                <wlp-icons type="listing-content" color="#ccc" size="32"></wlp-icons>
              </div>
              <span class="styleType__name">page</span>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-aside>

    <el-container>
      <el-main>
        <div class="app" :class="{'app--status-bar': !isNavBar && statusBar}" @click="handleBox">
          <!-- 系统栏 -->
          <wlp-status-bar v-if="!isNavBar && statusBar" :options="statusBar"></wlp-status-bar>
          <div class="page" :class="themeType" @click.stop="">
            <!-- 导航栏 -->
            <wlp-nav-bar v-if="isNavBar" :statusBar="statusBar"></wlp-nav-bar>
            <wlp-container :isEdit="false" :isDraggable="isDraggable" :children="optionsData.children" :options="optionsData.style" @change="changePagePhone" @clickItem="handleItem" @dblclick="dblHandleBox"></wlp-container>
          </div>
        </div>
      </el-main>
      
      <el-footer>
        <el-row :gutter="20">
          <el-col :span="4"><el-button size="mini" type="text" @click="save()">保存页面</el-button></el-col>
          
        </el-row>
      </el-footer>
    </el-container>

    <el-aside>
      <div class="attr" v-if="current > -1">
        <template v-for="(item, key) of componentAttr">
          <span class="attr__name" v-if="key === 'id'" :key="key">{{item}}：</span>
          <span class="attr__name" v-else-if="key === 'name'" :key="key">{{item}}</span>
          <span class="attr__name" v-else-if="key === 'type'" :key="key">({{item}})</span>
          <div class="attr__row" v-else :key="key">
            <div class="attr__label">{{key}}</div>
            <div class="attr__field">{{item}}</div>
          </div>
        </template>
        <button v-if="componentAttr.type === 'container' && !isDraggable" @click="dblHandleBox({index: current})">修改</button>
        <button v-if="componentAttr.type === 'container' && isDraggable" @click="cancelHandleBox()">关闭容器</button>
        <button @click="handleRemove">删除</button>
      </div>
    </el-aside>

  </el-container>
</template>

<script>
  import wlpIcons from '@/components/wlp-icons/wlp-icons.vue';
  import wlpStatusBar from '@/components/wlp-status-bar.vue';
  import wlpContainer from '@/components/wlp-container.vue';

  import { themeType, themeColor, statusBar, componentData, designDefault } from '@/config/constData.config.js';
  import { swiperTemp } from '@/config/components.temp.js';

  import { deepClone } from '@/common/util.js';

  export default {
    name: 'Design',
    components: {
      wlpIcons,
      wlpStatusBar,
      wlpContainer,
    },
    data() {
      return {
        height: 300,
        activeNames: ['component'], // 'type', 'color', 
        themeTypeList: themeType,
        themeColorList: themeColor,
        colorKey: 'bg',
        statusBar: statusBar, // 头部状态栏
        isNavBar: false,        // 导航栏
        optionsData: {        // 查看中页面数据
          children: [],
          style: undefined
        },
        componentData: componentData,
        isDraggable: false,
        current: -1,
        currentChildren: undefined,
      }
    },
    computed: {
      componentAttr(){
        if(this.currentChildren){
          return this.currentChildren;
        }else{
          return this.optionsData.children[this.current];
        }
      }
    },
    created() {
      this.id = 0;
      this.height = document.documentElement.clientHeight - 64;
      this.design = JSON.parse(this.$storage.get('designData')) || deepClone(designDefault);
      // console.log(this.design, this.$store.state.designId)
      this.optionsData = this.design[this.$store.state.designId] || deepClone(designDefault)[1];
      this.optionsData.children.map(item => {
        if(item.id > this.id) this.id = item.id;
      });
      // console.log(this.optionsData, this.id)
    },
    methods: {
      // 修改主题风格
      handleType(item){
        this.$store.commit('setThemeType', item);
      },
      // 修改主题配色
      handleColor(item){
        if(item.name === themeColor.name) return;
        this.$store.commit('setThemeColor', item);
      },
      // 修改自定义配色
      handleColorEdit(item, key){
        if(item.name === 'custom'){
          // console.log(this.$refs.colorPicker, item, key)
          this.colorKey = key;
          this.$refs.colorPicker.showPicker= true
        }
      },
      // 调色板变化
      handleColorChange(val){
        this.themeColor[this.colorKey] = val;
        this.$storage.set('customThemeColor-' + this.colorKey, val);
        this.$store.commit('setThemeColor', this.themeColor);
      },
      // 新增组件
      handleComponent(e){
        if(e.type === 'swiper'){ // swiper 默认轮播数据添加
          e.values = swiperTemp;
        }
        console.log(e)
        this.id ++;
        if(this.isEdit){
          this.optionsData.children[this.current].children.push({
            id: this.id,
            ...e,
          });
        }else{
          this.optionsData.children.push({
            id: this.id,
            ...e,
          });
          // 属性面板定位当前新增组件
          this.current = this.optionsData.children.length - 1;
        }
      },
      // 修改页面
      handleBox(){
        this.cancelHandleBox();
        console.log('page');
        this.current = -1;
      },
      // 修改容器
      dblHandleBox(e){
        // console.log('dblHandleBox',e.index, this.optionsData.children[e.index]);
        this.isDraggable = true;
        this.optionsData.children[e.index].isEdit = true;
        this.optionsData.children[e.index].isDraggable = false;
      },
      // 关闭容器修改
      cancelHandleBox(){
        if(this.isDraggable){
          this.isDraggable = false;
          this.currentChildren = undefined;
          this.optionsData.children[this.current].isEdit = false;
          this.optionsData.children[this.current].isDraggable = true;
        }
      },
      // 选中组件
      handleItem(e){
        if(this.isDraggable && e.type == 'container'){
          this.searchChildren(this.optionsData.children[this.current].children, e.id);
        }else if(!this.isDraggable){
          this.current = e.index;
        }else{
          this.cancelHandleBox();
          this.current = e.index;
        }
      },
      searchChildren(obj, id, type = 'edit'){
        obj.some((n,index) => {
          if(n.hasOwnProperty('children')){
            this.searchChildren(n.children, id);
            return false;
          }else{
            if(n.id === id){
              if(type === 'edit'){
                this.currentChildren = n;
              }else{
                this.currentChildren = undefined;
                obj.splice(index, 1);
              }
              return true;
            }else{
              return false;
            }
          }
        });
      },
      // 删除组件
      handleRemove(){
        if(this.isDraggable){
          this.searchChildren(this.optionsData.children[this.current].children, this.currentChildren.id, 'remove');
        }else{
          this.cancelHandleBox();
          let index = this.current;
          this.current = -1;
          this.optionsData.children.splice(index, 1);
        }
      },
      // 更新当前页数据
      changePagePhone(e){
        this.optionsData = e;
      },
      // 保存当前页面数据
      save(){
        this.cancelHandleBox();
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

    .attr{
      padding: 0 5px 0 0;

      &__name{
        font-size: 22px;
        font-weight: bold;
        color: $color-primary;
        border-bottom: 2px solid $color-primary;
        line-height: 3;
      }

      &__row{
        @include flex(between);
        line-height: 1.8;
      }

      &__label{
        flex: none;
        width: 6em;
      }

      &__field{
        flex: auto;
      }
    }
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
    box-shadow: 0 0 3px #999;
    overflow-y: scroll;

    &::-webkit-scrollbar{
      display: none;
    }

    &--status-bar{
      padding-top: 22px;
    }
  }
</style>