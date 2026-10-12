/**
 * 统一的后端请求封装（样板，不用改，看懂就行）。
 *
 * 知识点：浏览器原生 fetch 发 HTTP 请求，配合 async/await 用。
 * - fetch('/api/runs?limit=50') 返回 Promise → await 拿到 Response
 * - response.ok 是 true 表示 HTTP 2xx；404/500 会走到 else 抛错
 * - response.json() 把响应体解析成 JS 对象（对应后端 Jackson 吐的 JSON）
 *
 * 路径写 /api/xxx 而不是 http://localhost:8081/api/xxx：
 * 开发时 Vite 代理会转发（见 vite.config.js），所以不用关心后端在哪个端口。
 */

/** 拿最近 N 轮巡检的批次列表，对应后端 GET /api/runs */
export async function fetchRuns(limit = 50) {
  const resp = await fetch(`/api/runs?limit=${limit}`)
  if (!resp.ok) throw new Error(`查询巡检历史失败：HTTP ${resp.status}`)
  return resp.json()  // [{id, startedAt, finishedAt, total, passed, failed, triggerType}, ...]
}

/** 拿某一轮的完整明细（批次 + 每条用例的结果），对应后端 GET /api/runs/{id} */
export async function fetchRunDetail(id) {
  const resp = await fetch(`/api/runs/${id}`)
  if (!resp.ok) throw new Error(`查询明细失败：HTTP ${resp.status}`)
  return resp.json()  // {run: {...}, results: [{caseName, httpStatus, latencyMs, passed, ...}, ...]}
}

/** 手动触发一轮巡检，对应后端 POST /api/patrol/run，返回刚跑完的这轮明细 */
export async function triggerPatrol() {
  const resp = await fetch('/api/patrol/run', { method: 'POST' })
  if (!resp.ok) throw new Error(`触发巡检失败：HTTP ${resp.status}`)
  return resp.json()
}
