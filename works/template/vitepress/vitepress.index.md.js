// vitepress 主页 markdown 模板
export default `---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: {{ name }}
  text: {{ text }}
  tagline: {{ tagline }}
  image: {{ image }}
  actions: {{ actions }}

features: {{ features }}
---
`

export const actionTemplate = `
    - theme: {{ theme }}
      text: {{ text }}
      link: {{ link }}`

export const featureTemplate = `
  - title: {{ title }}
    details: {{ details }}`
