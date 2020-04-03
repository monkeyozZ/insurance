import http from '@/utils/request.js'

// 账号密码登录
export function login(data) {
  return http.request({
    url: '/login',
	method: 'POST',
    data
  })
}

/**
 * @param {Object} data
 * 微信授权登录
 */
export function wechatAuthLogin(data) {
  return http.request({
    url: '/login/wechatAuth',
	method: 'POST',
    data
  })
}

// 获取当前登录用户信息
export function getInfo() {
  return http.request({
    url: '/my/self',
    method: 'GET'
  })
}

/**
 * @param {Object} data
 * 修改个人信息
 */
export function updateUserInfo(data) {
	return http.request({
		url: '/my/update',
		method: 'POST',
		data
	})
}
/**
 * @param {Object} data
 * 个人业绩
 */
export function getSalarySlip(data) {
	return http.request({
		url: '/my/salarySlip',
		method: 'POST',
		data
	})
}
/**
 * @param {Object} data
 * 账号设置-修改密码
 */
export function updatePassWord(data) {
	return http.request({
		url: '/my/modifyPassword',
		method: 'POST',
		data
	})
}
