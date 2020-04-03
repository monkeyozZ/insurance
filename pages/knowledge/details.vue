<template>
	<view class="article_container">
		<view v-if="detailsObj">
			<view class="title">
				{{detailsObj.name}}
			</view>
			<view class="article_author">
				<image src="../../static/img/logo.png" mode="scaleToFill" class="avt"></image>
				<text class="author">{{detailsObj.author}}</text>
				<text class="time text-gray">{{detailsObj.createTime | parseTimeYMD}}</text>
			</view>
			<view class="article_content" v-html="detailsObj.content"></view>
			<view class="selfInfo_box bg-blue" v-if="!this.hasLogin && this.queryUserId">
				<view class="selfInfo_content">
					<view class="left">
						<image :src="cardObj.qrCode ? cardObj.qrCode : '/static/img/default_code.jpg'" mode="scaleToFill" class="qr_code"></image>
					</view>
					<view class="right">
						<view>{{cardObj.name}}({{cardObj.jobLevel}})</view>
						<view><text class="cuIcon-dianhua text-blue"></text>：{{cardObj.mobile}}</view>
						<view v-if="cardObj.wechatAccount"><text class="cuIcon-weixin text-blue"></text>：{{cardObj.wechatAccount}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="knowledgeEmpty" v-else>
			<image class="pic" src="../../static/img/knowledgeEmpty.png"></image>
		</view>
	</view>
</template>

<script>
	import { getDetails, getArticleDetailsByUserId, getWechatCard } from '@/api/article.js';
	import { getWechatConfig } from '@/api/wechat.js';
	import getShareConfig from '@/utils/initWeChatShare.js';
	import {getToken, getWechatAuthStatus, getUserId} from '@/utils/auth.js';
	import MyLeader from '@/components/leader/index.vue';
	// #ifdef H5
	var wx = require('jweixin-module')
	// #endif
	export default {
		data() {
			return {
				articleId: '',
				detailsObj: {},
				cardObj: {}
			};
		},
		onLoad() {
			this.articleId = this.$Route.query.articleId
		},
		computed:{
			hasLogin() {
				return getToken()
			},
			queryUserId() {
				if (this.$Route.query.userId) {
					return this.$Route.query.userId
				} else {
					return null
				}
			},
			userId() {
				if (getUserId()) {
					return getUserId()
				} else {
					return null
				}
			}
		},
		mounted() {
			if (this.hasLogin) { // 面向经纪人
				getShareConfig().then((res) => {
					this.getDetailsHandler(res.data.data, this.userId, true) //获取详情
				})
			} 
			if (!this.hasLogin && this.queryUserId) { // 面向通过分享进来的游客
				this.getArticleDetailsByUserIdHandler()
				this.getWechatCardHandler() //名片信息
			}
			if (!this.hasLogin && !this.queryUserId) { // 面向非分享进入且未登录用户
				this.getDetailsHandler(null, null, false)
			}
		},
		methods:{
			initShareCinfig(shareConfig, detailsObj, userId) {
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: shareConfig.appId, // 必填，公众号的唯一标识
					timestamp: shareConfig.timestamp, // 必填，生成签名的时间戳
					nonceStr: shareConfig.nonceStr, // 必填，生成签名的随机串
					signature: shareConfig.signature, // 必填，签名
					jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表
				})
				wx.ready(function(){
					//分享给朋友
				  wx.onMenuShareAppMessage({ // 需在用户可能点击分享按钮前就先调用
					title: detailsObj.name, // 分享标题
					desc: detailsObj.content.replace(/<[^<>]+>/g,'').replace(/&nbsp;/ig,''), // 分享描述
					link: `${window.location.href}&userId=${userId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: detailsObj.cover, // 分享图标
					success: function (res) {
					  // 设置成功
					  console.log('res1:ok')
					  console.log(res)
					},
					error: function (err) {
					  console.log('err1:ok')
					  console.log(err)
					}
				  })
				  // 分享到朋友圈
				  wx.onMenuShareTimeline({
					title: detailsObj.name, // 分享标题
					desc: detailsObj.content.replace(/<[^<>]+>/g,'').replace(/&nbsp;/ig,''), // 分享描述
					link: `${window.location.href}&userId=${userId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: detailsObj.cover, // 分享图标
					success: function (res) {
					  // 设置成功
					  console.log('res2:ok')
					  console.log(res)
					},
					error: function (err) {
					  console.log('err2:ok')
					  console.log(err)
					}
				  })
				  
				  // 分享到QQ
				  wx.onMenuShareQQ({
						title: detailsObj.name, // 分享标题
						desc: detailsObj.content.replace(/<[^<>]+>/g,'').replace(/&nbsp;/ig,''), // 分享描述
						link: `${window.location.href}&userId=${userId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: detailsObj.cover, // 分享图标
						success: function (res) {
						  // 设置成功
						  console.log('res2:ok')
						  console.log(res)
						},
						error: function (err) {
						  console.log('err2:ok')
						  console.log(err)
						}
					})
					// 分享到QQ空间
					wx.onMenuShareQZone({
						title: detailsObj.name, // 分享标题
						desc: detailsObj.content.replace(/<[^<>]+>/g,'').replace(/&nbsp;/ig,''), // 分享描述
						link: `${window.location.href}&userId=${userId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: detailsObj.cover, // 分享图标
						success: function (res) {
						  // 设置成功
						  console.log('res2:ok')
						  console.log(res)
						},
						error: function (err) {
						  console.log('err2:ok')
						  console.log(err)
						}
					})
				});
			},
			getDetailsHandler(shareConfig, userId, isInitShare) {
				getDetails(this.articleId).then((res) => {
					this.detailsObj = res.data.data
					if (isInitShare) {
						this.initShareCinfig(shareConfig, res.data.data, userId)
					}
				})
			},
			getArticleDetailsByUserIdHandler() {
				let obj = {
					articleId: this.proId,
					vid: getWechatAuthStatus(),
					userId: this.$Route.query.userId
				}
				getArticleDetailsByUserId(this.articleId, this.queryUserId, obj).then((res) => {
					this.detailsObj = res.data.data
				})
			},
			getWechatCardHandler() {
				let obj = {
					agentId: this.queryUserId
				}
				getWechatCard(obj).then((res) => {
					this.cardObj = res.data.data
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
	.knowledgeEmpty{
		text-align: center;
		.pic{
			margin-top: 50px;
			width: 250px;
			height: 100px;
		}
	}
	.title{
		font-size: 20px;
		line-height: 60rpx;
		color: #333;
	}
	.article_author{
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		.avt{
			width: 30px;
			height: 30px;
			margin-right: 10px;
		}
		.author{
			flex: 1;
			color: #015478;
			font-size: 15px;
			text-align: left;
		}
		.time{
			flex: 1;
		}
	}
	.article_content{
		margin-top: 30rpx;
	}
	.selfInfo_box{
		margin-top: 15px;
		padding: 15px;
		.selfInfo_content{
			background: #fff;
			padding: 20px;
			display: flex;
			.left{
				.qr_code{
					width: 100px;
					height: 100px;
				}
			}
			.right{
				display: flex;
				padding: 10px 0;
				flex: 1;
				margin-left: 20px;
				align-items: left;
				color: #333;
				justify-content: space-between;
				flex-direction: column;
				.item{
					padding-left: 8px;
				}
			}
		}
	}
}
</style>
