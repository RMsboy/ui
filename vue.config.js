module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js', // 入口文件地址
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    // config.module.rule('js').include.add('/packages').end().use('babel').loader('babel-loader')
    // css: {
    //   loaderOptions: {
    //     sass: {
    //       prependData: `
    //         @import "~@/assets/name.scss";
    //       `
    //     }
    //     scss: {
    //       prependData: `@import "~@/variables.scss";`
    //     },
    //   }
    // }
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          // 要公用的scss的路径
          resources: './packages/theme-chalk/common/var.scss'
        })
        .end()
    })
  }
}