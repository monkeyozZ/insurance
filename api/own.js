import http from '@/utils/request.js'

/**
 * @param {Object} data
 * 保存客户
 */
export function saveCustomer(data) {
  return http.request({
    url: '/customer/save',
	method: 'POST',
	data
  })
}
/**
 * @param {Object} data
 * 我的客户列表
 */
export function getCustomerList(data) {
	return http.request({
		url: '/customer/customers',
		method: 'POST',
		data
	})
}
/**
 * @param {Object} id
 * 客户详情
 */
export function getCustomerDetail(id) {
	return http.request({
		url: `/customer/detail/${id}`,
		method: 'GET'
	})
}

/**
 * @param {Object} data
 * 获取访客统计
 */
export function getVisitorCount(data) {
	return http.request({
		url: '/my/viewCount',
		method: 'GET',
		data
	})
}

/**
 * @param {Object} data
 * 获取访客列表
 */
export function getVisitorList(data) {
	return http.request({
		url: '/my/views',
		method: 'POST',
		data
	})
}
