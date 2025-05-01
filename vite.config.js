import react from "@vitejs/plugin-react"
import dotenv from "dotenv"
import path from "path"
import sass from "sass"
import { defineConfig } from "vite"
import eslint from "vite-plugin-eslint"

// https://vitejs.dev/config/

dotenv.config()

export default defineConfig({
  base: "/",
  server: { port: 8080 },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@hooks': path.resolve(__dirname, 'src/hooks')
    }
  },
  plugins: [react(), sass, eslint()]
})
