import Request from '@/common/http-request.js'
import { getToken, removeToken } from './auth.js'
import defaultSettings from '@/config/settings.js';
import Router from '@/router/index.js';
const http = new Request()

http.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = 'http://baodian-api.ahzhrt.com' /* 根域名不同 */
  config.header = {
    ...config.header
  }
  return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode) => {
  return statusCode === 200
}

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
  config.header = {
	  'AHZH-Authorization': getToken(),
    ...config.header
  }
  /* uni.showLoading({
      title: '加载中'
  }); */
  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
  return config
})

http.interceptor.response((response) => { /* 请求之后拦截器 */
	// uni.hideLoading();
  if (response.data.code !== 0) { // 服务端返回的状态码不等于0，则reject()
	if (response.data.code == -2) {
		removeToken() //清除token
		uni.showToast({
		    title: '登录过期,请重新登录',
		    icon: 'none'
		});
		setTimeout(() => {
			Router.push({path: '/pages/login/login'})
		}, 1500)
	} else {
		uni.showToast({
		    title: response.data.msg,
		    icon: 'none'
		});
	}
	
    return Promise.reject(response)
  }
  // if (response.config.custom.verification) { // 演示自定义参数的作用
  //   return response.data
  // }
  return response
}, (response) => { // 请求错误做点什么
	uni.showToast({
	    title: '网络或服务器异常',
	    icon: 'none'
	});
  return response
})

export default http
