import { defineConfig } from "vitepress"

export default defineConfig({
  title: "每日掘金",
  appearance: "dark",
  description: "专注于发掘站内优质创作者和优质内容",
  locales: {
    root: {
      label: "简体中文",
      link: "/",
      lang: "zh-CN", // 这里修改中文
    },
  },
  srcDir: "src",
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
    [
      "meta",
      {
        name: "apple-mobile-web-app-capable",
        content: "yes",
      },
    ],
    [
      "meta",
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black",
      },
    ],
    [
      "meta",
      {
        name: "keywords",
        content: "前端, 技术文章, 移动端, pc端, 数据库, 后端, 茶博客, 茶工具, TeaTools, {{user_name}}",
      },
    ],
    [
      "link",
      {
        rel: "shortcut icon ",
        type: "images/x-icon",
        href: "{{favicon_ico}}",
      },
    ],
    ["script", {}, `{{baidu_count_url}}`],
    ["link", { rel: "stylesheet", href: "/css/index.css" }],
  ],
  themeConfig: {
    logo: "{{logo_png}}",
    search: { provider: "local" },
    outline: "deep",
    nav: [
      {
        text: "✍️总览",
        link: "/sort/all.html",
      },
      {
        text: "🕙时间",
        items: "{{time_sort_list}}",
      },
      {
        text: "📚专栏",
        link: "/categories/专栏/",
      },
      {
        text: "👣关注",
        link: "{{find_me_url}}",
      },
      {
        text: "💌订阅",
        link: "{{order_column_url}}",
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/miyuesc/chibivue-zh" }],
    footer: {
      copyright: `Copyright © 2023-${new Date().getFullYear()} miyuesc`,
      message: "Released under the MIT License. Source is ubugeeei/chibivue",
    },
  },
  vite: {
    ssr: {
      noExternal: [
        // 如果还有别的依赖需要添加的话，并排填写和配置到这里即可
        "@nolebase/vitepress-plugin-enhanced-readabilities",
      ],
    },
  },
})
