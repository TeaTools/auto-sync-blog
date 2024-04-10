export default {
  // blog 基础配置
  blog: {
    title: "每日掘金",
    description: "专注于发掘站内优质创作者和优质内容",
    logo: "https://p3-passport.byteacctimg.com/img/user-avatar/b72e991ee9b1c9bdca7b2bd4c8dc78a8~300x300.image",
    siteName: "tea.juejindev.com",
    head: [],
    keywords: ["前端", "后端", "移动端", "每日掘金", "酱酱的下午茶", "掘金", "掘金酱"],
    author: "TeaTools,MiyueFE"
  },

  // vite press 构建配置
  press: {
    name: "每日掘金",
    text: "了解社区最新动态，发现最优质文章、最优质的你。",
    tagline: "专注于发掘站内优质创作者和优质内容",
    image: "https://vitepress.dev/vitepress-logo-large.webp",
    actions: [
      { theme: "brand", text: "开始阅读", link: "/overview/index" },
      { theme: "alt", text: "关注掘金", link: "https://juejin.cn/user/2819602825362840" },
    ],
    features: [
      { icon: "🎈", title: "博客平台小助手", details: "同步一流技术社区专属文章" },
      { icon: "🎁", title: "数据分析小能手", details: "年月总览统计数据分析" },
      { icon: "🎨", title: "自动化同步数据库", details: "每日自动化检查并更新" },
    ],
    nav: ["overview", "column", "category", "tag", "annual", "follow"],
    socialLinks: {
      github: "https://github.com/TeaTools/auto-sync-blog",
      // discord: "/",
      // facebook: "",
      // linkedin: "",
      // twitter: "/",
      // youtube: "/",
    },
  },

  // 掘金
  juejin: {
    userId: "2819602825362840",
    columnsIds: [],
  },
}
