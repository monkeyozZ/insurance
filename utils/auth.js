
const TokenKey = 'AHZH-Authorization' //token key
const UserIDKey = 'userID' //token key
const initLinkKey = 'shareUrl' //shareUrl key
const WechatAuthKey = 'WechatAuthStatus' //token key
const beforeWechatAuthKey = 'beforeWechatAuthUrl' //token key
/**
 * 获取token
 */
export function getToken() {
  return uni.getStorageSync(TokenKey)
}

/**
 * 保存token
 */
export function setToken(token) {
  return  uni.setStorageSync(TokenKey, token)
}

/**
 * 移除token
 */
export function removeToken() {
  return uni.removeStorageSync(TokenKey)
}

/**
 * 获取userId
 */
export function getUserId() {
  return uni.getStorageSync(UserIDKey)
}

/**
 * 保存userId
 */
export function setUserId(userId) {
  return  uni.setStorageSync(UserIDKey, userId)
}

/**
 * 移除userId
 */
export function removeUserId() {
  return uni.removeStorageSync(UserIDKey)
}

/**
 * 保存分享url
 */
export function setInitShareUrl() {
	return sessionStorage.setItem(initLinkKey , window.location.href)
}

/**
 * 保存分享url
 */
export function getInitShareUrl() {
	return sessionStorage.getItem(initLinkKey)
}

/**
 * @param {Object} status
 * 设置授权登录状态
 */
export function setWechatAuthStatus(status) {
	return uni.setStorageSync(WechatAuthKey, status)
}

/**
 * @param {Object} status
 * 获取授权登录状态
 */
export function getWechatAuthStatus() {
	return uni.getStorageSync(WechatAuthKey)
}

/**
 * @param {Object} status
 * 设置授权登录前要前往的页面
 */
export function setBeforeAuthUrlObj(status) {
	return uni.setStorageSync(beforeWechatAuthKey, status)
}

/**
 * @param {Object} status
 * 获取授权登录前要前往的页面
 */
export function getBeforeAuthUrlObj() {
	return uni.getStorageSync(beforeWechatAuthKey)
}