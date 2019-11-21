module.exports = {
    title: ' Technical Document',
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
                text: '电子书',
                items: [{
                        text: '前端',
                        link: '/about'
                    },
                    {
                        text: '服务端',
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
            '/guide/': getGuideSidebar('基础', 'vue2.5仿去哪儿旅行项目', 'vue2.5制作仿qq音乐项目')
        },
        repo: '251205668/vuepressdemo',
        repoLabel: 'Github',
        docsRepo: '251205668/vuepressdemo',
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
                'ES6demo1',
                'ES6demo2',
                'ES6demo3',
                'ES6demo4',
                'ES6demo5',
                'ES6demo6'


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
                'tab',
                'jsonp',
                'getrecommends',
                'Cswiper',
                'recommend',
                'loading',
                'singer'
            ]
        }

    ]
}