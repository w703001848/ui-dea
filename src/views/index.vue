<template>
  <el-container>
    <el-aside width="400px">
      <el-header>
        <el-button size="mini" type="text" @click="newProject()">重置项目</el-button>
        <el-button size="mini" type="text" @click="saveProject()">保存项目</el-button>
      </el-header>

      <el-tree
        :data="treeData"
        node-key="id"
        default-expand-all
        draggable
        :expand-on-click-node="false"
        :render-content="renderContent">
      </el-tree>
    </el-aside>

    <el-container v-if="treePage">
      <el-main>
        <div class="app" :class="{'app--status-bar': !navBar && statusBar}">
          <!-- 系统栏 -->
          <wlp-status-bar v-if="!navBar && statusBar" :options="statusBar"></wlp-status-bar>
          <page-phone :statusBar="statusBar" :navBar="navBar" :options="optionsData" @click="handleBox"/>
        </div>
      </el-main>
      <el-footer>
        <el-row>
          页面名称：
          <el-input
            placeholder="请输入页面名称"
            v-model="treePage.label">
          </el-input>
        </el-row>
      </el-footer>
    </el-container>

  </el-container>
</template>

<script>
import wlpStatusBar from '@/components/wlp-status-bar.vue';
import pagePhone from '@/components/page-phone.vue';
import { statusBar, treeDefault, designDefault } from '@/config/constData.config.js';

import { deepClone } from '@/common/util.js';

export default {
  name: 'Index',
  components: {
    wlpStatusBar,
    pagePhone
  },
  data() {
    return {
      statusBar: statusBar, // 头部状态栏
      navBar: false,        // 导航栏
      treeData: [],         // 项目文件数据
      optionsData: [],      // 查看中页面数据
      treePage: null,       // 查看中页面
    }
  },
  created() {
    this.initProject('init');
  },
  methods: {
    append(data) {
      var name = prompt("标题：");  
      console.log(name, this.id);
      if(name){
        this.id ++;
        const newChild = { id: this.id, label: name, children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
        this.design[this.id] = deepClone(designDefault[1]);
      }
    },
    open(node, data) {
      this.optionsData = this.design[data.id];
      this.treePage = data;
      console.log(node, data, this.optionsData);
      this.$store.commit('setDesignId', data.id);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      delete this.design[data.id];
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={ () => this.open(node, data) }>Open</el-button>
            <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
            <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
          </span>
        </span>);
    },
    handleBox(e){
      console.log(e);
    },
    findId(arr, pageId){
      arr.map(n => {
        this.id = this.id > n.id ? this.id : n.id;
        if(n.id === pageId) this.treePage = n;
        if(n.children.length) this.findId(n.children, pageId);
      });
    },
    initProject(type = 'init'){
      if(type === 'init'){
        let pageId = this.$store.state.designId;
        this.treeData = JSON.parse(this.$storage.get('treeData')) || deepClone(treeDefault);
        this.design = JSON.parse(this.$storage.get('designData')) || deepClone(designDefault);
        this.optionsData = this.design[pageId];
        this.findId(this.treeData, pageId);
      }else{
        this.treeData = deepClone(treeDefault),
        this.design = deepClone(designDefault);
        this.optionsData = this.design[1];
        this.id = 1;
        this.treePage = this.treeData[0];
      }
      // console.log(this.treeData, this.design, this.id, this.optionsData);
    },
    newProject(){
      if(confirm("警告：未保存前可刷新页面获取旧数据！")){
        this.initProject();
      }
    },
    saveProject(){
      console.log(this.treeData, this.design);
      this.$storage.set('treeData', JSON.stringify(this.treeData));
      this.$storage.set('designData', JSON.stringify(this.design));
    }
  }
}
</script>

<style lang="scss">
  @import '@/style/_base.scss';
  // 开发环境使用,排除错位css
  @import '@/style/dev.scss';

  .el-container{
    min-width: 415px;
  }

  .el-aside{
    min-width: 300px;

    .el-tree{
      color: #fff;
      background-color: #3f474d;

      .el-tree-node__content:hover{
        background-color:#374046
      }

      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
      }
    }
  }

  .el-main{
    @include flex(center, center);
  }

  .el-footer{

    .el-input{
      width: 100px;
    }
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