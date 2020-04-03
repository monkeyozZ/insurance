<template>
	<view>
		<view class="date_cate_select">
			<view class="date">
				<my-select :childValue="date" @getData="getData" placeholder="起始日期" timeType="month" :minSelect="from_minSelect" :maxSelect="from_maxSelect"></my-select>
				<text class="cuIcon-triangledownfill"></text>
			</view>
			<!-- <view class="cate">
				<picker mode="selector" :value="cateIndex" :range="cateArr" @change="PickerChange">
					{{cateArr[cateIndex]}}
				</picker>
				<text class="cuIcon-triangledownfill"></text>
			</view> -->
		</view>
		<view class="money_list_box">
			<mescroll-uni class="mescroll" @init="mescrollInit" top="80" bottom="0" :down="downOption" :up="upOption">
				<ul v-if="dataObj">
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">首期佣金</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">+{{dataObj.firstCommission}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">续期佣金</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">+{{dataObj.renewCommission}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">继续率奖金</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">+{{dataObj.renewRateBonus}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">长期服务奖</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">+{{dataObj.longtimeServiceBonus}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">岗位工资</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">+{{dataObj.salary}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">满勤活动奖</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">+{{dataObj.fullWorkMoney}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">部管理津贴</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">+{{dataObj.dptManageAllowance}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">区管理津贴</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">+{{dataObj.areaManageAllowance}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">部育成津贴</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">+{{dataObj.dptGrowUpAllowance}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">区育成津贴</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">+{{dataObj.areaGrowUpAllowance}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">经纪人年终奖</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">+{{dataObj.agentAnnualBonus}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">销售经理年终奖</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">+{{dataObj.managerAnnualBonus}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">销售总监年终奖</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">+{{dataObj.directorAnnualBonus}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">社保个人扣除</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">{{dataObj.personSocialSecurity}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">社保公司扣除</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">{{dataObj.enterpriseSocialSecurity}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">公积金个人扣除</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">{{dataObj.personFund}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">公积金公司扣除</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">{{dataObj.enterpriseFund}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">考勤扣款</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">{{dataObj.attendanceReduce}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">员工福利</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">+{{dataObj.welfareMoney}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">其他加扣款</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">{{dataObj.other}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">车险佣金</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">+{{dataObj.vehicleCommission}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">非车险佣金</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">+{{dataObj.noneVehicleCommission}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">税前薪资</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">+{{dataObj.pretaxSalary}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">个人所得税</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">-{{dataObj.personTax}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">税后扣款</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">{{dataObj.afterTaxReduce}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">税后薪资</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">+{{dataObj.afterTaxSalary}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">应发薪资</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">{{dataObj.grossPay}}元</text>
					</li>
					<li>
						<text class="cuIcon-moneybag text-yellow money_icon"></text>
						<view class="content">
							<text class="title">实发薪资</text>
							<text class="time text-gray">2020/1/20</text>
						</view>
						<text class="money_num text-red">{{dataObj.actualPay}}元</text>
					</li>
				</ul>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import mySelect from '@/components/dy-Date/dy-Date.vue'
	import {getSalarySlip} from '@/api/user.js';
	export default {
		components:{
			mySelect
		},
		data() {
			return {
				downOption: {
					use: false
				},
				upOption: {
					use: false
				},
				date: '',
				from_minSelect: '2000/01/01',
				from_maxSelect: '2050/12/31',
				mescroll: null,
				/* cateIndex: 0,
				cateArr: ['所有险种','中国平安','中国人寿','新华保险','泰康保险'], */
				dataObj: {}
			};
		},
		mounted() {
			let time = new Date();
			time.setTime(time.getTime());
			// this.date = time.getFullYear()+"/" + (time.getMonth()+1) + "/" + time.getDate()
			this.date = time.getFullYear()+"/" + ((time.getMonth()+1) < 10 ? `0${(time.getMonth()+1)}`: (time.getMonth()+1)) + "/" + time.getDate()
			//获取列表
			this.getSalarySlipHandler()
		},
		methods:{
			mescrollInit(mescroll) {
				this.mescroll = mescroll
			},
			PickerChange(e) {
				this.cateIndex = e.detail.value
			},
			getData(val) {
				let time = new Date();
				this.date = val + "/" + time.getDate()
				this.getSalarySlipHandler()
			},
			getSalarySlipHandler() {
				let obj = {
				date: `${this.date.split('/')[0]}/${this.date.split('/')[1]}`
				}
				getSalarySlip(obj).then((res) => {
					this.dataObj = res.data.data
					if (res.data.data == '') {
						this.mescroll.showEmpty()
					} else {
						this.mescroll.removeEmpty()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.date_cate_select{
	display: flex;
	line-height: 80rpx;
	background: #fff;
	padding: 0 30rpx;
	.date,.cate{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/* .date{
		position: relative;
		&::after{
			content: '';
			position: absolute;
			right: 0;
			top: 50%;
			width: 1px;
			height: 50%;
			background: #eee;
			transform: translate(0,-50%);
		}
		
	} */
}
.money_list_box{
	ul{
		padding: 0;
		overflow: hidden;
		li{
			list-style: none;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #fff;
			margin-top: 20rpx;
			padding: 20rpx 30rpx;
			&:not(:first-child){
				margin-top: 10rpx;
			}
			.money_icon{
				font-size: 30px;
			}
			.content{
				display: flex;
				flex-direction: column;
				flex: 1;
				padding-left: 20px;
				box-sizing: border-box;
				overflow: hidden;
				.title,.time{
					line-height: 40rpx;
				}
			}
		}
	}
}
</style>
