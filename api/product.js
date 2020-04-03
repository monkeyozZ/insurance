import http from '@/utils/request.js'

/**
 * 产品列表
 * @param {Object} data
 * data:{
	 category:为空是查询推荐产品
	 page:页码
	}
 * 
 */
export function getProList(data) {
  return http.request({
    url: '/product/page',
	method: 'POST',
	data
  })
}
/**
 * 获取产品分类
 */
export function getProCate() {
	return http.request({
	  url: '/product/categories',
		method: 'GET'
	})
}
/**
 * @param {string} id
 */
export function getProDetails(id) {
  return http.request({
    url: `/product/detail/${id}`,
	method: 'GET'
  })
}

/**
 * @param {string} id
 * @param {string} userId
 * @param {Object} data
 * 用户查看经纪人分享的产品的详情
 */
export function getProDetailsByUserId(id, userId, data) {
  return http.request({
    url: `/product/detail/${id}/${userId}`,
	method: 'POST',
	data
  })
}
/**
 * 获取banner
 */
export function getBanners() {
	return http.request({
		url: '/banners',
		method: 'GET'
	})
}

/**
 * 获取筛选公司
 */
export function getFilterCompany() {
	return http.request({
		url: '/product/companies',
		method: 'POST' 
	})
}

/**
 * 提交身份证
 */
export function saveidCard(data) {
	return http.request({
		url: '/product/customer-reg',
		method: 'POST',
		data
	})
}
/**
 * 首页搜素
 */
export function search(params) {
	return http.request({
		url: '/search',
		method: 'GET',
		params
	})
}