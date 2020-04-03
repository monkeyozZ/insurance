<template>
	<view class="own_box">
		<mescroll-uni class="mescroll" :down="downOption" :up="upOption">
			<view class="cu-list menu sm-border" @click="editOwnInfo">
				<view class="cu-item arrow avt_box">
					<view class="content">
						<image class="avt png" :src="userInfo.avatar?userInfo.avatar:'/static/img/defautAvt.png'" mode="scaleToFill"></image>
						<text class="text-grey">{{userInfo.name}}</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">编辑个人信息</text>
					</view>
				</view>
			</view>
			<view class="person_nav">
				<ul>
					<li @click="goPerformance">
						<view class="item_content">
							<image class="own_icon" src="/static/img/yeji.png" mode="aspectFit"></image>
							<text class="nav_text">个人业绩</text>
						</view>
					</li>
					<li @click="goVisitorHistory">
						<view class="item_content">
							<image class="own_icon" src="/static/img/zuji.png" mode="aspectFit"></image>
							<text class="nav_text">访客记录</text>
						</view>
					</li>
					<li @click="goCustomer">
						<view class="item_content">
							<image class="own_icon" src="/static/img/kehu.png" mode="aspectFit"></image>
							<text class="nav_text">我的客户</text>
						</view>
					</li>
				</ul>
			</view>
			<view class="navigator_box">
				<view class="cu-list menu sm-border">
					<view class="cu-item arrow" @click="goNotice">
						<view class="content">
							<text class="cuIcon-notificationfill text-blue"></text>
							<text class="text-grey">最新公告</text>
						</view>
					</view>
					<view class="cu-item arrow" @click="goClaimService">
						<view class="content">
							<text class="cuIcon-evaluate_fill text-yellow"></text>
							<text class="text-grey">理赔服务</text>
						</view>
					</view>
					<view class="cu-item arrow" @click="goAboutUs">
						<view class="content">
							<text class="cuIcon-group_fill text-orange"></text>
							<text class="text-grey">关于我们</text>
						</view>
					</view>
					<view class="cu-item arrow" @click="goContact">
						<view class="content">
							<text class="cuIcon-commentfill text-red"></text>
							<text class="text-grey">联系我们</text>
						</view>
					</view>
					<view class="cu-item arrow" @click="goSetAccount">
						<view class="content">
							<text class="cuIcon-settingsfill text-red"></text>
							<text class="text-grey">账号设置</text>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex';
	export default {
		data() {
			return {
				downOption: {
					use: false
				},
				upOption: {
					use: false
				}
			};
		},
		computed:{
			...mapGetters(['userInfo'])
		},
		onReady() {
			console.log(111)
		},
		onShow() {
			this.getUserInfoHandler()
		},
		methods:{
			// 编辑个人资料
			editOwnInfo() {
				this.$Router.push({path: '/pages/own/personInfo'})
			},
			// 个人业绩
			goPerformance() {
				this.$Router.push({path: '/pages/own/performance'})
			},
			// 访客记录
			goVisitorHistory() {
				this.$Router.push({path: '/pages/own/visitorHistory'})
			},
			// 我的客户
			goCustomer() {
				this.$Router.push({path: '/pages/own/customer'})
			},
			//  最新公告
			goNotice() {
				this.$Router.push({path: '/pages/own/notice'})
			},
			//  理赔服务
			goClaimService() {
				this.$Router.push({path: '/pages/own/claimService'})
			},
			//  关于我们
			goAboutUs() {
				this.$Router.push({path: '/pages/own/aboutUs'})
			},
			//  联系我们
			goContact() {
				this.$Router.push({path: '/pages/own/contact'})
			},
			//账号设置
			goSetAccount() {
				this.$Router.push({path: '/pages/own/setAccount'})
			},
			//获取当前登录用户的信息
			getUserInfoHandler() {
				this.$store.dispatch('user/getInfo').then((res) => {
					// console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.own_box{
		.cu-list{
			.avt_box{
				padding-top: 20rpx;
				padding-bottom: 20rpx;
				.content{
					.avt{
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
					}
				}
			}
		}
		.person_nav{
			margin: 20rpx 0;
			background: #fff;
			padding: 20rpx 0;
			ul{
				padding: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				li{
					position: relative;
					flex: 1;
					list-style: none;
					.item_content{
						display: flex;
						text-align: center;
						align-items: center;
						justify-content: center;
						.own_icon{
							width: 60rpx;
							height: 60rpx;
							margin-right: 10rpx;
						}
						.nav_text{
							color: #7F7F7F;
							font-size: 28rpx;
						}
					}
					&:not(:last-child){
						&:after{
							position: absolute;
							display: block;
							content: '';
							height: 40%;
							width: 1px;
							background: rgba(51,51,51,0.2);
							top: 50%;
							right: 0;
							transform: translate(0, -50%);
						}
					}
				}
			}
		}
	}
</style>
