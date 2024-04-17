import configurations from "../../../configurations.js"
import { vitePressConfigJs } from "../../template/index.js"
import { JUEJIN_USER_URL } from "../../website/juejin.js"
import { replaceKeywords } from "../../utils/template-process.js"
import { writeFileSync, cpSync } from "fs"
import { CONFIG_FILE_PATH, THEME_FILE_PATH, THEME_SET_FILE_PATH } from "../../../build/config.base.js"
import { mkdirp } from "mkdirp"
import { getArticlesAndColumnsMap } from "../../store/index.js"

const NAV_LINKS = {
  overview: {
    text: "文章总览",
    link: "/overview/index",
  },
  column: {
    text: "我的专栏",
    link: "/columns/index",
  },
  category: {
    text: "我的分类",
    link: "/categories/index",
  },
  tag: {
    text: "我的标签",
    link: "/tags/index",
  },
  ranking: {
    text: "数据排行榜",
    link: "/ranking/index",
  },
  annual: {
    text: "年度统计",
    items: [],
  },
  follow: {
    text: "关注我",
    link: "",
  },
}

const processNavBar = (usedNav = [], userId, annualList) => {
  // 默认具有概览页
  const nav = [NAV_LINKS["overview"]]

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
    ["meta", { name: "viewport", content: "width=device-width,initial-scale=1,user-scalable=no" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
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

export const processVitePressConfig = async (annualList = []) => {
  const { press, blog, juejin } = configurations

  const { yearCollection } = await getArticlesAndColumnsMap()

  for (const [year] of yearCollection) {
    annualList.push({ text: `${year}`, link: `/years/${year}` })
  }

  const replacer = (key) => {
    if (key === "nav") {
      return JSON.stringify(processNavBar(press.nav, juejin.userId, annualList))
    } else if (key === "socialLinks") {
      return JSON.stringify(processSocialLinks(press))
    } else if (key === "head") {
      return JSON.stringify(processPressHead(blog))
    } else {
      return blog[key] || press[key] || key
    }
  }

  const config = replaceKeywords(vitePressConfigJs, replacer)

  await mkdirp(CONFIG_FILE_PATH)

  // 重写该文档（appendFile 是追加并不存在就直接创建）
  await writeFileSync(`${CONFIG_FILE_PATH}/index.js`, config)

  console.log("vitepress config 写入成功~")
}

export const processVitePressTheme = async () => {
  await cpSync(THEME_SET_FILE_PATH, THEME_FILE_PATH, { recursive: true })
  console.log("vitepress theme 复制成功~")
}
