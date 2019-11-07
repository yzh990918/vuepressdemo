module.exports = {
    title: 'Magic take-out restaurant',
    description: 'Hello, restaurant!',
    head: [
        ['link', {
            rel: 'icon',
            href: `/favicon.ico`
        }]
    ],
    dest: './docs/.vuepress/dist',
    ga: '',
    evergreen: true,
    // 配置导航
    themeConfig: {
        nav: [{
                text: '首页',
                link: '/'
            },
            {
                text: '指南',
                link: '/guide/'
            },
            {
                text: '生态',
                items: [{
                        text: '关于',
                        link: '/about'
                    },
                    {
                        text: '友情链接',
                        link: '/contact'
                    }
                ]
            },
            {
                text: 'Languages',
                items: [{
                        text: 'Chinese',
                        link: '/language/chinese'
                    },
                    {
                        text: 'English',
                        link: '/language/english'
                    }
                ]
            },

        ],
        lastUpdated: '上次更新',

        sidebarDepth: 2,
        sidebar: [{
            title: 'Guide',
            collapsable: false,
            children: ['/guide/']
        }],
        repo: '251205668',
        repoLabel: 'Github',
        docsRepo: '251205668',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: '编辑此页'
    },
    plugins: [
        ['@vuepress/back-to-top', true],
        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: true
        }]

    ]
}