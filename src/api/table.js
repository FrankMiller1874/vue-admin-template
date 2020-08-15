import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/user/list',
    method: 'get'
  })
}

export function createUser(user) {
  return request({
    url: '/user/add',
    method: 'post',
    data: user
  })
}

export function updateUser(user) {
  return request({
    url: '/user/add',
    method: 'post',
    headers: {
      'Content-type': 'application/json;charset=urf-8'
    },
    data: user
  })
}
