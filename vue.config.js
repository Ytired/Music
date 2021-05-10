module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/music" : "/",
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
