export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    }
  },
  seo: {
    siteName: 'STFC Early Careers Code Club'
  },
  header: {
    title: 'STFC ECCC',
    to: '/',
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/STFC-Early-Careers-Code-Club',
      'target': '_blank',
      'aria-label': 'GitHub'
    }]
  },
  footer: {
    credits: `STFC • © ${new Date().getFullYear()}`,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/STFC-Early-Careers-Code-Club',
      'target': '_blank',
      'aria-label': 'STFC Early Careers GitHub'
    }]
  },
  toc: {
    title: 'Table of Contents',
    // bottom: {
    //   title: 'Community',
    //   edit: 'https://github.com/nuxt-ui-templates/docs/edit/main/content',
    //   links: [{
    //     icon: 'i-lucide-star',
    //     label: 'Star on GitHub',
    //     to: 'https://github.com/nuxt/ui',
    //     target: '_blank'
    //   }, {
    //     icon: 'i-lucide-book-open',
    //     label: 'Nuxt UI docs',
    //     to: 'https://ui.nuxt.com/docs/getting-started/installation/nuxt',
    //     target: '_blank'
    //   }]
    // }
  }
})
