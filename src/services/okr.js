import request from '../utils/request';

export async function getOkrDetail(data) {
  return request('/support/week/getOkrDetail', {
    method: 'POST',
    data,
  })
}
