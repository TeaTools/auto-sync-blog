import { processColumnsOverview, processVitePressConfig, processVitePressTheme } from "./generator/index.js"
import { processVitePressIndexMD } from "./generator/index.js"
import { processOverviewMD } from "./generator/index.js"

//
await processVitePressIndexMD()

await processOverviewMD()

await processColumnsOverview()

// 生成 vitepress 配置
await processVitePressConfig([
  { text: 'Item A', link: '/item-1' },
  { text: 'Item B', link: '/item-2' },
  { text: 'Item C', link: '/item-3' }
])
await processVitePressTheme()
