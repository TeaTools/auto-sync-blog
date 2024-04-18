import configurations from "../configurations.js"
import {
  processCategoriesOverview,
  processColumnsOverview,
  processRankingList,
  processTagsOverview,
  processVitePressConfig,
  processVitePressTheme,
} from "./generator/index.js"
import { processVitePressIndexMD, processOverviewMD, processYearsPage } from "./generator/index.js"

// 注意生成顺序
await processVitePressIndexMD()

await processOverviewMD()

const { press } = configurations
const navProcessMap = {
  column: processColumnsOverview,
  category: processCategoriesOverview,
  tag: processTagsOverview,
  annual: processYearsPage,
  ranking: processRankingList,
}
for (const navKey of press.nav) {
  navProcessMap[navKey] && (await navProcessMap[navKey]())
}

// 生成 vite press 配置
await processVitePressConfig()
await processVitePressTheme()
