export default {
  // blog 基础配置
  blog: {
    title: "MiyueFE's blog",
    description: "专注于发掘站内优质创作者和优质内容",
    logo: "https://miyuefe.cn/assets/images/logo.svg",
    siteName: "tea.juejindev.com",
    head: [],
    keywords: ["前端", "后端", "移动端", "每日掘金", "酱酱的下午茶", "掘金", "掘金酱"],
    author: "TeaTools,MiyueFE",
  },

  // vite press 构建配置
  press: {
    name: "MiyueFE",
    text: "专注于 Web 前端的菜鸟开发",
    tagline: "",
    image: "https://vitepress.dev/vitepress-logo-large.webp",
    actions: [
      { theme: "brand", text: "开始阅读", link: "/overview/index" },
      { theme: "alt", text: "关注掘金", link: "https://juejin.cn/user/747323639208391" },
    ],
    features: [
      { icon: "🎈", title: "Vue", details: "" },
      { icon: "🎁", title: "Bpmn", details: "" },
      { icon: "🎨", title: "CSS", details: "" },
    ],

    // ["column", "category", "tag", "annual", "follow"]
    // column：专栏；category：文章分类；tag：标签；annual：年度分类；follow：跳转掘金主页
    nav: ["column", "category", "ranking", "annual", "follow"],

    socialLinks: {
      github: "https://github.com/TeaTools/auto-sync-blog",
      // discord: "/",
      // facebook: "",
      // linkedin: "",
      // twitter: "/",
      // youtube: "/",
    },

    // # https://vitepress.dev/zh/reference/default-theme-team-page
    showTeam: false,
    members: [
      {
        avatar: "https://miyuefe.cn/assets/images/logo.svg",
        name: "MiyueFE",
        title: "Creator",
        links: {
          github: "https://github.com/miyuesc",
          home: "https://miyuefe.cn",
          juejin: "https://juejin.cn/user/747323639208391",
        },
      },
      {
        avatar: "https://p6-passport.byteacctimg.com/img/user-avatar/db3b09f9ca107d8843cee3fe8f4f0cd4~120x120.awebp",
        name: "南方者",
        title: "Creator",
        links: {
          github: "https://github.com/NanFangZhe404",
          home: "https://blog.nanfangzhe.cn/",
          juejin: "https://juejin.cn/user/2840793779295133",
        },
      },
      {
        avatar: "https://p6-passport.byteacctimg.com/img/user-avatar/6cd5915df47110ea932c1a1910569532~120x120.awebp",
        name: "Captaincc",
        title: "Contributor",
        links: {
          github: "https://github.com/captainfod",
          juejin: "https://juejin.cn/user/3052665287739005",
        },
      },
      {
        avatar: "https://p6-passport.byteacctimg.com/img/user-avatar/4206063bb939c2fa4042904efc95e10b~120x120.awebp",
        name: "Ylimhs",
        title: "Contributor",
        links: {
          github: "https://github.com/Ylimhs",
          juejin: "https://juejin.cn/user/2999123452115005",
        },
      },
      {
        avatar: "https://p6-passport.byteacctimg.com/img/user-avatar/a2f2b8afcf3908c6f0707b216f1f4408~120x120.awebp",
        name: "北洋",
        title: "Contributor",
        links: {
          github: "https://github.com/wuyangting",
          juejin: "https://juejin.cn/user/2163480089612877",
        },
      },
      {
        avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/f3c0335559b4f202ddb10c41e4767c0a~120x120.awebp",
        name: "战场小包",
        title: "Contributor",
        links: {
          github: "https://github.com/zcxiaobao",
          home: "https://zcxiaobao.github.io/front-end-engineering-handbook/",
          juejin: "https://juejin.cn/user/4424090519078430",
        },
      },
      {
        avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/51193d11e87c7530444651a8938d4568~120x120.awebp",
        name: "ReganYue",
        title: "Contributor",
        links: {
          github: "https://github.com/ReganYue",
          juejin: "https://juejin.cn/user/3008695929418318",
        },
      },
    ],
  },

  // 掘金
  juejin: {
    userId: "747323639208391",
    columnsIds: [],
  },
}
