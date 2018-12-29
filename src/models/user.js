import { message } from 'antd';
import {
  userLogin,
  userLogout,
  userInfo,
} from '../services/user';
import { routerRedux } from 'dva/router';
import {setAuthority, getAuthority} from '../utils/authority';

export default {

  namespace: 'user',

  state: {
    userInfo: {

    }
  },

  effects: {
    * userLogin({ payload }, { call, put }) {
      const response = yield call(userLogin, { ...payload });
      const res = response.data;
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            userInfo: {
              ...res.data
            }
          }
        })
        setAuthority('admin');
        yield put(routerRedux.push('/'));
      } else {
        message.error(response.data.msg)
      }
    },

    * userLogout({ payload }, { call, put }) {
      const response = yield call(userLogout, { ...payload });
      const res = response.data;
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            userInfo: {}
          }
        })
        setAuthority([]);
        yield put(routerRedux.push('/login'));
      } else {
        message.error(response.data.msg)
      }
    },

    * userInfo({ payload }, { call, put }) {
      const response = yield call(userInfo, { ...payload });
      const res = response.data;
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            userInfo: {
              ...res.data
            }
          }
        })
        setAuthority('admin');
        yield put(routerRedux.push('/'));
      } else {
        message.error(response.data.msg);
        setAuthority([]);
        yield put(routerRedux.push('/login'));
      }
    },
  },

  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  },

};
