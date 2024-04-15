// vitepress 主页 markdown 模板
export const homeTemplate = `---
layout: home

hero:
  name: {{ name }}
  text: {{ text }}
  tagline: {{ tagline }}
  image: {{ image }}
  actions: {{ actions }}

features: {{ features }}

---
`

export const actionTemplate = `
    - theme: {{ theme }}
      text: {{ text }}
      link: {{ link }}`

export const featureTemplate = `
  - title: {{ title }}
    details: {{ details }}`

export const teamTemplate = `
<script setup>
import { VPTeamMembers, VPTeamPageTitle } from 'vitepress/theme'

const members = {{ members }}
</script>

<VPTeamPageTitle>
  <template #title>
    Our Team
  </template>
</VPTeamPageTitle>

<VPTeamMembers size="small" :members="members" />
`
