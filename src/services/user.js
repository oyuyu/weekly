import request from '../utils/request';

export async function userLogin(data) {
  return request('/support/week/login', {
    method: 'POST',
    data,
  })
}

export async function userLogout(data) {
  return request('/support/week/loginOut', {
    method: 'POST',
    data,
  })
}

export async function userInfo(data) {
  return request('/support/week/getUser', {
    method: 'POST',
    data,
  })
}
