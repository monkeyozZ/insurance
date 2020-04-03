const getters = {
  weChatAuth: state => state.user.weChatAuth,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  shareConfig: state => state.weChat.shareConfig,
}
export default getters