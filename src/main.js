import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Day 5 知识点：Vue 应用的入口。三行干三件事：
// 1. createApp(App) —— 用根组件 App.vue 创建一个应用实例
// 2. .mount('#app') —— 把它挂载到 index.html 里 id="app" 的那个 div 上
// 3. 之后页面上你看到的一切，都是 App.vue 渲染出来的
createApp(App).mount('#app')
