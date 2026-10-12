<script setup>
/**
 * Day 5 主战场。这是你的第一个 Vue 组件，骨架已搭好，TODO 归你。
 *
 * Vue 组件三段式（每天都会见到，先混个脸熟）：
 *   <script setup> —— 逻辑：数据从哪来、怎么变
 *   <template>     —— 长相：HTML 骨架 + {{ }} 插值 + v-for/v-if 指令
 *   <style scoped> —— 样式：只管自己这个组件，不污染别人
 *
 * 数据流一句话：api.js 里 fetchRuns() 拿到后端 JSON → 存进 ref → 模板自动重渲染。
 * 「ref 变了，页面跟着变」就是 Vue 的核心卖点，术语叫响应式。
 */
import { fetchRuns, fetchRunDetail } from './api.js'
import RunChart from './components/RunChart.vue'

// ---------- TODO-1：统计卡片的数据 ----------
// 需要三份状态，都用 ref() 包起来（ref = 响应式的变量盒子，.value 读写）
// 1. runs        —— 最近 50 轮列表（fetchRuns(50) 的返回值），初始 []
// 2. latestDetail —— 最新一轮的明细（fetchRunDetail(最新一轮的id)），初始 null
// 3. loading     —— 加载中标记，初始 true，数据到手后设 false
// 提示：const runs = ref([])
// 在这里写 ↓
const runs=ref([])
const latestDetail=ref(null)
const loading=ref(true)

// ---------- TODO-2：页面挂载后自动加载数据 ----------
// onMounted(() => { ... }) 的意思：组件渲染完成后执行一次，发请求的时机就在这。
// 流程：
//   1. const list = await fetchRuns(50)  存进 runs.value
//   2. 如果 list 非空：const first = list[0]（最近一轮在最前，后端已倒序）
//      latestDetail.value = await fetchRunDetail(first.id)
//   3. loading.value = false
//   4. 整个流程用 try { ... } catch (e) { alert(e.message) } 兜底
// 在这里写 ↓
onMounted(async () => {
                      try {
                        runs.value = await fetchRuns(50)
                        if (runs.value.length > 0) {
                          latestDetail.value = await fetchRunDetail(runs.value[0].id)
                        }
                      } catch (e) {
                        alert(e.message)
                      } finally {
                        loading.value = false
                      }
                    })


// ---------- TODO-3：给图表组件喂失败原因列表（明天图表部分用，今天先跳过） ----------
// 大屏失败列表要展示 latestDetail.results 里 passed === false 的条目
// 提示：computed(() => ...) 是「自动跟随依赖重算的值」
// 在这里写 ↓
 const failedItems = computed(() => {
   if (!latestDetail.value) return []
   return latestDetail.value.results.filter(r => !r.passed)
 })


// ---------- 图表（明天做，今天看看长什么样就行） ----------
const chartRuns = ref([])
</script>

<template>
  <div class="dashboard">
    <header>
      <h1>接口巡检机器人 · 监控大屏</h1>
      <p class="subtitle">定时巡检 → 断言 → 落库 → 本页展示</p>
    </header>

    <!-- loading 时显示的内容；v-if 是条件渲染指令 -->
    <p v-if="loading" class="loading">加载中……</p>

    <!-- TODO-4（template 部分）：统计卡片行 -->
    <!-- 要求：loading 为 false 时显示一行三张卡片：
         ① 最新一轮时间 latestDetail.run.finishedAt
         ② 通过数 latestDetail.run.passed
         ③ 失败数 latestDetail.run.failed
         每张卡片结构参考下面的示例卡片，改成自己的数据（注意 v-if 条件要能防 latestDetail 为 null）-->
        <div v-if="!loading && latestDetail" class="cards">
          <div class="panel card">
            <div class="panel-title">最新一轮完成时间</div>
            <div class="card-value">{{ latestDetail.run.finishedAt }}</div>
          </div>
          <div class="panel card">
            <div class="panel-title">通过</div>
            <div class="card-value" style="color: #4ade80;">{{ latestDetail.run.passed }}</div>
          </div>
          <div class="panel card">
            <div class="panel-title">失败</div>
            <div class="card-value" style="color: #f87171;">{{ latestDetail.run.failed }}</div>
          </div>
        </div>


    <!-- 图表明天接入：给你留好位置 -->
    <RunChart :runs="chartRuns" />

    <!-- TODO-5（今天可不做）：失败列表
         v-for 遍历失败条目，显示 caseName / httpStatus / failures -->
  </div>
</template>

<style scoped>
.dashboard { max-width: 1100px; margin: 0 auto; padding: 24px; }
header { text-align: center; margin-bottom: 24px; }
h1 { font-size: 22px; }
.subtitle { color: #64748b; font-size: 13px; margin-top: 6px; }
.loading { text-align: center; color: #64748b; padding: 40px 0; }
.cards { display: flex; gap: 16px; margin-bottom: 16px; }
.card { flex: 1; text-align: center; }
.card-value { font-size: 28px; font-weight: 700; }
</style>
