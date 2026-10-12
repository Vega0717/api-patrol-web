import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Day 5 知识点：server.proxy 解决跨域。
// 大屏页面跑在 5173，后端接口在 8081，浏览器默认不允许跨源请求。
// 配了代理后，前端请求 /api/runs，Vite 开发服务器会偷偷转发给 http://localhost:8081/api/runs，
// 浏览器以为一直在跟自己人说话——开发期最省事的跨域方案。
// 注意：这只是开发期的便利，生产部署时用 Nginx 做同样的事（Day 8 再讲）。
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  }
})
