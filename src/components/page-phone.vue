<template>
  <div class="page" :class="themeType">
    <!-- 导航栏 -->
    <wlp-nav-bar v-if="isNavBar" :statusBar="statusBar"></wlp-nav-bar>
    <wlp-container :isBox="isBox" :options="page"></wlp-container>
  </div>
</template>

<script>
import wlpNavBar from '@/components/wlp-nav-bar.vue';
import wlpContainer from '@/components/wlp-container.vue';

export default {
  name: 'PagePhone',
  components: {
    wlpNavBar,
    wlpContainer,
  },
  props: {
    isNavBar: {
      type: [Object, Boolean],
      default () {
          return false
      }
    },
    statusBar: {
      type: [Object, Boolean],
      default () {
          return false
      }
    },
    isBox: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default () {
        return {
          style: null,
          children: []
        }
      }
    }
  },
  watch: {
    options(newVal, oldVal){
      this.page = newVal;
    }
  },
  data() {
    return {
      page: {},
    }
  },
  methods: {
    onEnd() {
      this.$emit('change', this.page);
    },
  },
}
</script>

<style lang="scss">
  @import '@/style/_base.scss';
  @import '@/style/core/_setting-phone.scss';
  @import '@/style/base2021.scss';

  @import '@/style/theme/NEU.scss';
  @import '@/style/theme/MD.scss';
  @import '@/style/theme/FLAT.scss';

  .wrap{
    width: 100%;
    height: 10px;
  }
</style>
