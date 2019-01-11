import { message } from 'antd';
import {
  getUserList,
  getDepartmentList,
  setFocusOnUser,
  setRemoveFocus,
} from '../services/crew';

export default {
  namespace: 'crew',

  state: {
    userList: {
      data: [],
      totalCount: 0,
    },
    currentUserAuth: 1,
    departmentList: [],
  },

  effects: {
    * getUserList({ payload }, { call, put }) {
      const response = yield call(getUserList, { ...payload });
      const res = response.data;
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            userList: {
              data: res.data.userVoList,
              totalCount: res.data.totoalCount,
            },
            currentUserAuth: res.data.isManager,
          }
        })
      }
    },

    * getDepartmentList({ payload }, { call, put }) {
      const response = yield call(getDepartmentList, { ...payload });
      const res = response.data;
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            departmentList: res.data.depts
          }
        })
      }
    },

    * setFocusOnUser({ payload }, { call, put }) {
      const response = yield call(setFocusOnUser, { ...payload });
      const res = response.data;
      if (res.code === 0) {
        message.success('成功关注');
      }
    },

    * setRemoveFocus({ payload }, { call, put }) {
      const response = yield call(setRemoveFocus, { ...payload });
      const res = response.data;
      if (res.code === 0) {
        message.success('成功取消关注');
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
  }
}
