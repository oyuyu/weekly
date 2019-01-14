import { message } from 'antd';
import {
  getOkrDetail,
  getKrWeeklys,
  addNewOkr,
  editOkr,
} from '../services/okr';
// import { routerRedux } from 'dva/router';

export default {
  namespace: 'okr',

  state: {
    okrInfo: {},
    okrDetails: [],
    weeklyDetails: {},
  },

  effects: {
    * getOkrDetail({ payload }, { call, put }) {
      yield put({ type: 'resetState' });
      const response = yield call(getOkrDetail, { ...payload });
      const res = response.data;
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            okrInfo: { ...res.data.okrInfo },
            okrDetails: res.data.okrInfo.okrDetails ? res.data.okrInfo.okrDetails : [],
          }
        })
      }
    },

    * getKrWeeklys({ payload }, { select, call, put }) {
      const response = yield call(getKrWeeklys, { ...payload });
      const res = response.data;
      if (res.code === 0) {
        let weeklyDetails = yield select(state => state.okr.weeklyDetails);
        weeklyDetails[payload.krId] = res.data.krWeeklys;
        yield put({
          type: 'setState',
          payload: {
            weeklyDetails,
          }
        })
      }
    },

    * addNewOkr({ payload }, { call, put }) {
      const response = yield call(addNewOkr, { ...payload });
      const res = response.data
      if (res.code === 0) {
        message.success('新建成功');
      } else {
        message.error(res.msg);
      }
    },

    * editOkr({ payload }, { call, put }) {
      const response = yield call(editOkr, { ...payload });
      const res = response.data
      if (res.code === 0) {
        message.success('编辑成功');
      } else {
        message.error(res.msg);
      }
    },
  },

  reducers: {
    resetState(state, { payload }) {
      return {
        okrInfo: {},
        okrDetails: [],
        weeklyDetails: {},
      }
    },
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  },

}
