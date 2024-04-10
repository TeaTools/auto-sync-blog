import { processColumnsOverview, processVitePressConfig } from "./generator/index.js"
import { processVitePressIndexMD } from "./generator/index.js"
import { processOverviewMD } from "./generator/index.js"


await processVitePressConfig([
  { text: 'Item A', link: '/item-1' },
  { text: 'Item B', link: '/item-2' },
  { text: 'Item C', link: '/item-3' }
])
//
// await processVitePressIndexMD()
//
// await processOverviewMD()

await processColumnsOverview()
