import http from '@/utils/request.js'

/**
 * @param {Object} data
 * 获取微信分享注入的配置
 */
export function getWechatConfig(data) {
  return http.request({
    url: '/wechatShareConfig',
	method: 'POST',
    data
  })
}