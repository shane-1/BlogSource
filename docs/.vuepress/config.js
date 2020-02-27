module.exports = {
    title: 'Viva la Vida',  // 设置网站标题
    description : 'Romain Rolland',
    //图标
    head: [
        ["link", { rel:"icon", href:"/logo.png"}],
    ],
    themeConfig: {
      nav: [
        { text: '首页', link: '/' },
        { text: 'Note', link: '/Note/Markdown.md' },
        { text: 'Python', link: '/Python/' },
        { text: 'ML', link:'/ML/'},
        { text: 'Phil', link:'/Phil/'},
        { text: 'Java', link: '/Java/' },
        { text: 'Meme', link: '/Meme/meme.md' },
        { text: 'Github', link: 'https://github.com/shane-1' },
      ]
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
    
 