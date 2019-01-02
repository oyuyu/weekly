import { message } from 'antd';
import {
  getOkrDetail,
} from '../services/okr';

export default {
  namespace: 'okr',

  state: {
    okrInfo: {},
  },

  effects: {
    * getOkrDetail({ payload }, { call, put }) {
      yield put({
        type: 'setState',
        payload: {
          okrInfo: {}
        }
      })
      const response = yield call(getOkrDetail, { ...payload });
      const res = response.data;
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            okrInfo: { ...res.data.okrInfo }
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
