import React, { lazy } from 'react';
import Loading from '../components/Loading';

const config = [
  {
    name: '主页',
    icon: 'home',
    path: '/home',
    component: dynamicWrapper(() => import('../routes/Home/')),
    role: [],
  }
];

function dynamicWrapper (fn) {
  let DynamicWrapper = lazy(fn);
  return () => <DynamicWrapper />;
}

export default config;
