import { message } from 'antd';
import {
  getOkrDetail,
  getKrWeeklys,
  addNewOkr,
} from '../services/okr';

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
      const res = response.data;
      console.log(res);
    }
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
