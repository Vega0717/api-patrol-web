<script setup>
/**
 * 图表组件（明天 Day 5 第二段的内容，今天不用管，先看懂 props 怎么传）。
 *
 * App.vue 里 <RunChart :runs="chartRuns" /> 的 :runs 是「父传子」：
 * 把父组件的 chartRuns 变量绑给子组件的 props 名叫 runs 的入口。
 * 子组件只管「给我什么我画什么」，不关心数据从哪来——组件拆分的意义就在这。
 */
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  runs: { type: Array, default: () => [] }
})

const chartEl = ref(null)   // template 里 ref="chartEl" 的那个 div，图表画在它里面
let chart = null

onMounted(() => {
  chart = echarts.init(chartEl.value)
  chart.setOption(emptyOption())
})

onBeforeUnmount(() => { chart && chart.dispose() })

// runs 一变就重画（watch = 监听某个数据变化的钩子）
watch(() => props.runs, (runs) => {
  if (!chart || !runs.length) return
  // TODO（明天填）：把 runs 变成折线图的两条线——耗时趋势
  chart.setOption(buildOption(runs))
}, { deep: true })

function emptyOption() {
  return { title: { text: '耗时趋势（等待数据…）', textStyle: { color: '#94a3b8', fontSize: 14 } } }
}

function buildOption(runs) {
  // TODO（明天填）：x 轴 = startedAt 时间，y 轴 = passed/failed 数量或耗时
  return {}
}
</script>

<template>
  <div class="panel">
    <div class="panel-title">巡检趋势</div>
    <div ref="chartEl" class="chart"></div>
  </div>
</template>

<style scoped>
.chart { width: 100%; height: 320px; }
</style>
