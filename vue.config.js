module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        // 'assets': path.resolve(__dirname, '../src/assets'),
        'pages': '@/pages',
        'common': '@/common',
        'service': '@/service',
      }
    }
  }
}