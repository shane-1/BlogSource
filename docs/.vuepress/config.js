module.exports = {
    title: 'Viva la Vida',  // 设置网站标题
    description : 'Romain Rolland',
    //图标
    smoothScroll: true,
    head: [
        ["link", { rel:"icon", href:"/logo.png"}],
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
          {text:'CMD Manual',link:'/Note/Cmd.md'}
        ]},
        { 
          text: 'Java', 
          items :[
            {text:'Java基础',link:'/Java/Java.md'},
            {text:'Spring',link:'/Java/Spring.md'},
            {text:'深入解析Java反射',link:'/Java/Reflection.md'},
            {text:'DesignPattern',link:'/Java/DesignPattern.md'},
            {text:'Multithread',link:'/Java/Multithread.md'}
        ]},
        {
            text: 'ALGO', 
            items  :[
              {text:'KMP',link:'/ALGO/KMP.md'}
                                    ]},
        {  text: 'Python', 
          items :[
            {text:'The Zen of Python',link:'/Python/ZenOfPython.md'}
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
    plugins: [
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
    ],
  }
    //google-analytics
    // ,
    // plugins: [
    //   [
    //     '@vuepress/google-analytics',
    //     {
    //       'ga': '' // UA-00000000-0
    //     }
    //   ]
    // ]

 