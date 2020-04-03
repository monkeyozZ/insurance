import http from '@/utils/request.js'

/**
 * 关于我们
 */
export function getAbout(data) {
  return http.request({
    url: '/my/about',
	method: 'GET '
  })
}
/**
 * 联系我们
 */
export function getContact() {
	return http.request({
	  url: '/my/contact',
		method: 'GET '
	})
}

/**
 * 公告列表
 */
export function getNoticeList(data) {
  return http.request({
    url: '/messages',
	method: 'POST',
	data
  })
}

/**
 * 公告详情
 */
export function getNoticeDetails(id) {
  return http.request({
    url: `/message/detail/${id}`,
	method: 'GET'
  })
}

/**
 * 理赔服务列表
 */
export function getClaimServiceList() {
  return http.request({
    url: '/my/links',
	method: 'GET'
  })
}


