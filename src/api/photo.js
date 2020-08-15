import request from '@/utils/request'

export function getPageList(pageIndex, pageSize) {
  return request(
    {
      url: '/file/listp?pageIndex=' + pageIndex + '&pageSize=' + pageSize,
      method: 'get'
    }
  )
}

export function getImageByFileId(fileId) {
  return request(
    {
      url: '/file/getImage/' + fileId,
      method: 'get'
    }
  )
}

export function downloadImage(fileId) {
  return request(
    {
      url: '/file/download/' + fileId,
      method: 'get',
      responseType: 'blob'
    }
  )
}

export function getFileNameById(fileId) {
  return request(
    {
      url: '/file/getFileNameById/' + fileId,
      method: 'get'
    }
  )
}
