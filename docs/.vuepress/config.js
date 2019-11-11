module.exports = {
    title: '努力中的杨先生的技术文档',
    description: 'Magic power!',
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
        sidebar: {
            '/guide/': getGuideSidebar('vue2.5仿美团外卖项目', 'vue2.5仿去哪儿旅行项目', 'vue2.5制作仿qq音乐项目')
        },
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

function getGuideSidebar(groupA, groupB, groupC) {
    return [{
            title: groupA,
            collapsable: false,
            children: [
                '',
                'groupAfirst'

            ]
        },
        {
            title: groupB,
            collapsable: false,
            children: [
                'first'
            ]
        },
        {
            title: groupC,
            collapsable: false,
            children: [
                'begin',
                'C1',
                'C2',
                'header',
                'tab'
            ]
        }

    ]
}