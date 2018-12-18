import Loadable from 'react-loadable';
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
  return Loadable({
    loader: fn,
    loading: Loading,
  });
}

export default config;
