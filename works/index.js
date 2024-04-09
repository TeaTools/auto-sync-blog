import { processVitePressConfig } from "./generator/vitepress/vitepress.generator.js"

processVitePressConfig([
  { text: 'Item A', link: '/item-1' },
  { text: 'Item B', link: '/item-2' },
  { text: 'Item C', link: '/item-3' }
])
