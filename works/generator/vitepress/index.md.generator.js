import { replaceKeywords } from "../../utils/template-process.js"
import { homeTemplate, actionTemplate, featureTemplate, teamTemplate } from "../../template/index.js"
import configurations from "../../../configurations.js"
import { mkdirp } from "mkdirp"
import { DOCS_FILE_PATH } from "../../../build/config.base.js"
import { writeFileSync } from "fs"

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
    md += replaceKeywords(teamTemplate, (key) => (key === "members" ? JSON.stringify(press.members) : ""))
  }

  await mkdirp(DOCS_FILE_PATH)

  writeFileSync(`${DOCS_FILE_PATH}/index.md`, md, (err) => {
    if (err) throw err
    console.log("vitepress index.md 写入成功~")
  })
}
