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
                text: '重要的计划(Todo)',
                link: '/todo/todo'
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
                    },
                    {
                        text: '实用技巧',
                        link: '/skill'
                    }
                ]
            },
            {
                text: '项目',
                items: [{
                        text: '去哪儿旅行',
                        link: 'https://github.com/251205668/Travel'
                    },
                    {
                        text: '饿了么外卖前台',
                        link: 'https://github.com/251205668/restaurant'
                    },
                    {
                        text: '魔法音乐App',
                        link: 'https://github.com/251205668/mymusic'
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
            '/guide/': getGuideSidebar('基础', 'vue2.5仿去哪儿旅行项目', 'vue2.5制作仿qq音乐项目'),
            '/todo/': gettodoSidebar('计划')

        },
        repo: '251205668',
        repoLabel: 'Github',
        docsRepo: '251205668/vuepressdemo',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: '在github上编辑此页'
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
                'singer',
                'listview',
                '映射表',
                'axios'

            ]
        }

    ]
}

function gettodoSidebar(group) {
    return [{
            title: group,
            collapsable: false,
            children: [
                'todo'
            ]
        }

    ]
}