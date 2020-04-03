<template>
	<view class="pro_details">
		<mescroll-uni class="mescroll" top="0" :bottom="hasLogin?80:0" :down="downOption" :up="upOption" v-if="detailsObj">
			<view class="pro_details_content">
				<view class="img_box">
					<view class="img_box" :data-company="detailsObj.company">
						<image :src="detailsObj.cover" mode="scaleToFill" lazy-load="true">								
					</view>
				</view>
				<view class="title_desc">
					<view class="title">{{detailsObj.name}}</view>
					<view class="desc">该保险由{{detailsObj.underwriter}}承保并负责理赔</view>
				</view>
				<view class="details_info_box">
					<view class="cu-form-group list_item" v-for="(item, index) in detailsObj.conditions" :key="item.name">
						<view class="title">{{item.name}}：</view>
						<view>{{item.value}}</view>
					</view>
					<!-- <view class="cu-form-group list_item">
						<view class="title">职业类别：</view>
						<view>1-4类</view>
					</view>
					<view class="cu-form-group list_item">
						<view class="title">保障期限：</view>
						<view>终生</view>
					</view>
					<view class="cu-form-group list_item">
						<view class="title">续费期限：</view>
						<view>10年</view>
					</view>
					<view class="cu-form-group list_item">
						<view class="title">保障额度：</view>
						<view>20w/30w/60w</view>
					</view> -->
					
					<view class="cu-bar bg-white solid-bottom margin-top-xl">
						<view class="action">
							<image src="../../static/img/bao.png" class="title_icon"></image>
							<text class="text-black">保障权益/保额</text>
						</view>
					</view>
					<view class="cu-form-group list_item" v-for="(item, index) in detailsObj.rights" :key="item.name">
						<view class="title">{{item.name}}</view>
						<view>{{item.value}}</view>
					</view>
					<!-- <view class="cu-form-group list_item">
						<view class="title">意外住院医疗</view>
						<view>1万</view>
					</view>
					<view class="cu-form-group list_item">
						<view class="title">意外门诊医疗</view>
						<view>5000</view>
					</view>
					<view class="cu-form-group list_item">
						<view class="title">意外住院津贴</view>
						<view>50元/天</view>
					</view> -->
				</view>
				<view class="pro_desc_box">
					<view class="desc_nav">
						<view class="nav_item" 
						:class="navIndex == index? 'text-blue' : ''" 
						v-for="(item, index) in detailsObj.others" :key="index"
						@click="changeNavIndex(index)">{{item.name}}</view>
					</view>
					<view class="desc_content">
						<view v-html="item.value" class="content"  v-if="navIndex == index" v-for="(item, index) in detailsObj.others" :key="index"></view>
					</view>
				</view>
			</view>
		</mescroll-uni>
		<view class="knowledgeEmpty" v-else>
			<image class="pic" src="../../static/img/knowledgeEmpty.png"></image>
		</view>
		<view class="details_bottom_panel" v-if="hasLogin">
			<view class="panel_box">
				<view class="send" @click="leader">
					发给客户
				</view>
				<view class="create" v-if="false">
					生成计划书
				</view>
			</view>
		</view>
		<my-leader v-if="leaderStatus" class="leader" @close="closeLeader"></my-leader>
	</view>
</template>

<script>
	import { getProDetails, getProDetailsByUserId } from '@/api/product.js';
	import { getWechatConfig } from '@/api/wechat.js';
	import getShareConfig from '@/utils/initWeChatShare.js';
	import {getToken, getWechatAuthStatus, getUserId} from '@/utils/auth.js';
	import MyLeader from '@/components/leader/index.vue';
	// #ifdef H5
	var wx = require('jweixin-module')
	// #endif
	export default {
		components:{
			MyLeader
		},
		data() {
			return {
				proId: '',
				detailsObj: {},
				downOption: {
					use: false
				},
				upOption: {
					use: false
				},
				navIndex: 0,
				leaderStatus: false,
			};
		},
		onLoad() {
			this.proId = this.$Route.query.proId
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
					this.getProDetailsHander(res.data.data, this.userId, true) //获取详情
				})
			} 
			if (!this.hasLogin && this.queryUserId) { // 面向通过分享进来的游客
				this.getProDetailsByUserIdHandler()
			}
			if (!this.hasLogin && !this.queryUserId) { // 面向非分享进入且未登录用户
				this.getProDetailsHander(null, null, false)
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
					desc: `${detailsObj.conditions[0].name}:${detailsObj.conditions[0].value};${detailsObj.conditions[1].name}:${detailsObj.conditions[1].value};${detailsObj.conditions[2].name}:${detailsObj.conditions[2].value};${detailsObj.conditions[3].name}:${detailsObj.conditions[3].value};${detailsObj.conditions[4].name}:${detailsObj.conditions[4].value}。`, // 分享描述
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
					desc: `${detailsObj.conditions[0].name}:${detailsObj.conditions[0].value};${detailsObj.conditions[1].name}:${detailsObj.conditions[1].value};${detailsObj.conditions[2].name}:${detailsObj.conditions[2].value};${detailsObj.conditions[3].name}:${detailsObj.conditions[3].value};${detailsObj.conditions[4].name}:${detailsObj.conditions[4].value}。`, // 分享描述
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
						desc: `${detailsObj.conditions[0].name}:${detailsObj.conditions[0].value};${detailsObj.conditions[1].name}:${detailsObj.conditions[1].value};${detailsObj.conditions[2].name}:${detailsObj.conditions[2].value};${detailsObj.conditions[3].name}:${detailsObj.conditions[3].value};${detailsObj.conditions[4].name}:${detailsObj.conditions[4].value}。`, // 分享描述
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
						desc: `${detailsObj.conditions[0].name}:${detailsObj.conditions[0].value};${detailsObj.conditions[1].name}:${detailsObj.conditions[1].value};${detailsObj.conditions[2].name}:${detailsObj.conditions[2].value};${detailsObj.conditions[3].name}:${detailsObj.conditions[3].value};${detailsObj.conditions[4].name}:${detailsObj.conditions[4].value}。`, // 分享描述
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
			closeLeader() {
				this.leaderStatus = false
			},
			changeNavIndex(i) {
				this.navIndex = i
			},
			leader() {
				this.leaderStatus = true
				/* uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 1,
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				}); */
			},
			getProDetailsHander(shareConfig, userId, isInitShare) {
				getProDetails(this.proId).then((res) => {
					this.detailsObj = res.data.data
					if (isInitShare) {
						this.initShareCinfig(shareConfig, res.data.data, userId)
					}
				})
			},
			getProDetailsByUserIdHandler() {
				let obj = {
					productId: this.proId,
					vid: getWechatAuthStatus(),
					userId: this.$Route.query.userId
				}
				getProDetailsByUserId(this.proId, this.queryUserId, obj).then((res) => {
					this.detailsObj = res.data.data
				})
			}
		}
	}
</script>

<style lang="scss">
.pro_details{
	box-sizing: border-box;
	background: #fff;
	box-sizing: border-box;
	height: 100vh;
	.knowledgeEmpty{
		text-align: center;
		.pic{
			margin-top: 50px;
			width: 250px;
			height: 100px;
		}
	}
	.pro_details_content{
		padding: 30rpx;
	}
	.details_bottom_panel{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 80rpx;
		z-index: 99999;
		.panel_box{
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			color: #fff;
			line-height: 80rpx;
		}
		.send{
			flex: 1;
			background: #FF8F23;
		}
		.create{
			flex: 1;
			background: #FF6430;
		}
	}
	.img_box{
		position: relative;
		height: 370rpx;
		&:after{
			position: absolute;
			content: attr(data-company);
			right:0;
			bottom: 40rpx;
			padding: 10rpx 30rpx;
			font-size: 15px;
			background: rgba(243,172,28,0.5);
			border-top-left-radius: 50px;
			border-bottom-left-radius: 50px;
			color: #fff;
			z-index: 999;
		}
		image{
			max-width: 100%;
			width: 100%;
			height: 100%;
		}
	}
	.title_desc{
		padding: 30rpx 0 20rpx;
		.title{
			font-size: 36rpx;
			color: #333;
			font-weight: bold;
			padding-bottom: 10rpx;
		}
		.desc{
			font-size: 32rpx;
			color: #9B9B9B;
		}
	}
	.details_info_box{
		position: relative;
		.list_item{
			padding: 0;
			&::after{
				position: absolute;
				top: 0;
				left: 0;
				box-sizing: border-box;
				width: 200%;
				height: 200%;
				border-bottom: 0.5px solid #ddd;
				border-radius: inherit;
				content: " ";
				-webkit-transform: scale(.5);
				transform: scale(.5);
				-webkit-transform-origin: 0 0;
				transform-origin: 0 0;
				pointer-events: none;
			}
		}
		.title_icon{
			width: 50rpx;
			height: 50rpx;
		}
		.cu-bar{
			.action{
				margin: 0;
			}
		}
	}
	.pro_desc_box{
		.desc_nav{
			display: flex;
			align-items: center;
			line-height: 80rpx;
			justify-content: center;
			.nav_item{
				flex: 1;
				text-align: center;
				position: relative;
				&.text-blue{
					&::after{
						position: absolute;
						content: '';
						width: 70%;
						height: 6rpx;
						background: #0081ff;
						bottom: 0;
						left: 50%;
						transform: translate(-50%, 0);
						border-radius: 2px;
					}
				}
			}
		}
	}
}
</style>
