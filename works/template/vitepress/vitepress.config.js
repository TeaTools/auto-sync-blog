// vitepress 配置文件模板
export const vitePressConfigJs =  `import { defineConfig } from "vitepress"

export default defineConfig({
  title: "{{ name }}",
  appearance: "dark",
  description: "{{ description }}",
  locales: {
    root: {
      label: "简体中文",
      link: "/",
      lang: "zh-CN",
    },
  },
  srcDir: "src",
  head: {{ head }},
  themeConfig: {
    logo: "{{ logo }}",
    search: { provider: "local" },
    outline: "deep",
    nav: {{ nav }},
    socialLinks: {{ socialLinks }},
    footer: {
      copyright: \`Copyright © 2023-\${new Date().getFullYear()} {{author}}\`,
      message: "Released under the MIT License.",
    },
  },
  vite: {
    ssr: {
      noExternal: [
        "@nolebase/vitepress-plugin-enhanced-readabilities",
      ],
    },
  },
})
`
