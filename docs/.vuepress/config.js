module.exports = {
    title: '王晶南的博客',
    description: '为企业聚智，为创新赋能',
    dest: './dist',
    port: '3345',
	locales: {
		'/': {
			lang: 'zh-CN'
		}
    },
    head: [
        ['link', {rel: 'icon', href: '/images/logo1.png'}],
        ['link', {rel: 'stylesheet', href: '/css/style.css'}],
        ['script', {charset: 'utf-8', src: '/js/main.js'}]
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: require('./nav'), //上导航
        sidebar: require('./sidebar'), //测导航
        navbar:true, // 是否使用导航栏
        sidebarDepth: 2, //识别markdown文件目录深度
        lastUpdated: 'Last Updated', //显示深度
        /*searchMaxSuggestoins: 10,*/
        serviceWorker: {
            updatePopup: {
                message: "有新的内容.",
                buttonText: '更新'
            }
        },
        editLinks: true,
        editLinkText: '在 GitLab 上编辑此页 ！'
    }
}
