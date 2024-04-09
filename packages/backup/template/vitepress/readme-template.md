---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: {{ blog_name }}
  text: {{ blog_description }}
  tagline: {{ blog_tagline }}
  image: {{ blog_cover_img }}
  actions:
    - theme: brand
      text: 开始 ->
      link: /src/all

features:
  - title: 博客平台小助手🔍
    details: 同步一流技术社区专属文章
  - title: 数据分析小能手🚥
    details: 年月总览统计数据分析
  - title: 自动化同步数据库🎥
    details: 每日自动化检查并更新

---
