import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
// GitHub Pages 配置说明：
// 1. 如果仓库名为 username.github.io，使用 base: '/'
// 2. 如果仓库名为其他（如 my-website），使用 base: '/my-website/'
export default defineConfig({
  base: '/YixuanLi/',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
