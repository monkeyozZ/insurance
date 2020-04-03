<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";

	.mescroll-empty{
		text-align: center;
	}
	.mescroll-empty .empty-icon{
		display: inline-block;
	}
	.swiper_container{
		height: calc(100vh - 180rpx);
	}
	.pro_details .pro_desc_box .desc_content table{
		width: 100%!important;
	}
	.pro_details .pro_desc_box .desc_content img{
		display: inline-block;
		max-width: 100%;
		width: 100%;
		height: auto;
	}
	.article_container img{
		display: inline-block;
		max-width: 100%;
		width: 100%;
		height: auto;
	}
</style>
