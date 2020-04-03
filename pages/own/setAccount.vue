<template>
	<view class="set_account_box">
		<view class="set_account_tip text-gray">		
			首次登录后必须修改默认密码，否则造成的损失需经纪人自行承担！
			手机号为您身份唯一识别号，暂不支持自行修改，如需修改手机号请联系管理员。
		</view>
		<view class="account_form">
			<view class="form_box padding flex flex-direction">
				<view class="form_item solid-bottom">
					<text class="input_text">原密码</text>
					<input type="text" v-model="password1" class="pass_input" @blur="recovery" maxlength="20" password="true" placeholder="请填写原密码" />
					<text v-if="clearPassword1" @click="clearPasswordFn1" class="cuIcon-roundclosefill text-gray clear"></text>
				</view>
				<view class="form_item solid-bottom">
					<text class="input_text">新密码</text>
					<input type="text" v-model="password2" class="pass_input" @blur="recovery" maxlength="20" password="true" placeholder="请填写新密码" />
					<text v-if="clearPassword2" @click="clearPasswordFn2" class="cuIcon-roundclosefill text-gray clear"></text>
				</view>
				<view class="form_item solid-bottom">
					<text class="input_text">确认密码</text>
					<input type="text" v-model="password3" class="pass_input" @blur="recovery" maxlength="20" password="true" placeholder="请填写确认密码" />
					<text v-if="clearPassword3" @click="clearPasswordFn3" class="cuIcon-roundclosefill text-gray clear"></text>
				</view>
				<button class="cu-btn bg-gradual-blue submitBtn lg" @click="submit">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {updatePassWord} from '@/api/user.js';
	export default {
		data() {
			return {
				password1: '',
				password2: '',
				password3: '',
				clearMobile: false,
				clearPassword1: false,
				clearPassword2: false,
				clearPassword3: false
			};
		},
		watch:{
			password1: {
				handler() {
					if (this.password1.length !== 0) {
						this.clearPassword1 = true
					} else {
						this.clearPassword1 = false
					}
				}
			},
			password2: {
				handler() {
					if (this.password2.length !== 0) {
						this.clearPassword2 = true
					} else {
						this.clearPassword2 = false
					}
				}
			},
			password3: {
				handler() {
					if (this.password3.length !== 0) {
						this.clearPassword3 = true
					} else {
						this.clearPassword3 = false
					}
				}
			}
		},
		methods:{
			recovery() {
				window.scroll(0, 0);
			},
			clearPasswordFn1() {
				this.password1 = ''
			},
			clearPasswordFn2() {
				this.password2 = ''
			},
			clearPasswordFn3() {
				this.password3 = ''
			},
			submit() {
				let passRegex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/			
				if (this.password1) {
					if (!passRegex.test(this.password1)) {
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
				
				if (this.password2) {
					if (!passRegex.test(this.password2)) {
						uni.showToast({
						    title: '密码为6-20位字母数字',
						    icon: 'none'
						});
						return
					} else{
						if (this.password1 == this.password2) {
							uni.showToast({
							    title: '新密码和旧密码不能一致',
							    icon: 'none'
							});
							return
						}
					}
				} else {
					uni.showToast({
					    title: '请输入新密码',
					    icon: 'none'
					});
					return
				}
				
				if (this.password3) {
					if (!passRegex.test(this.password3)) {
						uni.showToast({
						    title: '密码为6-20位字母数字',
						    icon: 'none'
						});
						return
					} else {
						if (this.password3 !== this.password2) {
							uni.showToast({
							    title: '两次密码不一致',
							    icon: 'none'
							});
							return
						}
					}
				} else {
					uni.showToast({
					    title: '请再次输入密码',
					    icon: 'none'
					});
					return
				}
				let obj = {
					oldPwd: this.password1,
					newPwd: this.password2
				}
				updatePassWord(obj).then((res) => {
					uni.showToast({
					    title: '密码重置成功',
					    icon: 'none'
					});
					this.password1 = ''
					this.password2 = ''
					this.password3 = ''
				})
			}
		}
	}
</script>

<style lang="scss">
.set_account_box{
	padding: 30rpx;
	min-height: 100vh;
	background: #fff;
	.set_account_tip{
		padding: 0 30rpx;
	}
	.account_form{
		.form_box{
			.form_item{
				position: relative;
				display: flex;
				padding: 5px 0;
				align-items: center;
				justify-content: center;
				margin-top: 30rpx;
				.input_text{
					font-size: 28rpx;
				}
				.pass_input{
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
}
</style>
