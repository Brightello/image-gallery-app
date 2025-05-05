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
      "@components": path.resolve(__dirname, "./src/components"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@context": path.resolve(__dirname, "./src/context"),
      "#firebase": path.resolve(__dirname, "./src/firebase"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils")
    }
  },
  plugins: [react(), sass, eslint({ failOnWarning: false, failOnError: true })]
})
