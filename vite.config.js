import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from "sass"
import dotenv from 'dotenv'
// https://vitejs.dev/config/

dotenv.config();

export default defineConfig({
  base:"/",
  plugins: [react(),sass],

})
