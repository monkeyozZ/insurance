<template>
	<view>
		<view class="info_box">
			<view class="cu-list menu sm-border">
				<view class="cu-item arrow avt_box" @click="ChooseAvt">
					<view class="content" hover-class="none" url="" open-type="redirect">
						<text class="cuIcon-myfill text-grey"></text>
						<text class="text-grey">头像</text>
					</view>
					<view class="action">
						<image class="avt png" :src="userInfo.avatar?userInfo.avatar:avtImg[0]" mode="scaleToFill"></image>
					</view>
				</view>
				
				<view class="cu-item arrow">
					<view class="content" hover-class="none" url="" open-type="redirect">
						<text class="cuIcon-myfill text-grey"></text>
						<text class="text-grey">{{userInfo.name}}</text>
					</view>
				</view>
				
				<view class="cu-item arrow">
					<view class="content" hover-class="none" url="" open-type="redirect">
						<text class="cuIcon-locationfill text-grey"></text>
						<text class="text-grey">{{userInfo.address}}</text>
					</view>
				</view>
				
				<view class="cu-item arrow">
					<view class="content" hover-class="none" url="" open-type="redirect">
						<text class="cuIcon-card text-grey"></text>
						<text class="text-grey">{{userInfo.jobLevel}}</text>
					</view>
				</view>
				
				<view class="cu-item arrow">
					<view class="content" hover-class="none" url="" open-type="redirect">
						<text class="cuIcon-mobilefill text-grey"></text>
						<text class="text-grey">{{userInfo.mobile}}</text>
					</view>
				</view>
				
				<view class="cu-item arrow lastBoredrTop" @click="editAccountHandler">
					<view class="content" hover-class="none" url="" open-type="redirect">
						<text class="cuIcon-weixin text-grey"></text>
						<text class="text-grey">{{userInfo.wechatAccount?userInfo.wechatAccount:'暂未设置,立即添加'}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-form-group wechat_box">
			<view class="grid col-1 grid-square flex-sub">
				<view class="bg-img"  @tap="ViewImage" data-url="weChatImg[0]" v-if="userInfo.qrCode">
				 <image :src="userInfo.qrCode" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="chooseBox" @tap="ChooseImage" v-if="!userInfo.qrCode">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
			<view class="grid col-3 grid-square descText">
				<text class="block">微信二维码</text>
				<text class="block">二维码可显示在个人微名片上</text>
			</view>
		</view>
		<view class="cu-modal" :class="editWechatAccount?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">编辑微信号</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl bg-white">
					<input type="text" class="weChatAccount" v-model="weChatAccount" placeholder="请输入微信号" @blur="recovery" />
					<text class="text-red errMsg">{{errMsg}}</text>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-blue" @tap="hideModal">取消</button>
						<button class="cu-btn bg-blue margin-left" @tap="confirmEdit">确定</button>
		
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {updateUserInfo} from '@/api/user.js';
	import {mapGetters} from 'vuex';
	import lrz from 'lrz';
	export default {
		data() {
			return {
				avtImg: ['/static/img/defautAvt.png'],
				weChatImg: [],
				editWechatAccount: false,
				weChatAccount: '',
				errMsg: ''
			};
		},
		computed:{
			...mapGetters(['userInfo'])
		},
		mounted() {
			/* setTimeout(() => {
				this.weChatAccount = this.userInfo.wechatAccount? this.userInfo.wechatAccount : ''
				this.weChatImg = this.userInfo.qrCode ? [this.userInfo.qrCode] : []
			}, 200) */
		},
		methods:{
			recovery() {
				window.scroll(0, 0);
			},
			confirmEdit() {
				this.errMsg = ''
				if(this.weChatAccount.length == 0) {
					this.errMsg = '请输入您的微信号'
					return
				}
				let obj = {
					name: 'wechatAccount',
					value: this.weChatAccount
				}
				updateUserInfo(obj).then((res) => {
					this.editWechatAccount = false
					this.$store.dispatch('user/getInfo')
				}).catch((err) => {
					this.weChatAccount = ''
					this.editWechatAccount = false
				})
			},
			editAccountHandler() {
				this.editWechatAccount = true
			},
			hideModal() {
				this.editWechatAccount = false
				this.errMsg = ''
			},
			ViewImage(e) {
				uni.previewImage({
					urls: [this.userInfo.qrCode],
					current: this.userInfo.qrCode
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '提示',
					content: '确定要删除当前微信二维码吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.weChatImg.splice(0, 1)
							let obj = {
								name: 'qrCode',
								value: ''
							}
							this.updateUserInfoHandler(obj)
						}
					}
				})
			},
			ChooseAvt() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.avtImg = res.tempFilePaths
						lrz(res.tempFiles[0].path).then((ret) => {
							let obj = {
								name: 'avatar',
								value: ret.base64
							}
							this.updateUserInfoHandler(obj)
						}).catch((err) => {
							console.log(err)
						})
						/* uni.getFileSystemManager().readFile({
							filePath: res.tempFilePaths[0], //选择图片返回的相对路径
							encoding: 'base64', //编码格式
							success: function(res2) {
								//成功的回调
								console.log(ress);
								let base64 = 'data:image/jpeg;base64,' + res2.data;
								this.avtImg = base64
							},
							fail: function(err) {
								console.log(err);
							}
						}); */
					}
				});
			},
			updateUserInfoHandler(data) {
				updateUserInfo(data).then((res) => {
					uni.showToast({
					    title: '信息更新成功',
					    icon: 'none'
					});
					this.$store.dispatch('user/getInfo')
				})
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.weChatImg = res.tempFilePaths
						lrz(res.tempFiles[0].path).then((ret) => {
							let obj = {
								name: 'qrCode',
								value: ret.base64
							}
							this.updateUserInfoHandler(obj)
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.info_box{
		.cu-list{
			.cu-item{
				&.avt_box{
					padding-top: 20rpx;
					padding-bottom: 20rpx;
				}
				&.lastBoredrTop{
					&::after{
						border-bottom: 1rpx solid #ddd;
					}
				}
				.action{
					.avt{
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
						vertical-align: middle;
					}
				}
			}
		}
	}
	.wechat_box{
		align-items: flex-start;
		padding-top: 10px;
		.descText{
			align-items: flex-start;
			justify-content: flex-end;
			.block{
				width: 90%;
				line-height: 48rpx;
				box-sizing: border-box;
				text-align: left;
				font-size: 32rpx;
				&:last-child{
					color: #8799a3;
					font-size: 28rpx;
				}
			}
		}
		.chooseBox{
			border: 4rpx dashed #eee;
		}
	}
	.weChatAccount{
		border: 1px solid #eee;
		padding: 10rpx;
		line-height: 28px;
		height: 40px;
		box-sizing: border-box;
		margin-bottom: 4px;
		background: #eee;
		border-radius: 4px;
	}
	.errMsg{
		display: inline-block;
		font-size: 12px;
		line-height: 14px;
		
	}
</style>
