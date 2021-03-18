module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/style/_base.scss";`
      }
    }
  }
};