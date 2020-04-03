<template>
	<view class="article_container">
		<view class="article_content" v-html="aboutDetails">
		</view>
	</view>
</template>

<script>
	import {getAbout} from '@/api/company.js';
	export default {
		data() {
			return {
				aboutDetails: ''
			};
		},
		mounted() {
			this.getAboutHandler()
		},
		methods:{
			getAboutHandler() {
				getAbout().then((res) => {
					this.aboutDetails = res.data.data
				})
			}
		}
	}
</script>

<style lang="scss">
.article_container{
	padding: 30rpx;
	min-height: 100vh;
	background: #fff;
	.article_content{
		margin-top: 30rpx;
	};
}
</style>
