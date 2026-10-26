// ============================================================
// client.js — Apple Liquid Glass 交互层
//   1. 注入 visionOS 式柔和极光背景（纯 CSS 动画，零 JS 帧循环）
//   2. 阅读进度条 + 导航栏滚动态
//   3. 指针跟随的镜面高光（rAF 节流，仅写 2 个 CSS 变量）
//   4. 丝滑页面过渡（View Transitions API，带 CSS 降级）
// 无常驻 requestAnimationFrame；所有重动画只走合成属性。
// ============================================================

import { defineClientConfig } from 'vuepress/client'
import { onMounted, onUnmounted } from 'vue'

const prefersReducedMotion = () =>
  typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ============================================================
// 1. 环境极光背景（一次性注入，动画由 CSS 承担）
// ============================================================
function injectAmbient() {
  if (typeof document === 'undefined' || document.querySelector('.ambient'))
    return
  if (prefersReducedMotion())
    return
  const ambient = document.createElement('div')
  ambient.className = 'ambient'
  ambient.setAttribute('aria-hidden', 'true')
  ambient.innerHTML =
    '<i class="aurora a1"></i><i class="aurora a2"></i><i class="aurora a3"></i>'
  document.body.prepend(ambient)
}

// ============================================================
// 2. 阅读进度条 + 导航栏滚动态
// ============================================================
let progressBar = null
let ticking = false
const DOCK_THRESHOLD = 24

function ensureProgressBar() {
  if (!progressBar) {
    progressBar = document.createElement('div')
    progressBar.className = 'read-progress'
    progressBar.setAttribute('aria-hidden', 'true')
    document.body.appendChild(progressBar)
  }
}

function onScroll() {
  if (typeof window === 'undefined' || ticking)
    return
  ticking = true
  requestAnimationFrame(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const ratio = docHeight > 0 ? scrollTop / docHeight : 0
    if (progressBar)
      progressBar.style.width = `${Math.min(ratio * 100, 100)}%`
    const navbar = document.querySelector('.vp-navbar')
    if (navbar)
      navbar.classList.toggle('navbar-scrolled', scrollTop > DOCK_THRESHOLD)
    ticking = false
  })
}

// ============================================================
// 3. 指针跟随镜面高光（事件委托 + rAF 节流）
// ============================================================
const SHEEN_SELECTOR = [
  '.vp-feature',
  '.vp-hero-action-button',
  '.vp-back-to-top-button',
  '.back-to-top',
  '.vp-navbar-dropdown',
  '.vp-page-nav-item',
].join(',')

let sheenTarget = null
let sheenX = 0
let sheenY = 0
let sheenQueued = false
let sheenFinePointer = false

function onGlassPointer(e) {
  let el = e.target.closest?.(SHEEN_SELECTOR)
  // 导航栏单独追踪高光：需要 --mx/--my 变量，但不能加 .glass-live
  // （glass-live 的 overflow:hidden 会裁掉下拉菜单）
  if (!el)
    el = e.target.closest?.('.vp-navbar')
  if (!el) {
    sheenTarget = null
    return
  }
  const rect = el.getBoundingClientRect()
  sheenTarget = el
  sheenX = e.clientX - rect.left
  sheenY = e.clientY - rect.top
  if (!sheenQueued) {
    sheenQueued = true
    requestAnimationFrame(applySheen)
  }
}

function applySheen() {
  sheenQueued = false
  if (sheenTarget) {
    // 用整数像素，避免高频样式抖动；变量为 px，配合 radial-gradient
    sheenTarget.style.setProperty('--mx', `${Math.round(sheenX)}px`)
    sheenTarget.style.setProperty('--my', `${Math.round(sheenY)}px`)
  }
}

// 给当前页面内的玻璃表面打上 .glass-live（路由切换后重新标记）
// 注意：SSR 阶段没有 document，必须先短路
function markGlassLive(root) {
  if (typeof document === 'undefined')
    return
  root = root || document
  root.querySelectorAll?.(SHEEN_SELECTOR).forEach((el) => {
    el.classList.add('glass-live')
  })
}

// ============================================================
// 4. 丝滑页面过渡
// ============================================================
const supportsVT =
  typeof document !== 'undefined' && typeof document.startViewTransition === 'function'

// 不支持 View Transitions 时的降级：内容区入场
function playPageEnter() {
  if (prefersReducedMotion())
    return
  const host = document.querySelector('.vp-page') || document.querySelector('main.page')
  if (!host)
    return
  host.classList.remove('page-enter')
  // 强制重排以重启动画
  void host.offsetWidth
  host.classList.add('page-enter')
}

// ============================================================
// 生命周期
// ============================================================
function init() {
  injectAmbient()
  ensureProgressBar()
  sheenFinePointer =
    window.matchMedia && window.matchMedia('(pointer: fine)').matches
  onScroll()
  markGlassLive()
  window.addEventListener('scroll', onScroll, { passive: true })
  if (sheenFinePointer && !prefersReducedMotion())
    document.addEventListener('pointermove', onGlassPointer, { passive: true })
}

function cleanup() {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('pointermove', onGlassPointer)
}

export default defineClientConfig({
  setup() {
    onMounted(init)
    onUnmounted(cleanup)
  },
  enhance({ router }) {
    // 首屏（START_LOCATION：from.name 为 null 且未匹配任何路由）不做过渡，
    // 浏览器前进后退 / 刷新后的初始渲染也不闪；之后的所有 SPA 导航都丝滑过渡。
    if (supportsVT) {
      router.beforeEach((to, from, next) => {
        const isInitial = !from
          || (from.name == null && (!from.matched || from.matched.length === 0))
        if (
          prefersReducedMotion()
          || isInitial
          || from.fullPath === to.fullPath
        ) {
          next()
          return
        }
        // 让路由切换发生在 View Transition 快照内，旧页面淡出、新页面浮入
        const transition = document.startViewTransition(
          () =>
            new Promise((resolve) => {
              next()
              requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
            }),
        )
        transition.finished.catch(() => {})
      })
    }

    router.afterEach(() => {
      // SSR 渲染阶段没有浏览器环境，跳过一切客户端副作用
      if (typeof window === 'undefined')
        return
      onScroll()
      // 新页面挂载后标记玻璃；不支持 VT 时再播放降级入场
      requestAnimationFrame(() => {
        markGlassLive()
        if (!supportsVT)
          playPageEnter()
      })
    })
  },
})
