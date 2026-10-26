import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  // 设置网站标题
  title: 'Viva la Vida',
  description: 'Romain Rolland',

  bundler: viteBundler(),

  // PWA 插件通过 service worker 处理资源缓存，关闭 prefetch 以避免重复预取
  shouldPrefetch: false,

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/Manifest.json' }],
    ['meta', { name: 'theme-color', content: '#0a0f1c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/rick1.png' }],
    ['link', { rel: 'mask-icon', href: '/rick.svg', color: '#22d3ee' }],
    ['meta', { name: 'msapplication-TileImage', content: '/rick1.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#FFFFFF' }],
  ],

  theme: defaultTheme({
    // 最后更新时间（新版为布尔开关，标签文案用 lastUpdatedText）
    lastUpdated: true,
    lastUpdatedText: 'Last Updated',

    navbar: [
      { text: 'Home', link: '/' },
      {
        text: 'Note',
        children: [
          { text: 'Markdown', link: '/Note/Markdown.md' },
          { text: 'Octave 与 Matlab 的区别', link: '/Note/DBOM.md' },
          { text: 'CMD Manual', link: '/Note/Cmd.md' },
          { text: 'PWA 介绍及快速上手搭建', link: '/Note/PWA.md' },
          { text: 'The Zen of Python', link: '/Note/ZenOfPython.md' },
          { text: 'Windows 编辑 linux 运行错误', link: '/Note/WindowsLinuxError.md' },
          { text: 'Shell 脚本传参方法总结', link: '/Note/Shell.md' },
          { text: 'DDD-领域驱动设计', link: '/Note/DDD.md' },
        ],
      },
      {
        text: 'OpenSource',
        children: [
          { text: 'KeyCloak 保护应用和服务指引', link: '/OpenSource/KeyCloak.md' },
          { text: '开源软件', link: '/OpenSource/OpenSourceSoftware.md' },
          { text: 'Redis', link: '/OpenSource/Redis.md' },
          {
            text: 'MySQL',
            children: [
              { text: 'MySQL', link: '/OpenSource/MySQL/MySQL.md' },
              { text: 'MySQLExplain', link: '/OpenSource/MySQL/MySQLExplain.md' },
              { text: 'MySQL 索引详解', link: '/OpenSource/MySQL/IndexDS.md' },
              { text: 'MySQL 思维导图', link: '/OpenSource/MySQLXM.md' },
            ],
          },
          {
            text: 'Machine Learning',
            children: [
              { text: 'NLP', link: '/OpenSource/ML/NLP.md' },
              { text: 'Tensorflow 环境搭建指南', link: '/OpenSource/ML/TensorflowEnvironment.md' },
              { text: 'Tensorflow 常见报错解决', link: '/OpenSource/ML/TensorflowError.md' },
            ],
          },
        ],
      },
      {
        text: 'Java',
        children: [
          { text: 'Java 基础', link: '/Java/Java.md' },
          { text: '多线程 Multithread', link: '/Java/Multithread.md' },
          { text: '设计模式 DesignPattern', link: '/Java/DesignPattern.md' },
          { text: 'JDBC', link: '/Java/JDBC.md' },
          { text: '框架基础 - 注解和反射', link: '/Java/AnnotationReflection.md' },
          { text: 'Spring', link: '/Java/Spring.md' },
          { text: 'SpringBoot', link: '/Java/SpringBoot.md' },
          { text: 'Mybatis', link: '/Java/Mybatis.md' },
          { text: 'Java 思维导图', link: '/Java/JavaXM.md' },
        ],
      },
      {
        text: 'Cloud',
        children: [
          { text: 'Docker 基础', link: '/Cloud/DockerBase.md' },
          { text: 'K8s 部署 Redis 集群', link: '/Cloud/RedisOnK8s.md' },
          { text: '微服务', link: '/Cloud/Microservices.md' },
          { text: 'AWS', link: '/Cloud/AWS.md' },
          { text: 'Flyway', link: '/Cloud/Flyway.md' },
          { text: 'DevOps 思想', link: '/Cloud/DevOpsThinking.md' },
          { text: '软件架构杂谈', link: '/Cloud/SoftwareArchitecture.md' },
        ],
      },
      {
        text: 'ALGO',
        children: [
          { text: '链表', link: '/ALGO/LinkedList.md' },
          { text: '数组', link: '/ALGO/Array.md' },
          { text: 'KMP', link: '/ALGO/KMP.md' },
          { text: '算法特训', link: '/ALGO/RetreatForSelf-cultivation.md' },
          { text: '卡特兰数', link: '/ALGO/Catalan.md' },
        ],
      },
      {
        text: 'Phil',
        children: [
          { text: '中国为什么没有科学精神', link: '/Phil/WCHNS.md' },
          { text: '从 Internet 说起', link: '/Phil/Internet.md' },
        ],
      },
      { text: 'Meme', link: '/Meme/Meme.md' },
    ],

    logo: '/logo.png',
    logoDark: '/logo_dark.png',
    repo: 'https://github.com/shane-1',
    sidebar: 'auto',

    // 返回顶部已由默认主题内置（themePlugins.backToTop 默认开启），无需单独安装插件

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'https://github.com/shane-1/BlogSource',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 启用编辑链接
    editLink: true,
    editLinkText: 'Edit this page',
  }),

  plugins: [
    // GA 仅在提供真实 GA4 ID（环境变量 VITE_GA_ID，形如 G-XXXXXXX）时启用，
    // 占位 ID 会让插件在 dev 下抛 __GA_OPTIONS__ 未定义并中断页面挂载。
    ...(process.env.VITE_GA_ID
      ? [googleAnalyticsPlugin({ id: process.env.VITE_GA_ID })]
      : []),
    pwaPlugin({
      skipWaiting: true,
      // 原 @vuepress/plugin-pwa-popup 已合并为 pwa 插件的 updatePopup 选项
      updatePopup: {
        message: 'New content is available.',
        buttonText: 'Refresh',
      },
    }),
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        },
      },
    }),
  ],
})
