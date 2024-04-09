import { processVitePressConfig, processVitePressIndexMD } from "./generator/vitepress/vitepress.generator.js"

await processVitePressConfig([
  { text: 'Item A', link: '/item-1' },
  { text: 'Item B', link: '/item-2' },
  { text: 'Item C', link: '/item-3' }
])

await processVitePressIndexMD()
