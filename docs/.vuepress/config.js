import { defaultTheme } from '@vuepress/theme-default'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import {pwaPopupPlugin} from '@vuepress/plugin-pwa-popup'
import {KanBanNiang} from '@vuepress-reco/vuepress-plugin-kan-ban-niang'

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
          {text:'Octave与Matlab的区别',link:'/Note/DBOM.md'},
          {text:'CMD Manual',link:'/Note/Cmd.md'},
          {text:'MySQL',link:'/Note/MySQL.md'},
          {text:'MySQLExplain',link:'/Note/MySQLExplain.md'},
          {text:'MySQL索引背后的数据结构及算法原理',link:'/Note/IndexDS.md'},
          {text:'Redis',link:'/Note/Redis.md'},
          {text:'PWA介绍及快速上手搭建',link:'/Note/PWA.md'},
          {text:'The Zen of Python',link:'/Note/ZenOfPython.md'},
          {text:'Windows编辑文件在linux运行错误',link:'/Note/WindowsLinuxError.md'},
          {text:'开源软件',link:'/Note/OpenSourceSoftware.md'},
          {text:'Shell 脚本传参方法总结',link:'/Note/Shell.md'},
          
        ]},
        { 
          text: 'Java', 
          children :[
            {text:'Java基础',link:'/Java/Java.md'},
            {text:'多线程 Multithread',link:'/Java/Multithread.md'},
            {text:'设计模式 DesignPattern',link:'/Java/DesignPattern.md'},
            {text:'JDBC',link:'/Java/JDBC.md'},
            {text:'框架基础-注解和反射',link:'/Java/AnnotationReflection.md'},
            {text:'Spring',link:'/Java/Spring.md'},
            {text:'SpringBoot',link:'/Java/SpringBoot.md'},
            {text:'Mybatis',link:'/Java/Mybatis.md'},
            {text:'DevOps 思想',link:'/Java/DevOpsThinking.md'},
            
        ]},
        {  text: 'Cloud', 
        children :[
            {text:'Docker基础',link:'/Cloud/DockerBase.md'},
            {text:'K8s部署Redis集群',link:'/Cloud/RedisOnK8s.md'},
            {text:'微服务',link:'/Cloud/Microservices.md'},
            {text:'AWS',link:'/Cloud/AWS.md'},
          ]},
        {
            text: 'ALGO', 
            children  :[
              {text:'KMP',link:'/ALGO/KMP.md'},
                                    ]},
        
        { text: 'ML', 
        children :[
            {text:'Tensorflow环境搭建指南',link:'/ML/TensorflowEnvironment.md'},
            {text:'Tensorflow常见报错解决',link:'/ML/TensorflowError.md'}
          ]},
        { text: 'Phil',
        children :[
            {text:'中国为什么没有科学精神', link:'/Phil/WCHNS.md'},
            {text:'ENFP',link:'/Phil/ENFP.md'},
            {text:'从Internet说起',link:'/Phil/Internet.md'}
          ]},
        { text: 'Meme', link: '/Meme/Meme.md' },
      ],
      logo:'/logo.png',
      logoDark:'/logo.png',
      repo:'https://github.com/shane-1',
      sidebar: 'auto',
      back_to_top:'true',

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'https://github.com/shane-1/',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: "blob/master",
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
        KanBanNiang({
          
        })
      ]
  }
