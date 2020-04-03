import { login, logout, getInfo, wechatAuthLogin } from '@/api/user.js'
import { getToken, setToken, removeToken, setWechatAuthStatus, getWechatAuthStatus, setUserId } from '@/utils/auth.js'

const state = {
	token: getToken(),
	visitId: getWechatAuthStatus(),
	userInfo: {}
}


const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_USERINFO: (state, userInfo) => {
		state.userInfo = userInfo
	},
	SET_VISITID: (state, vid) => {
		state.visitId = vid
	}
}

const actions = {
	// user login
	login({ commit }, userInfo) {
		const { mobile, password } = userInfo
		return new Promise((resolve, reject) => {
		  login({ mobile: mobile.trim(), password: password }).then(response => {
			const { data } = response
			commit('SET_TOKEN', data.data)
			setToken(data.data)
			resolve(data)
		  }).catch(error => {
			reject(error)
		  })
		})
	},
  
  // get user info
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const { data } = response
  
          if (!data) {
            reject('身份验证失败, 请重新登录')
          }
		  setUserId(data.data.id)
          commit('SET_USERINFO', data.data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
	
	// 微信授权登录
	wechatAuthLogin({ commit, state }, obj) {
		const { code } = obj
		return new Promise((resolve, reject) => {
		  wechatAuthLogin({ code }).then(response => {
		    const { data } = response		  
		    if (!data) {
		      reject('拉取授权信息失败,请重试')
		    }
			
			commit('SET_VISITID', data.data.id)
			setWechatAuthStatus(data.data.id)
		    resolve(data)
		  }).catch(error => {
		    reject(error)
		  })
		})
	},
	
    // user logout
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resetRouter()
          resolve()
        }).catch(error => {
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