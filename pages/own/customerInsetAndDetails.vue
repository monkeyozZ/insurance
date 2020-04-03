<template>
	<view class="customerDetailsBox cu-list">
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text>
				<text class="text-black">客户姓名</text>
			</view>
		</view>
		<view class="cu-form-group customer_name">
			<input placeholder="请填写客户姓名" @blur="recovery" :disabled="disable" class="name_input" v-model="name"></input>
			<switch class='switch-sex blue radius sex' @change="SwitchSexFn" :disabled="disable" :class="SwitchSex?'checked':''" :checked="SwitchSex?true:false"></switch>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text>
				 <text class="text-black">选择意向产品</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">
				请选择产品
			</view>
			<picker mode="selector" :value="cateIndex" :disabled="disable" :range="cateArr" @change="PickerCateChange">
				<view class="picker">
					{{cateArr[cateIndex]}}
				</view>
			</picker>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text>
				 <text class="text-black">手机号</text>
			</view>
		</view>
		<view class="cu-form-group customer_name">
			<input placeholder="请填写手机号" @blur="recovery" :disabled="disable" class="name_input" maxlength="11" v-model="mobile"></input>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text>
				 <text class="text-black">描述</text>
			</view>
		</view>
		<view class="cu-form-group customer_name">
			<textarea placeholder="请填写描述" @blur="recovery" :disabled="disable" class="name_input" v-model="remark"></textarea>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text>
				 <text class="text-black">跟进状态</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">
				请选择跟进状态
			</view>
			<picker mode="selector" :value="statusIndex" :disabled="disable" :range="statusArr" @change="PickerStatusChange">
				<view class="picker">
					{{statusArr[statusIndex]}}
				</view>
			</picker>
		</view>
		<view class="flex flex-direction padding margin-top-xl">
			<button class="cu-btn bg-gradual-blue submitBtn lg" @click="saveAndEditCustomerHandler">{{btnText}}</button>
		</view>
	</view>
</template>

<script>
	import {saveCustomer, getCustomerDetail} from '@/api/own.js';
	import {getProCate} from '@/api/product.js';
	export default {
		data() {
			return {
				name: '',
				mobile: '',
				remark: '',
				SwitchSex: true,
				cateIndex: 0,
				proCateId: null,
				statusIndex: 0,
				cateArr: [],
				proCategory: [],
				statusArr: ['已完成', '跟进中'],
				isEdit: false,
				customerId: null,
				btnText: '保存',
				disable: false
			};
		},
		watch:{
			isEdit: {
				handler() {
					if (this.isEdit) {
						this.getCustomerDetailHandler()
						this.disable = true
						this.btnText = '编辑'
					} else{
						this.disable = false
						this.btnText = '保存'
					}
				},
				immediate: true
			}
		},
		mounted() {
			this.getProCateHandler()
		},
		onLoad() {
			if (this.$Route.query.isEdit && JSON.parse(this.$Route.query.isEdit)) {
				this.isEdit = JSON.parse(this.$Route.query.isEdit)
			} else {
				this.isEdit = false
			}
			
			if (this.$Route.query.customerId) {
				this.customerId = this.$Route.query.customerId
			} else {
				this.customerId = null
			}
		},
		methods:{
			resetForm() {
				this.name = ''
				this.SwitchSex = true
				this.cateIndex = 0
				this.mobile = ''
				this.remark = ''
				this.statusIndex = 0
			},
			getCustomerDetailHandler() {
				getCustomerDetail(this.customerId).then((res) => {
					let dataObj = res.data.data
					this.name = dataObj.name
					this.SwitchSex = dataObj.gender == '男'?true:false
					let cateIndex = this.cateArr.findIndex((item) => {
						return item == dataObj.productCategory
					})
					this.cateIndex = cateIndex
					this.mobile = dataObj.mobile
					this.remark = dataObj.remark
					this.statusIndex = dataObj.processStatus == 'COMPLETE'?0:1
				})
			},
			saveAndEditCustomerHandler() {
				if (this.isEdit == true) {
					this.isEdit = false
					return
				}
				let reg = /^(13[0-9]|14[1|4|5|6|7|8|9]|15[0-9]|16[5|6]|17[0-9]|18[0-9]|19[1|8|9])\d{8}$/
				if (this.name == '') {
					uni.showToast({
					    title: '请输入姓名',
					    icon: 'none'
					});
					return
				}
				if (this.mobile == '') {
					uni.showToast({
					    title: '请输入姓名',
					    icon: 'none'
					});
					return
				} else if(!reg.test(this.mobile)) {
					uni.showToast({
					    title: '手机号码格式错误',
					    icon: 'none'
					});
				}
				let obj = {
					id: this.customerId,
					name: this.name,
					gender: this.SwitchSex?'男':'女',
					productCategory: this.cateArr[this.cateIndex],
					mobile: this.mobile,
					remark: this.remark,
					processStatus: this.statusIndex == 0?'COMPLETE':'PROCESSING'
				}
				saveCustomer(obj).then((res) => {
					uni.showToast({
					    title: this.customerId ? '客户修改成功' :'客户添加成功',
					    icon: 'none'
					});
					setTimeout(() => {
						this.resetForm()
						history.back(-1)
					},1500)
				})
			},
			// 获取栏目分类
			getProCateHandler() {
				getProCate().then((res) => {
					this.proCategory = res.data.data
					let categoryData = res.data.data
					let arr = []
					categoryData.sort((a, b) => {
					  var order1 = a.order
					  var order2 = b.order
					  if (order1 < order2) {
							return -1;
						} else if (order1 > order2) {
							return 1;
						} else {
							return 0;
						}
					}).map((item) => {
						arr.push(item.name)
					})
					arr.unshift('所有险种')
					this.cateArr = arr
				})
			},
			SwitchSexFn() {
				this.SwitchSex = !this.SwitchSex
			},
			PickerCateChange(e) {
				this.cateIndex = e.detail.value
			},
			PickerStatusChange(e) {
				this.statusIndex = e.detail.value
			},
			btnClick() {
				if (!this.isEdit) {
					console.log('保存')
				} else {
					console.log('修改')
				}
			},
			recovery() {
				window.scroll(0, 0);
			}
		}
	}
</script>

<style lang="scss">
.customerDetailsBox{
	background: #fff;
	.switch-sex{
		&::after{
			content: '男';
		}
		&::before{
			content: '女';
		}
	}
	.customer_name{
		display: flex;
		.name_input{
			flex: 1;
			margin-right: 40rpx;
		}
		.sex{
			
		}
	}
}
</style>
