import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './content/**/*.{md,yml,json}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
  ],
}

export default config