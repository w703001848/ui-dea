<template>
  <el-container>
    <el-header>
      <el-button size="mini" type="text">打开项目</el-button>
      <el-button size="mini" type="text">保存项目</el-button>
    </el-header>
    <el-container>
      <el-aside width="500px">
        <el-tree
          :data="treeData"
          node-key="id"
          default-expand-all
          draggable
          :expand-on-click-node="false"
          :render-content="renderContent">
        </el-tree>
      </el-aside>
      <el-main>
        <div class="app" :class="{'app--status-bar': !navBar && statusBar}">
          <!-- 系统栏 -->
          <wlp-status-bar v-if="!navBar && statusBar" :options="statusBar"></wlp-status-bar>
          <page-phone :statusBar="statusBar" :navBar="navBar" :options="optionsData" @click="handleBox"/>
        </div>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import wlpStatusBar from '@/components/wlp-status-bar.vue';
import pagePhone from '@/components/page-phone.vue';
import { statusBar } from '@/config/component.data.js';
import tree from '@/config/tree.temp.js';
import design from '@/config/design.temp.js';

let id = 1;

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
      optionsData: [],
      treeData: [],
    }
  },
  created() {
    id = tree.length + 1;
    this.treeData = tree.data;
    this.optionsData = design[this.treeData[0].id];
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },
    edit(node, data) {
      console.log(node, data);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={ () => this.edit(node, data) }>Edit</el-button>
            <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
            <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
          </span>
        </span>);
    },
    handleBox(e){
      console.log(e);
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
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
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