import {
  getFocusWeeklyList,
} from '../services/focus';
import {
  getDepartmentList,
} from '../services/crew';

export default {
  namespace: 'focus',

  state: {
    departmentList: [],
    userWeeklyList: {
      data: [],
      totalCount: 0,
    },
  },

  effects: {
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

    *getFocusWeeklyList({ payload}, { call, put }) {
      const response = yield call(getFocusWeeklyList, { ...payload });
      const res = response.data;
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            userWeeklyList: {
              data: res.data.userWeeklyList,
              totalCount: res.data.totalCount,
            }
          }
        })
      }
    }
  },

  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  },
}
