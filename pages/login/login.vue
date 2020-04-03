<template>
	<view class="login_box">
		<view class="logo_box">
			<image src="../../static/img/logo.png" class="logo"></image>
		</view>
		<view class="login_form">
			<view class="form_box padding flex flex-direction">
				<view class="form_item solid-bottom">
					<text class="cuIcon-mobile input_icon text-gray"></text>
					<input type="number" v-model="mobile" class="mobile_input" @blur="recovery" maxlength="11" placeholder="请输入手机号"/>
					<text v-if="clearMobile" @click="clearMobileFn" class="cuIcon-roundclosefill text-gray clear"></text>
				</view>
				<view class="form_item solid-bottom">
					<text class="cuIcon-lock input_icon text-gray"></text>
					<input type="text" v-model="password" class="pass_input" @blur="recovery" maxlength="20" password="true" placeholder="请输入密码" />
					<text v-if="clearPassword" @click="clearPasswordFn" class="cuIcon-roundclosefill text-gray clear"></text>
				</view>
				<button class="cu-btn bg-gradual-blue submitBtn lg" @click="submit">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				password: '',
				clearMobile: false,
				clearPassword: false,
			};
		},
		watch:{
			mobile: {
				handler() {
					if (this.mobile.length !== 0) {
						this.clearMobile = true
					} else {
						this.clearMobile = false
					}
				}
			},
			password: {
				handler() {
					if (this.password.length !== 0) {
						this.clearPassword = true
					} else {
						this.clearPassword = false
					}
				}
			}
		},
		methods:{
			recovery() {
				window.scroll(0, 0);
			},
			clearMobileFn() {
				this.mobile = ''
			},
			clearPasswordFn() {
				this.password = ''
			},
			submit() {
				let reg = /^(13[0-9]|14[1|4|5|6|7|8|9]|15[0-9]|16[5|6]|17[0-9]|18[0-9]|19[1|8|9])\d{8}$/
				let passRegex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
				if (this.mobile) {
					if (!reg.test(this.mobile)) {
						uni.showToast({
						    title: '手机号格式错误',
						    icon: 'none'
						});
						return
					}
				} else {
					uni.showToast({
					    title: '请填写手机号',
					    icon: 'none'
					});
					return
				}
				
				if (this.password) {
					if (!passRegex.test(this.password)) {
						uni.showToast({
						    title: '密码为6-20位字母数字',
						    icon: 'none'
						});
						return
					}
				} else {
					uni.showToast({
					    title: '请输入密码',
					    icon: 'none'
					});
					return
				}
				let loginForm = {
					mobile: this.mobile,
					password: this.password
				}
				 this.$store.dispatch('user/login', loginForm).then((res) => {
					 // #ifdef H5
					 	this.$Router.push({path: '/pages/own/own'})
					 // #endif
					 
					 // #ifndef H5
					 	this.$Router.pushTab({path: '/pages/own/own'})
					 // #endif
				 }).catch((err) => {
					console.log(err)
				 })
			}
		}
	}
</script>

<style lang="scss">
	.login_box{
		height: 100vh;
		background: #fff;
	}
	.logo_box{
		height: 30vh;
		display: flex;
		align-items: center;
		justify-content: center;
		.logo{
			width: 120rpx;
			height: 120rpx;
		}
	}
	.login_form{
		.form_box{
			.form_item{
				position: relative;
				display: flex;
				padding: 5px 0;
				align-items: center;
				justify-content: center;
				margin-top: 30rpx;
				.input_icon{
					font-size: 40rpx;
				}
				.mobile_input, .pass_input{
					flex: 1;
					padding: 5px 8px;
					height: 80rpx;
				}
				.clear{
					font-size: 40rpx;
					position: absolute;
					top: 50%;
					right: 40rpx;
					transform: translate(0, -50%);
				}
			}
			.submitBtn{
				margin-top: 80rpx;
			}
		}
	}
</style>
