// import * as fs from "fs"
import configurations from "../../../configurations.js"
import vitePressConfig from "../../template/vitepress/vitepress.config.js"
import { JUEJIN_USER_URL } from "../../website/juejin.js"
import { replaceKeywords } from "../../utils/template-process.js"

const NAV_LINKS = {
  overview: {
    text: "总览",
    link: "/sort/all",
  },
  annual: {
    text: "年度",
    items: [],
  },
  column: {
    text: "专栏",
    link: "/categories/专栏/",
  },
  follow: {
    text: "关注",
    link: "",
  },
}

const processNavBar = (usedNav = [], userId, annualList) => {
  const nav = []
  for (const usedNavElement of usedNav) {
    const navLink = NAV_LINKS[usedNavElement]
    if (usedNavElement === "annual") {
      navLink.items = annualList
    } else if (usedNavElement === "follow") {
      navLink.link = `${JUEJIN_USER_URL}${userId}`
    }
    nav.push(navLink)
  }
  return nav
}

const processSocialLinks = (press) => {
  const socialLinks = press.socialLinks
  const usedSocial = Object.keys(socialLinks)
  return usedSocial.map((key) => ({
    icon: key,
    link: socialLinks[key],
  }))
}

const processPressHead = (blog) => {
  const STATIC_HEAD = [
    ["link", { rel: "icon", href: blog.logo }],
    ["meta", { name: "description", content: blog.description }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh-CN" }],
    ["meta", { property: "og:title", content: blog.title }],
    ["meta", { property: "og:author", content: blog.author }],
    ["meta", { property: "og:site_name", content: blog.siteName }],
  ]

  const head = [...STATIC_HEAD]

  if (blog.head && blog.head.length) {
    head.push(...blog.head)
  }
  if (blog.keywords && blog.keywords.length) {
    head.push(["meta", { property: "keywords", content: blog.keywords.join(",") }])
  }

  return head
}

export const processVitePressConfig = (annualList) => {
  const { press, blog, juejin } = configurations

  const replacer = (key) => {
    if (key === "nav") {
      return JSON.stringify(processNavBar(press.nav, juejin.userId, annualList))
    } else if (key === "socialLinks") {
      return JSON.stringify(processSocialLinks(press), null, 2)
    } else if (key === "head") {
      return JSON.stringify(processPressHead(blog), null, 2)
    } else {
      return blog[key] || press[key] || key
    }
  }

  const config = replaceKeywords(vitePressConfig, replacer)

  console.log(config)
}
