import request from '../utils/request';

export async function userLogin(data) {
  return request('/api/support/week/login', {
    method: 'POST',
    data,
  })
}

export async function userLogout(data) {
  return request('/api/support/week/loginOut', {
    method: 'POST',
    data,
  })
}

export async function userInfo(data) {
  return request('/api/support/week/getUser', {
    method: 'POST',
    data,
  })
}
