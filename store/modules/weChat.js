import {getWechatConfig} from '@/api/wechat.js'

const state = {
	shareConfig: {}
}

const mutations = {
	SET_DATA: (state, data) => {
		state.shareConfig = data
	}
}

const actions = {
	getWechatConfigHandler({ commit }, data) {
		return new Promise((resolve, reject) => {
			getWechatConfig(data).then((response) => {
				commit('SET_DATA', response.data.data)
				resolve(response)
			}).catch((error) => {
				reject(error)
			})
		})
	}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}