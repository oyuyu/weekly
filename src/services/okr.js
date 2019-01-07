import request from '../utils/request';

export async function getOkrDetail(data) {
  return request('/support/week/getOkrDetail', {
    method: 'POST',
    data,
  })
}

export async function getKrWeeklys(data) {
  return request('/support/week/getKrWeeklys', {
    method: 'POST',
    data,
  })
}

export async function addNewOkr(data) {
  return request('/support/week/addOkr', {
    method: 'POST',
    data,
  })
}
