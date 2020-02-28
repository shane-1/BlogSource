module.exports = {
    title: 'Viva la Vida',  // 设置网站标题
    description : 'Romain Rolland',
    //图标
    head: [
        ["link", { rel:"icon", href:"/logo.png"}],
    ],
    themeConfig: {
      lastUpdated:'Last Updated',
      nav: [
        { text: '首页', link: '/' },
        {
           text: 'Note', 
           items  :[
             {text:'Markdown',link:'/Note/markdown.md'},
                       ]},
        { text: 'Python', link: '/Python/' },
        { text: 'ML', link:'/ML/'},
        { text: 'Phil', link:'/Phil/'},
        { text: 'Java', link: '/Java/' },
        { text: 'Meme', link: '/Meme/meme.md' },
        { text: 'Github', link: 'https://github.com/shane-1' },
      ],
      sidebar: 'auto',

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'https://github.com/shane-1/BlogSource/',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'edit',
    // 默认是 false, 设置为 true 来启用
    editLinks: false,
    // 默认为 "Edit this page"
    editLinkText: '帮助我改善此页面！'
        
      
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
  }
    
 