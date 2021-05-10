module.exports = {
  publicPath: "/MusicPlayer/",
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components",
        content: "components/content",
        common: "components/common",
        assets: "@/assets",
        pages: "@/pages",
        common: "@/common",
        service: "@/service",
      },
    },
  },
}
