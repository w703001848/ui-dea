<template>
  <div class="divider" :style="styleData"></div>
</template>

<script>
  export default {
    name: 'WlpDivider',
    props: {
      vertical: {
        type: Boolean,
        default: false,
      },
      color: {
        type: String,
        default: '#0a82f3'
      },
      thickness: {
        type: Number,
        default: 1
      },
      indent: {
        type: Number,
        default: undefined,
      },
      endIndent: {
        type: Number,
        default: undefined,
      },
    },
    computed: {
      styleData(){
        let e = {'backgroundColor': this.color};
        if(this.vertical){
          e.width = this.thickness + 'px';
          e.marginTop = this.indent + 'px';
          e.marginBottom = this.endIndent + 'px';
        }else{
          e.height = this.thickness + 'px';
          e.marginLeft = this.indent + 'px';
          e.marginRight = this.endIndent + 'px';
        }
        return e;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/style/_base.scss';

  .divider {
    transform: scaleY(0.5);
    height: 100%;
    margin: 0;
  }
</style>