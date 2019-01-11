import request from '../utils/request';

export async function getFocusWeeklyList(data) {
  return request('/support/week/selectWeekly', {
    method: 'POST',
    data,
  })
}
