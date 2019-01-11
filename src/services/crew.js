import request from '../utils/request';

export async function getUserList(data) {
  return request('/support/week/selectUser', {
    method: 'POST',
    data,
  })
}

export async function getDepartmentList(data) {
  return request('/support/week/selectDeptOption', {
    method: 'POST',
    data,
  })
}

export async function setFocusOnUser(data) {
  return request('/support/week/focusOnUser', {
    method: 'POST',
    data,
  })
}

export async function setRemoveFocus(data) {
  return request('/support/week/removeFocus', {
    method: 'POST',
    data,
  })
}
