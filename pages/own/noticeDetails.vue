<template>
	<view class="article_container">
		<view class="title">
			{{noticeDetails.name}}
		</view>
		<view class="article_auther">
			<text class="auther">{{noticeDetails.author}}</text>
			<text class="time text-gray">{{noticeDetails.createTime | parseTimeYMD}}</text>
		</view>
		<view class="article_content" v-html="noticeDetails.content">
		</view>
	</view>
</template>

<script>
	import {getNoticeDetails} from '@/api/company.js';
	export default {
		data() {
			return {
				noticeDetails: {}
			};
		},
		computed:{
			noticeId() {
				if (this.$Route.query.noticeId) {
					return this.$Route.query.noticeId
				} else {
					return null
				}
			}
		},
		mounted() {
			this.getNoticeDetailsHandler()
		},
		methods:{
			getNoticeDetailsHandler() {
				getNoticeDetails(this.noticeId).then((res) => {
					this.noticeDetails = res.data.data
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
	.title{
		font-size: 20px;
		line-height: 60rpx;
		color: #333;
	}
	.article_auther{
		margin-top: 30rpx;
		.auther{
			color: #015478;
			font-size: 15px;
			margin-right: 15px;
		}
	}
	.article_content{
		margin-top: 30rpx;
	};
}
</style>
