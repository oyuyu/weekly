import React, { lazy } from 'react';

const config = [
  {
    name: '我的周报',
    icon: 'book',
    path: '/home',
    component: dynamicWrapper(() => import('../routes/Home/')),
    role: ['admin'],
  }, {
    name: '我的OKR',
    icon: 'form',
    path: '/okr',
    component: dynamicWrapper(() => import('../routes/Okr/')),
    role: ['admin'],
  }, {
    name: '关注的人',
    icon: 'star',
    path: '/focus',
    component: dynamicWrapper(() => import('../routes/Home/')),
    role: ['admin'],
  }, {
    name: '人员列表',
    icon: 'team',
    path: '/crew',
    component: dynamicWrapper(() => import('../routes/Home/')),
    role: ['admin'],
  }, {
    path: '/exception',
    children: [
      {
        path: '/exception/404',
        component: dynamicWrapper(() => import('../routes/Exception/404.js')),
      }, {
        path: '/exception/403',
        component: dynamicWrapper(() => import('../routes/Exception/403.js')),
      }, {
        path: '/exception/500',
        component: dynamicWrapper(() => import('../routes/Exception/500.js')),
      },
    ],
    role: [],
  }, {
    name: '登录',
    path: '/login',
    component: dynamicWrapper(() => import('../routes/User/Login.js')),
    role: [],
  }
];

function dynamicWrapper (fn) {
  let DynamicWrapper = lazy(fn);
  return () => <DynamicWrapper />;
}

export default config;
