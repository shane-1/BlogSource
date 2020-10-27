module.exports = {
    title: 'Viva la Vida',  // 设置网站标题
    description : 'Romain Rolland',
    //图标
    smoothScroll: true,
    head: [
        ["link", { rel:"icon", href:"/logo.png"}],
        ['link', { rel: 'manifest', href: '/Manifest.json' }],
    ['meta', { name: 'theme-color', content: '                                                                                             ' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/rick1.png' }],
    ['link', { rel: 'mask-icon', href: '/rick.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/rick1.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#FFFFFF' }]
    ],
    themeConfig: {
      lastUpdated:'Last Updated',
      nav: [
        { text: 'Home', link: '/' },
        {
          text: 'Note', 
          items  :[
          {text:'Markdown',link:'/Note/Markdown.md'},
          {text:'Octave与Matlab的区别',link:'/Note/DBOM.md'},
          {text:'CMD Manual',link:'/Note/Cmd.md'},
          {text:'MySQL',link:'/Note/MySQL.md'},
          {text:'MySQL索引背后的数据结构及算法原理',link:'/Note/IndexDS.md'},
          {text:'PWA介绍及快速上手搭建',link:'/Note/PWA.md'},
          {text:'The Zen of Python',link:'/Note/ZenOfPython.md'},
          
        ]},
        { 
          text: 'Java', 
          items :[
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
          items :[
            {text:'Docker基础',link:'/Cloud/DockerBase.md'},
            {text:'微服务',link:'/Cloud/Microservices.md'},
            {text:'AWS',link:'/Cloud/AWS.md'},
          ]},
        {
            text: 'ALGO', 
            items  :[
              {text:'KMP',link:'/ALGO/KMP.md'},
                                    ]},
        
        { text: 'ML', 
          items :[
            {text:'Tensorflow环境搭建指南',link:'/ML/TensorflowEnvironment.md'},
            {text:'Tensorflow常见报错解决',link:'/ML/TensorflowError.md'}
          ]},
        { text: 'Phil',
          items :[
            {text:'中国为什么没有科学精神', link:'/Phil/WCHNS.md'},
            {text:'ENFP',link:'/Phil/ENFP.md'},
            {text:'从Internet说起',link:'/Phil/Internet.md'}
          ]},
        { text: 'Meme', link: '/Meme/Meme.md' },
        { text: 'Github', link: 'https://github.com/shane-1' },
      ],
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
    plugins: ['@vuepress/back-to-top'],
    plugins: [
      ['@vuepress/active-header-links', 
      {
        sidebarLinkSelector: '.sidebar-link',
        headerAnchorSelector: '.header-anchor'
    }],

    [
      '@vuepress/pwa', {
        serviceWorker: true,
        updatePopup: {
            message: "有新的内容更新 & Blog has change",
            buttonText: "Refresh"
          }},
  ],
      [
        'vuepress-plugin-mygitalk', {
          // 是否启用(关闭请设置为false)(default: true)
          enable: true,
          // 是否开启首页评论(default: true)
          home: false,
          // Gitalk配置
          gitalk: {
            // GitHub Application Client ID.
            clientID: '9f1916a40885cbf94d08',
            // GitHub Application Client Secret.
            clientSecret: 'ffa1919b6c8849fa7eb4025e5909c305d5992485',
            // GitHub repository. 存储评论的 repo
            repo: 'shane-1.github.io',
            // GitHub repository 所有者，可以是个人或者组织。
            owner: 'shane-1',
            admin: ['shane-1'],
            // 设置语言(default: zh-CN)
            language: 'zh-CN',
          }
        }
      ],
      [
        '@vuepress/google-analytics',
        {
          'ga': 'UA-179730919-1' // UA-00000000-0
        }
      ]
    ],
  }
