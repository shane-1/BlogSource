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
// 3.5 Dock 图标化导航：把文字菜单替换为语义图标（节约面积、缩放不溢出）
// 原文字保留在 <span class="nav-label"> 内（可访问性 + hover 提示），
// Dock 态由 CSS 隐藏文字、仅显示图标；顶部态图标 + 文字并存。
// ============================================================
const NAV_ICONS = {
  home:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  note:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  opensource:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  java:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M16 11h2a3 3 0 0 1 0 6h-2"/><path d="M7 4l1 2M11 4l1 2M15 4l1 2"/></svg>',
  cloud:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
  algo:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  phil:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  meme:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
  github:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.38-2.24-.26-4.6-1.15-4.6-5.11 0-1.13.4-2.05 1.04-2.77-.1-.26-.45-1.31.1-2.73 0 0 .85-.28 2.78 1.06a9.45 9.45 0 0 1 5.06 0c1.93-1.34 2.78-1.06 2.78-1.06.55 1.42.2 2.47.1 2.73.65.72 1.04 1.64 1.04 2.77 0 3.96-2.36 4.85-4.6 5.11.36.32.68.94.68 1.9v2.83c0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"/></svg>',
}

function injectNavIcons(root) {
  if (typeof document === 'undefined')
    return
  root = root || document
  root.querySelectorAll?.('.vp-navbar-items > .vp-navbar-item').forEach((item) => {
    // 直接链接项取 .auto-link；下拉父项取 .title（保留展开箭头 .arrow）
    const labelEl =
      item.querySelector(':scope > .auto-link')
      || item.querySelector(':scope > .vp-navbar-dropdown-wrapper > .vp-navbar-dropdown-title > .title')
    if (!labelEl || labelEl.querySelector('.nav-icon'))
      return
    const text = (labelEl.textContent || '').trim().toLowerCase()
    const icon = NAV_ICONS[text]
    if (!icon)
      return
    // 原文字保留在 .nav-label（可访问性 + hover 提示），视觉层叠图标
    const svg = document.createElement('span')
    svg.className = 'nav-icon'
    svg.setAttribute('aria-hidden', 'true')
    svg.innerHTML = icon
    const label = document.createElement('span')
    label.className = 'nav-label'
    label.textContent = labelEl.textContent
    labelEl.textContent = ''
    labelEl.appendChild(svg)
    labelEl.appendChild(label)
  })
}

// ============================================================
// 3.6 首页饱满化装饰（惰性注入，缓解视觉空旷）
//  a. hero 下方技术标签胶囊行（贴合站点主题）
//  b. 特性卡顶部语义图标徽章
// 均幂等：已有标记则跳过；SSR 阶段无 document 先短路。
// ============================================================
const TECH_CHIPS = ['Java', 'Spring', 'Docker', 'K8s', 'Cloud', 'ALGO', 'AIGC', 'OpenSource']

const FEATURE_ICONS = [
  { match: '学习笔记', icon: NAV_ICONS.note },
  { match: '私人博客', icon: NAV_ICONS.cloud },
  { match: '个人思考', icon: NAV_ICONS.phil },
]

function injectHomeDecor(root) {
  if (typeof document === 'undefined')
    return
  root = root || document

  // a. hero 标签胶囊行：插在 actions 之后
  const hero = root.querySelector('.vp-hero')
  if (hero && !hero.querySelector('.hero-chips')) {
    const chips = document.createElement('div')
    chips.className = 'hero-chips'
    chips.setAttribute('aria-hidden', 'true')
    chips.innerHTML = TECH_CHIPS.map((c) => `<span class="chip">${c}</span>`).join('')
    const actions = hero.querySelector('.vp-hero-actions')
    if (actions)
      actions.after(chips)
    else
      hero.appendChild(chips)
  }

  // b. 特性卡图标徽章：按标题匹配注入
  root.querySelectorAll('.vp-feature').forEach((card) => {
    if (card.querySelector('.feature-icon'))
      return
    const title = card.querySelector('h2')
    if (!title)
      return
    const matched = FEATURE_ICONS.find(({ match }) =>
      (title.textContent || '').includes(match))
    const icon = matched && matched.icon
    if (!icon)
      return
    const badge = document.createElement('span')
    badge.className = 'feature-icon'
    badge.setAttribute('aria-hidden', 'true')
    badge.innerHTML = icon
    card.prepend(badge)
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
  injectNavIcons()
  injectHomeDecor()
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
      // 新页面挂载后标记玻璃、确保图标注入（幂等）；不支持 VT 时再播放降级入场
      requestAnimationFrame(() => {
        injectNavIcons()
        injectHomeDecor()
        markGlassLive()
        if (!supportsVT)
          playPageEnter()
      })
    })
  },
})
