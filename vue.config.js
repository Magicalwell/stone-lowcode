const TerserPlugin = import('terser-webpack-plugin')
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
  chainWebpack: (config) => {
    config.optimization.minimizer('terser').tap((args) => {
      // 注释console.*
      args[0].terserOptions.compress.drop_console = true
      // remove debugger
      args[0].terserOptions.compress.drop_debugger = true
      // 移除 console.log
      args[0].terserOptions.compress.pure_funcs = ['console.log']
      return args
    })
  }
}
