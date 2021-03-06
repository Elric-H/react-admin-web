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
    path: '/todo',
    layout: false,
    routes: [
      {
        name: 'todo',
        path: '/toDo/admin',
        component: './todo/index',
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
    path: '/practical',
    name: 'practical',
    icon: 'crown',
    routes: [
      {
        path: '/practical/Recorder',
        name: 'recorder',
        component: './practical/Recorder',
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
      {
        path: '/visual/learn3',
        name: 'learn3',
        component: './Visual/Learn3',
      },
      {
        path: '/visual/learn4',
        name: 'learn4',
        component: './Visual/Learn4',
      },
      {
        path: '/visual/webGL1',
        name: 'webGL1',
        component: './Visual/WebGL1',
      },
      {
        path: '/visual/webGL2',
        name: 'webGL2',
        component: './Visual/WebGL2',
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
