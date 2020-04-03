<template>
	<view>
		
	</view>
</template>

<script>
	import { setWechatAuthStatus, getWechatAuthStatus, getBeforeAuthUrlObj } from '@/utils/auth.js'
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			code() {
				return this.$Route.query.code
			}
		},
		mounted() {
			this.getUserInfo()
		},
		methods:{
			getUserInfo () {
				let beforeWechatAuthUrlObj = getBeforeAuthUrlObj()
				console.log(beforeWechatAuthUrlObj)
				let redirectUrl = beforeWechatAuthUrlObj.path
				let redirectQuery = beforeWechatAuthUrlObj.query
				let status = getWechatAuthStatus()
		
				if (this.code && !status) {  
					this.$store.dispatch('user/wechatAuthLogin', {code: this.code}).then(() => {
						this.$Router.push({path: redirectUrl, query:{
							...redirectQuery
						}})
				}).catch((err) => {
					console.log(err)
				})
			  }
			}
		}
	}
</script>

<style lang="scss">

</style>
