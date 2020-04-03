<template>
	<view>
		<iframe :src="detailsObj.thirdPartyUrl" class="web_view" :style="{height: hasLogin?'100vh':'80vh'}"></iframe>
		<view class="idCard_box bg-blue">
			<view class="tip">
				客户承保信息提交后在这里提交客户标识以便核对，如未及时录入导致业绩缺失自行负责。
			</view>
			<view class="idCard_input_box" v-if="!hasLogin">
				<input type="text" class="idCard_input" placeholder-style="color: #fff" v-model="idCard" @blur="recovery" placeholder="客户承保信息提交后在此输入身份证号" />
				<button class="cu-btn bg-green submitBtn lg" @click="submit">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { getProDetails, getProDetailsByUserId, saveidCard } from '@/api/product.js';
	import { getWechatConfig } from '@/api/wechat.js';
	import getShareConfig from '@/utils/initWeChatShare.js';
	import {getToken, getWechatAuthStatus, getUserId} from '@/utils/auth.js';
	// #ifdef H5
	var wx = require('jweixin-module')
	// #endif
	export default {
		data() {
			return {
				idCard: '',
				proId: '',
				detailsObj: {},
			}
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
		methods: {
			recovery() {
				window.scroll(0, 0);
			},
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
					desc: `该产品由纵横融通为您整理并由${detailsObj.company}为您承保和负责理赔相关事宜。`, // 分享描述
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
					desc: `该产品由纵横融通为您整理并由${detailsObj.company}为您承保和负责理赔相关事宜。`, // 分享描述
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
						desc: `该产品由纵横融通为您整理并由${detailsObj.company}为您承保和负责理赔相关事宜。`, // 分享描述
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
						desc: `该产品由纵横融通为您整理并由${detailsObj.company}为您承保和负责理赔相关事宜。`, // 分享描述
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
			},
			submit() {
				if (this.idCard.length == 0) {
					uni.showToast({
					    title: '请填写身份证号',
					    icon: 'none'
					});
					return
				}
				if (!this.checkIdcard(this.idCard)) {
					uni.showToast({
					    title: '身份证号格式错误',
					    icon: 'none'
					});
					return
				}
				let obj = {
					cardId: this.idCard,
					productId: this.proId,
					agentId: this.queryUserId
				}
				saveidCard(obj).then((res) => {
					uni.showToast({
					    title: '提交成功',
					    icon: 'none'
					});
					this.idCard = ''
				})
				
			},
			checkIdcard (value) {
			      if (value.length === 0) {
			        return true
			      } else {
			        var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
			        var status = regIdCard.test(value)
			        if (status) {
			          if (value.length === 18) {
			            var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 将前17位加权因子保存在数组里
			            var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2] // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
			            var idCardWiSum = 0 // 用来保存前17位各自乖以加权因子后的总和
			            for (var i = 0; i < 17; i++) {
			              idCardWiSum += value.substring(i, i + 1) * idCardWi[i]
			            }
			
			            var idCardMod = idCardWiSum % 11 // 计算出校验码所在数组的位置
			            var idCardLast = value.substring(17) // 得到最后一位身份证号码
			
			            // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
			            if (idCardMod === 2) {
			              if (idCardLast === 'X' || idCardLast === 'x') {
			                // alert("恭喜通过验证啦！");
			                return true
			              } else {
			                // alert("身份证号码错误！");
			                return false
			              }
			            } else {
			              // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
			              if (idCardLast === idCardY[idCardMod].toString()) {
			                // alert("恭喜通过验证啦！");
			                return true
			              } else {
			                // alert("身份证号码错误！");
			                return false
			              }
			            }
			          }
			        } else {
			          // alert("身份证格式不正确!")
			          return false
			        }
			      }
			    },
		}
	}
</script>

<style lang="scss" scoped>
.web_view{
	width: 100%;
	height: 80vh;
	border: none;
}
.idCard_box{
	position: fixed;
	width: 100%;
	height: 20vh;
	padding: 3px 15px;
	text-align: center;
	.idCard_input_box{
		display: flex;
		margin-top: 2px;
		.idCard_input{
			flex: 1;
			padding: 5px 8px;
			height: 80rpx;
			border: 1px solid #eee;
			border-radius: 4px;
			margin-right: 5px;
			text-align: left;
		}
	}
}
</style>
