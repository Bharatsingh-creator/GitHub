import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or @vitejs/plugin-vue
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // This is the new way for Tailwind 4
  ],
})