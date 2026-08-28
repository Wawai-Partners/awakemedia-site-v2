import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Deployed to https://wawai-partners.github.io/awakemedia-site-v2/, so every
// generated asset URL needs the repository name as its prefix.
export default defineConfig({
  base: '/awakemedia-site-v2/',
  plugins: [react(), tailwindcss()],
})
