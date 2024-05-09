export default {
  // blog 基础配置
  blog: {
    title: "LinDaiDai_霖呆呆's blog",
    description: "专注于 Web 前端的菜鸟开发",
    logo: "https://p3-passport.byteacctimg.com/img/user-avatar/e2e5305d72f7b8df043774fed23ad6f6~120x120.awebp",
    siteName: "miyuefe.cn",
    head: [],
    keywords: ["前端", "Vue", "JavaScript", "TypeScript", "HTML", "CSS", "MiyueFE"],
    author: "TeaTools,MiyueFE",
  },

  // vite press 构建配置
  press: {
    name: "LinDaiDai_霖呆呆",
    text: "专注于 Web 前端的菜鸟开发",
    tagline: "",
    image: "https://vitepress.dev/vitepress-logo-large.webp",
    actions: [
      { theme: "brand", text: "开始阅读", link: "/overview/index" },
      { theme: "alt", text: "个人主页", link: "https://miyuefe.cn" },
      { theme: "alt", text: "关注掘金", link: "https://juejin.cn/user/747323639208391" },
    ],
    features: [
      { icon: "🎈", title: "Vue", details: "" },
      { icon: "🎁", title: "Bpmn", details: "" },
      { icon: "🎨", title: "CSS", details: "" },
    ],

    nav: ["column", "category", "ranking", "annual", "follow", "recent"],

    socialLinks: {
      github: "https://github.com/miyuesc/auto-sync-blog",
    },

    showTeam: false,
  },

  // 掘金
  juejin: {
    userId: "360295513463912",
  },
}
