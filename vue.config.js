module.exports = {
  outputDir: 'easePageCreator',
  publicPath: '/child/easePageCreator/',
  productionSourceMap: false,
  devServer: {
    hot: false,
    disableHostCheck: true,
    port: 4002,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  lintOnSave: false,
  // 自定义webpack配置
  configureWebpack: {}
}
