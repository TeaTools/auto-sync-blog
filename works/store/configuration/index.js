import configurations from "../../../configurations.js"
import { statSync } from "fs"
import { fileURLToPath } from "url"
import * as path from "path"

let hasUserConfigFile = true
let mergedConfig = null

function slash(path) {
  const isExtendedLengthPath = path.startsWith("\\\\?\\")

  if (isExtendedLengthPath) {
    return path
  }
  return path.replace(/\\/g, "/")
}

const mergeConfig = (target, source) => {
  for (const sourceKey in source) {
    if (!target[sourceKey]) {
      target[sourceKey] = source[sourceKey]
    } else {
      target[sourceKey] = { ...(source[sourceKey] || {}), ...target[sourceKey] }
    }
  }
  return target
}

export const getGlobalConfig = async () => {
  if (mergedConfig) return mergedConfig

  try {
    hasUserConfigFile = !!statSync("./configurations.user.js")
  } catch (e) {
    hasUserConfigFile = false
  }

  if (hasUserConfigFile) {
    const filePath = slash(
      path.normalize(path.relative(path.dirname(fileURLToPath(import.meta.url)), "configurations.user.js")),
    )
    const { default: userConfig } = await import(filePath)

    mergedConfig = mergeConfig(userConfig || {}, configurations)
  } else {
    mergedConfig = configurations
  }

  return mergedConfig
}
