
export default [
  {
    name: 'Dashboard',
    path: 'dashboard',
    icon: 'dashboard',
    children: [
      {
        name: '分析页',
        path: 'analysis',
      },
      {
        name: '监控页',
        path: 'monitor',
      },
      {
        name: '工作台',
        path: 'workplace',
      },
    ],
  },
  {
    name: '表单页',
    path: 'form',
    icon: 'form',
    children: [
      {
        name: '基础表单',
        path: 'basic-form',
      },
      {
        name: '分步表单',
        path: 'step-form',
        children: [
          {
            path: 'confirm',
          },
          {
            path: 'result',
          },
        ],
      },
      {
        name: '高级表单',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: '列表页',
    path: 'list',
    icon: 'table',
    children: [
      {
        name: '查询表格',
        path: 'table-list',
      },
      {
        name: '标准列表',
        path: 'basic-list',
      },
      {
        name: '卡片列表',
        path: 'card-list',
      },
      {
        name: '搜索列表（项目）',
        path: 'cover-card-list',
      },
      {
        name: '搜索列表（应用）',
        path: 'filter-card-list',
      },
      {
        name: '搜索列表（文章）',
        path: 'search',
      },
    ],
  },
  {
    name: '详情页',
    path: 'profile',
    icon: 'profile',
    children: [
      {
        name: '基础详情页',
        path: 'basic',
      },
      {
        name: '高级详情页',
        path: 'advanced',
      },
    ],
  },
  {
    name: '结果',
    path: 'result',
    icon: 'check-circle-o',
    children: [
      {
        name: '成功',
        path: 'success',
      },
      {
        name: '失败',
        path: 'fail',
      },
    ],
  },
  {
    name: '异常',
    path: 'exception',
    icon: 'warning',
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
    ],
  },
  {
    name: '帐户',
    icon: 'user',
    path: 'user',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
  {
    name: '使用文档',
    path: 'http://pro.ant.design/docs/getting-started',
    target: '_blank',
    icon: 'book',
  },
]
