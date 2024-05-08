import { replaceKeywords } from "../../utils/template-process.js"
import { homeTemplate, actionTemplate, featureTemplate, teamTemplate } from "../../template/index.js"
import { mkdirp } from "mkdirp"
import { DOCS_FILE_PATH } from "../../../build/config.base.js"
import { writeFileSync } from "fs"
import { getGlobalConfig } from "../../store/configuration/index.js"

const homeIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">' +
  '<path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM8 15V17H16V15H8Z"/>' +
  "</svg>"
const juejinIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 28" fill="currentColor">' +
  '<path d="M17.5875 6.77268L21.8232 3.40505L17.5875 0.00748237L17.5837 0L13.3555 3.39757L17.5837 6.76894L17.5875 6.77268ZM17.5863 17.3955H17.59L28.5161 8.77432L25.5526 6.39453L17.59 12.6808H17.5863L17.5825 12.6845L9.61993 6.40201L6.66016 8.78181L17.5825 17.3992L17.5863 17.3955ZM17.5828 23.2891L17.5865 23.2854L32.2133 11.7456L35.1768 14.1254L28.5238 19.3752L17.5865 28L0.284376 14.3574L0 14.1291L2.95977 11.7531L17.5828 23.2891Z"/>' +
  "</svg>"

const presetIcons = new Set(["github", "discord", "facebook", "linkedin", "twitter", "youtube"])
const customIconsMap = {
  juejin: juejinIcon,
  home: homeIcon,
}

const processAction = (action) => {
  return replaceKeywords(actionTemplate, (key) => action[key] || "")
}

const processFeature = (feature) => {
  let feat = replaceKeywords(featureTemplate, (key) => feature[key] || "")
  if (feature.icon) {
    feat += `\n    icon: ${feature.icon}`
  }
  return feat
}

export const processVitePressIndexMD = async () => {
  const configurations = await getGlobalConfig()

  const { press, blog } = configurations

  const replacer = (key) => {
    if (key === "actions") {
      return press.actions?.map(processAction).join("\n") || ""
    } else if (key === "features") {
      return press.features?.map(processFeature).join("\n") || ""
    } else {
      return blog[key] || press[key] || ""
    }
  }

  let md = replaceKeywords(homeTemplate, replacer)

  if (press.showTeam && press.members?.length) {
    let members = press.members.map((member) => {
      const { avatar, name, title, links: linksMap } = member

      const links = Object.keys(linksMap).map((key) => {
        if (presetIcons.has(key)) {
          return { icon: key, link: linksMap[key] }
        }
        if (customIconsMap[key]) {
          return { icon: { svg: customIconsMap[key] }, link: linksMap[key] }
        }
      })

      return { avatar, name, title, links }
    })

    md += replaceKeywords(teamTemplate, (key) => (key === "members" ? JSON.stringify(members) : ""))
  }

  await mkdirp(DOCS_FILE_PATH)

  await writeFileSync(`${DOCS_FILE_PATH}/index.md`, md)

  console.log("vitepress index.md 写入成功~")
}
