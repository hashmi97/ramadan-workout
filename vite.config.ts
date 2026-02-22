import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'html-base',
      transformIndexHtml(html) {
        if (process.env.NODE_ENV === 'production') {
          return html.replace(
            '<head>',
            '<head>\n    <base href="/ramadan-workout/">'
          )
        }
        return html
      },
    },
  ],
  base: process.env.NODE_ENV === 'production' ? '/ramadan-workout/' : '/',
})
