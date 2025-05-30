import { defaultTheme } from '@vuepress/theme-default'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import {pwaPopupPlugin} from '@vuepress/plugin-pwa-popup'
import { searchPlugin } from '@vuepress/plugin-search'

export default {
    title: 'Viva la Vida',  // 设置网站标题
    description : 'Romain Rolland',
    //图标
    smoothScroll: true,
    head: [
        ["link", { rel:"icon", href:"/logo.png"}],
        ['link', { rel: 'manifest', href: '/Manifest.json' }],
    ['meta', { name: 'theme-color', content: '' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/rick1.png' }],
    ['link', { rel: 'mask-icon', href: '/rick.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/rick1.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#FFFFFF' }]
    ],
    theme: defaultTheme({
      lastUpdated:'Last Updated',
      navbar: [
        { text: 'Home', link: '/' },
        {
          text: 'Note', 
          children  :[
          {text:'Markdown',link:'/Note/Markdown.md'},
          {text:'Octave 与 Matlab 的区别',link:'/Note/DBOM.md'},
          {text:'CMD Manual',link:'/Note/Cmd.md'},      
          {text:'PWA 介绍及快速上手搭建',link:'/Note/PWA.md'},
          {text:'The Zen of Python',link:'/Note/ZenOfPython.md'},
          {text:'Windows 编辑 linux 运行错误',link:'/Note/WindowsLinuxError.md'},
          {text:'Shell 脚本传参方法总结',link:'/Note/Shell.md'},
          {text:'DDD-领域驱动设计',link:'/Note/DDD.md'},
         
        ]},
        { text: 'OpenSource',
        children :[
          {text:'KeyCloak 保护应用和服务指引',link:'/OpenSource/keycloak.md'},
          {text:'开源软件',link:'/OpenSource/OpenSourceSoftware.md'},
          {text:'Redis',link:'/OpenSource/Redis.md'},
          { text: 'MySQL',
            children:[
              {text:'MySQL',link:'/OpenSource/MySQL/MySQL.md'},
              {text:'MySQLExplain',link:'/OpenSource/MySQL/MySQLExplain.md'},
              {text:'MySQL 索引详解',link:'/OpenSource/MySQL/IndexDS.md'},
              {text:'MySQL 思维导图',link:'/OpenSource/MySQLXM.md'},
              
            ]
            },
          { text: 'Machine Learning', 
            children :[
                {text:'NLP',link:'/OpenSource/ML/NLP.md'},
                {text:'Tensorflow 环境搭建指南',link:'/OpenSource/ML/TensorflowEnvironment.md'},
                {text:'Tensorflow 常见报错解决',link:'/OpenSource/ML/TensorflowError.md'}
          ]},
          ]},
        { 
          text: 'Java', 
          children :[
            {text:'Java 基础',link:'/Java/Java.md'},
            {text:'多线程 Multithread',link:'/Java/Multithread.md'},
            {text:'设计模式 DesignPattern',link:'/Java/DesignPattern.md'},
            {text:'JDBC',link:'/Java/JDBC.md'},
            {text:'框架基础 - 注解和反射',link:'/Java/AnnotationReflection.md'},
            {text:'Spring',link:'/Java/Spring.md'},
            {text:'SpringBoot',link:'/Java/SpringBoot.md'},
            {text:'Mybatis',link:'/Java/Mybatis.md'},
            {text:'Java 思维导图',link:'/Java/JavaXM.md'},
           
            
        ]},
        {  text: 'Cloud', 
        children :[
            {text:'Docker 基础',link:'/Cloud/DockerBase.md'},
            {text:'K8s 部署 Redis 集群',link:'/Cloud/RedisOnK8s.md'},
            {text:'微服务',link:'/Cloud/Microservices.md'},
            {text:'AWS',link:'/Cloud/AWS.md'},
            {text:'Flyway', link:'/Cloud/Flyway.md'},
            {text:'DevOps 思想',link:'/Cloud/DevOpsThinking.md'},
            {text:'软件架构杂谈',link:'/Cloud/SoftwareArchitecture.md'},
          ]},
        {
            text: 'ALGO', 
            children  :[
              {text:'链表',link:'/ALGO/LinkedList.md'},
              {text:'数组',link:'/ALGO/Array.md'},      
              {text:'KMP',link:'/ALGO/KMP.md'},
              {text:'算法特训',link:'/ALGO/RetreatForSelf-cultivation.md'},
              {text:'卡特兰数',link:'/ALGO/Catalan.md'},
                                    ]},
        
        
        { text: 'Phil',
        children :[
            {text:'中国为什么没有科学精神', link:'/Phil/WCHNS.md'},
            {text:'从 Internet 说起',link:'/Phil/Internet.md'}
          ]},
        { text: 'Meme', link: '/Meme/Meme.md' },
      ],
      logo:'/logo.png',
      logoDark:'/logo_dark.png',
      repo:'https://github.com/shane-1',
      sidebar: 'auto',
      back_to_top:'true',

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'https://github.com/shane-1/BlogSource',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: "master",
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: 'Edit this page'
        
      
    },
    ),
      plugins: [
        backToTopPlugin(),
        googleAnalyticsPlugin({
          // 配置项
          id: 'UA-179730919-1'
        }),
        pwaPlugin({
          // 配置项
          skipWaiting: true,
          // serviceWorker: true,
          // updatePopup: {
          //     message: "有新的内容更新 & Blog has change",
          //     buttonText: "Refresh"
          //   },
        }),
        pwaPopupPlugin({
          locales:{
            '/':{
              message: "New Content is availavle.",
              buttonText: "Refresh"
            }
          }
        }),
        searchPlugin({
          locales: {
            '/': {
              placeholder: 'Search',
            },
            // '/zh/': {
            //   placeholder: '搜索',
            // },
          },
        }),
      ]
  }
