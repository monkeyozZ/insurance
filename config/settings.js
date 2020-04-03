export default {
	baseUrl: 'http://baodian.ahzhrt.com',
	AppID: 'wx2a62720f4858bdb0',
	/**
	 *  路由白名单,不需要token可进入
	 */
	whiteList: [
		'/pages/login/login', 
		'/pages/index/index', 
		'/pages/product/product',
		'/pages/knowledge/knowledge',
		'/pages/knowledge/details',
		'/pages/product/details',
		'/pages/product/carDetails',
		'/pages/weChatAuth/index',
		'/pages/clearCache/index'
	],
	needWechatAuth: [
		'/pages/knowledge/details',
		'/pages/product/carDetails',
		'/pages/product/details'
	]
}
