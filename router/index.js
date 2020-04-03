import Vue from 'vue'
import Router from 'uni-simple-router'
import store from '@/store/index.js'
import { getToken, setInitShareUrl, getInitShareUrl, getWechatAuthStatus, setBeforeAuthUrlObj } from '@/utils/auth.js'
import defaultSettings from '@/config/settings.js';


Vue.use(Router)
//初始化
let myRoutes = []
ROUTES.map((item) => {
	if (item.path == '/pages/weChatAuth/index') {
		item.beforeEnter = (to, from, next) => {
			let status = getWechatAuthStatus()
			if (status) {
				history.go(-2)
			} else {
				next()
			}
		}
	}
	if (defaultSettings.needWechatAuth.indexOf(item.path) !== -1) {
		item.beforeEnter = (to, from, next) => {
			let status = getWechatAuthStatus()
			if (status || getToken()) { //授权过或登录了,就不再授权
				next()
			} else {
				let redirectUrl = encodeURI(defaultSettings.baseUrl + '/pages/weChatAuth/index')
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + defaultSettings.AppID + '&redirect_uri=' + redirectUrl + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
			}
		}
	}
	myRoutes.push(item)
})

const router = new Router({
	encodeURI:false,
    routes:myRoutes //路由表
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if (!getInitShareUrl()) {
		setInitShareUrl()
	}
	if (!new RegExp('weChatAuth').test(to.path)) {
		setBeforeAuthUrlObj(to)
	}
	const hasToken = getToken()
	
	if (hasToken) {
	    if (to.path === '/pages/login/login') {
	      // if is logged in, redirect to the home page
	      next({ path: '/pages/index/index' })
	    }else {
			if (defaultSettings.whiteList.indexOf(to.path) !== -1) {
			  next()
			} else {
				const hasGetUserId = store.getters.userInfo.id
				if (hasGetUserId) {
				  next()
				} else {
				  store.dispatch('user/getInfo').then(() => {
					next()
				  })
				}
			}
	    }
		next()
	  } else {
	    /* has no token*/
	
	    if (defaultSettings.whiteList.indexOf(to.path) !== -1) {
	      // in the free login whitelist, go directly
	      next()
	    } else {
	      // 没有token进入非白名单页面,统一重定向到登录页.
		  console.log('去登陆')
	      next('/pages/login/login')
	    }
	  }
})
// 全局路由后置守卫
router.afterEach((to, from) => {
})
export default router;