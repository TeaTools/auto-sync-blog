export default {
  // blog 基础配置
  blog: {
    title: "每日掘金",
    description: "专注于发掘站内优质创作者和优质内容",
    logo: "https://p3-passport.byteacctimg.com/img/user-avatar/b72e991ee9b1c9bdca7b2bd4c8dc78a8~300x300.image",
    siteName: "tea.juejindev.com",
    head: [],
    keywords: ["前端", "后端", "移动端", "每日掘金", "酱酱的下午茶", "掘金", "掘金酱"],
    author: "TeaTools,MiyueFE",
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

    // # https://vitepress.dev/zh/reference/default-theme-team-page
    showTeam: true,
    members: [
      {
        avatar: "https://miyuefe.cn/assets/images/logo.svg",
        name: "MiyueFE",
        title: "Creator",
        links: [
          { icon: "github", link: "https://github.com/miyuefe" },
          {
            icon: {
              svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM8 15V17H16V15H8Z"></path></svg>'
            },
            link: "https://miyuefe.cn",
          },
          {
            icon: {
              svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 28" fill="currentColor"><path d="M17.5875 6.77268L21.8232 3.40505L17.5875 0.00748237L17.5837 0L13.3555 3.39757L17.5837 6.76894L17.5875 6.77268ZM17.5863 17.3955H17.59L28.5161 8.77432L25.5526 6.39453L17.59 12.6808H17.5863L17.5825 12.6845L9.61993 6.40201L6.66016 8.78181L17.5825 17.3992L17.5863 17.3955ZM17.5828 23.2891L17.5865 23.2854L32.2133 11.7456L35.1768 14.1254L28.5238 19.3752L17.5865 28L0.284376 14.3574L0 14.1291L2.95977 11.7531L17.5828 23.2891Z"/></svg>'
            },
            link: "https://juejin.cn/user/747323639208391",
          },
        ],
      },
    ],
  },

  // 掘金
  juejin: {
    userId: "2819602825362840",
    columnsIds: [],
  },
}
