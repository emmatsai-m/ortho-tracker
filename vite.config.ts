import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// base 必須和 GitHub 倉庫名稱一致，網址才會是 https://emmatsai-m.github.io/ortho-tracker/
export default defineConfig({
  base: '/ortho-tracker/',
  plugins: [react(), tailwindcss()],
})
