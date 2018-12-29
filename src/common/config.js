import React, { lazy } from 'react';
import Loading from '../components/Loading';

const config = [
  {
    name: '主页',
    icon: 'home',
    path: '/home',
    component: dynamicWrapper(() => import('../routes/Home/')),
    role: [],
  }, {
    name: '例子',
    icon: 'home',
    path: '/demo',
    component: dynamicWrapper(() => import('../routes/Home/')),
    role: [],
  }, {
    name: '权限',
    icon: 'home',
    path: '/auth',
    component: dynamicWrapper(() => import('../routes/Home/')),
    role: ['admin'],
  }, {
    name: '测试',
    icon: 'home',
    path: '/exception',
    children: [
      {
        path: '/exception/404',
        name: '404错误',
        component: dynamicWrapper(() => import('../routes/Exception/404.js')),
      }, {
        path: '/exception/403',
        name: '403错误',
        component: dynamicWrapper(() => import('../routes/Exception/403.js')),
      }, {
        path: '/exception/500',
        name: '500错误',
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
