import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import filters from '@/utils/filters.js' // 过滤器
// import '@/utils/vConsole.js'
import { RouterMount } from 'uni-simple-router'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-uni', MescrollUni)

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
