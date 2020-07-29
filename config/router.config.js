export default [
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './ListTableList',
  },
  {
    name: 'advanced-form',
    icon: 'form',
    path: '/formadvancedform',
    component: './FormAdvancedForm',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'visual',
    path: '/visual',
    icon: 'smile',
    routes: [
      {
        path: '/visual/points-waves',
        name: 'points-waves',
        component: './Visual/Waves',
      },
      {
        path: '/visual/learn1',
        name: 'learn1',
        component: './Visual/Learn1',
      },
      {
        path: '/visual/learn2',
        name: 'learn2',
        component: './Visual/Learn2',
      },
    ],
  },
  {
    path: '/exception',
    name: 'exception',
    icon: 'warning',
    routes: [
      {
        name: '403',
        icon: 'smile',
        path: '/exception403',
        component: './Exception403',
      },
      {
        name: '404',
        icon: 'smile',
        path: '/exception404',
        component: './Exception404',
      },
    ],
  },

  {
    component: './404',
  },
];
