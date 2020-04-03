import http from '@/utils/request.js'


/**
 * 文章列表
 * @param {Object} data
 * data:{
	 category:为空是查询热门
	 page:页码
	}
 * 
 */
export function getArticleList(data) {
  return http.request({
    url: '/article/page',
	method: 'POST',
	data
  })
}
/**
 * 获取资讯分类
 */
export function getArticleCate() {
  return http.request({
    url: '/article/categories',
	method: 'GET'
  })
}
/**
 * @param {Object} id
 */
export function getDetails(id) {
	return http.request({
		url: `/article/detail/${id}`,
		method: 'GET'
	})
}
/**
 * @param {string} id
 * @param {string} userId
 * @param {Object} data
 * 用户查看经纪人分享的资讯的详情
 */
export function getArticleDetailsByUserId(id, userId, data) {
  return http.request({
    url: `/article/detail/${id}/${userId}`,
	method: 'POST',
	data
  })
}

export function getWechatCard(data) {
	return http.request({
	  url: '/card',
		method: 'POST',
		data
	})
} 