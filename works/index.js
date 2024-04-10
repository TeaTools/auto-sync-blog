import { processColumnsOverview, processVitePressConfig, processVitePressTheme } from "./generator/index.js"
import { processVitePressIndexMD, processOverviewMD, processYearsPage } from "./generator/index.js"

// 注意生成顺序
await processVitePressIndexMD()

await processOverviewMD()

await processColumnsOverview()

await processYearsPage()

// 生成 vite press 配置
await processVitePressConfig()
await processVitePressTheme()
