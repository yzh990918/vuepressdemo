module.exports = {
  title: '技术文档',
  description: '魔法的力量!',
  locales: {
    '/': {
      lang: 'ZH',
      title: '技术文档',
      description: '魔法的力量!'
    },
    '/es/': {
      lang: 'es',
      title: 'Technical Document',
      description: 'Magic power!'
    }
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: `/favicon.ico`
      }
    ]
  ],
  dest: './docs/.vuepress/dist',
  evergreen: true,
  // 配置导航
  themeConfig: {
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在github上编辑此页',
        nav: [
          {
            text: '首页',
            link: '/'
          },
          {
            text: '重要的计划(Todo)',
            link: 'http://apidocs.yangxiansheng.top/#/todolist'
          },
          {
            text: '指南',
            link: '/guide/'
          },
          {
            text: '笔记随录',
            link: '/about/'
          },
          {
            text: '接口大全',
            link: 'http://wohenpi0918.gitee.io/api-store/#/'
          },
          {
            text: '项目',
            items: [
              {
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
          }
        ],
        lastUpdated: '上次更新',
        sidebarDepth: 2,
        sidebar: {
          '/guide/': getGuideSidebar(
            '基础',
            'vue2.5仿去哪儿旅行项目',
            'vue2.5制作仿qq音乐项目'
          ),
          '/todo/': gettodoSidebar('计划'),
          '/about/': getaboutSidebar(
            '前端基础学习笔记',
            '服务端node基础',
            '常用技巧总结'
          )
        }
      },
      '/es/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on Github',
        nav: [
          {
            text: 'Home',
            link: '/es/'
          },
          {
            text: 'Important plan(Todo)',
            link: 'http://apidocs.yangxiansheng.top/#/todolist'
          },
          {
            text: 'Guide',
            link: '/es/guide/'
          },
          {
            text: 'Notes with notes',
            link: '/es/about/'
          },
          {
            text: 'API List',
            link: 'http://wohenpi0918.gitee.io/api-store/#/'
          },
          {
            text: 'Projects',
            items: [
              {
                text: 'Where go Travel',
                link: 'https://github.com/251205668/Travel'
              },
              {
                text: 'Element food restaurant',
                link: 'https://github.com/251205668/restaurant'
              },
              {
                text: 'Magic Muisc app',
                link: 'https://github.com/251205668/mymusic'
              }
            ]
          }
        ],
        lastUpdated: 'Last Update',
        sidebarDepth: 2,
        sidebar: {
          '/es/guide/': [
            {
              title:'Basis',
              collapsable:false,
              children:[
                '/es/',
                '/es/guide/ES6demo1.md',
                '/es/guide/ES6demo2.md',
                '/es/guide/ES6demo3.md',
                '/es/guide/ES6demo4.md',
                '/es/guide/ES6demo5.md',
                '/es/guide/ES6demo6.md',
              ]
            },
            {
              title:'MARKDOWN-BASIS',
              collapsable:false,
              children:[
                '/es/guide/first.md',
                '/es/guide/5g.md'
              ]

            },
            {
              title:'vue2.5-MagicMuisc',
              collapsable:false,
              children:[
                '/es/guide/begin.md',
                '/es/guide/C1.md',
                '/es/guide/C2.md',
                '/es/guide/header.md',
                '/es/guide/tab.md',
                '/es/guide/jsonp.md',
                '/es/guide/getrecommends.md',
                '/es/guide/Cswiper.md',
                '/es/guide/recommend.md',
                '/es/guide/loading.md',
                '/es/guide/singer.md',
                '/es/guide/listview.md',
                '/es/guide/映射表.md',
                '/es/guide/axios.md',
                '/es/guide/router.md',
                '/es/guide/vuex.md',
                '/es/guide/网易云Api重构.md',
                '/es/guide/singerDetail.md',
                '/es/guide/player1.md',
                '/es/guide/player2.md'
              ]
            }
          ],
          '/es/about/':getesaboutSidebar(
            'Front-end basic study notes',
            'Server Node.js foundation',
            'Summary of common skills'
          ),
        }
      }
    },
    repo: '251205668',
    repoLabel: 'Github',
    docsRepo: '251205668/vuepressdemo',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true
      }
    ]
  ]
}
function getGuideSidebar(groupA, groupB, groupC) {
  return [
    {
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
      children: ['first','begin']
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
        'axios',
        'router',
        'vuex',
        '网易云Api重构',
        'singerDetail',
        'player1',
        'player2'
      ]
    }
  ]
}
function gettodoSidebar(group) {
  return [
    {
      title: group,
      collapsable: false,
      children: ['todo']
    }
  ]
}

function getaboutSidebar(groupA, groupB, groupC) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: ['', 'workclass', 'test']
    },
    {
      title: groupB,
      collapsable: false,
      children: ['', 'workclass', 'test']
    },
    {
      title: groupC,
      collapsable: false,
      children: ['', 'workclass', 'test']
    }
  ]
}
function getesaboutSidebar(groupA, groupB, groupC) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: ['', '/es/about/workclass', '/es/about/test']
    },
    {
      title: groupB,
      collapsable: false,
      children: ['', '/es/about/workclass', '/es/about/test']
    },
    {
      title: groupC,
      collapsable: false,
      children: ['', '/es/about/workclass', '/es/about/test']
    }
  ]
}

