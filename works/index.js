import { processVitePressConfig } from "./generator/vitepress/vitepress.generator.js"
import { processVitePressIndexMD } from "./generator/vitepress/index.md.generator.js"
import { processOverviewMD } from "./generator/juejin/overview.md.generator.js"


await processVitePressConfig([
  { text: 'Item A', link: '/item-1' },
  { text: 'Item B', link: '/item-2' },
  { text: 'Item C', link: '/item-3' }
])

await processVitePressIndexMD()

await processOverviewMD()
