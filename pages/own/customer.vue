<template>
	<view>
		<view class="pending_resolved">
			<view class="pending" @click="changeIndex(0)" :class="tabIndex == 0 ? 'text-blue': ''">跟进中</view>
			<view class="resolved" @click="changeIndex(1)" :class="tabIndex == 1 ? 'text-blue': ''">已完结</view>
		</view>
		<view class="person_list_box">
			<mescroll-uni class="mescroll" @init="mescrollInit" top="82" bottom="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback">
				<ul>
					<li v-for="(item, index) in dataList" :key="index">
						<view class="people_icon">
							<image :src="item.gender == '男' ? '../../static/img/men.png' : '../../static/img/women.png'" mode="aspectFit" class="avt"></image>
						</view>
						<view class="content" @click="goCustomerDetails(item.id)">
							<view class="title">
								{{item.name}}
								<text class="cuIcon-right right text-gray"></text>
							</view>
							<text class="desc text-gray text-cut">{{item.remark}}</text>
						</view>
						<text class="cuIcon-dianhua phone text-blue" @click="callFn(item.mobile)"></text>
					</li>
				</ul>
			</mescroll-uni>
		</view>
		<view class="fab" @click="goAddCustomer">
			<text class="cuIcon-add text-white add"></text>
		</view>
	</view>
</template>

<script>
	import {getCustomerList} from '@/api/own.js';
	export default {
		data() {
			return {
				// 下拉刷新的常用配置
				downOption: { 
					use: true, // 是否启用下拉刷新; 默认true
					auto: false, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					offset: 50, // 在列表顶部,下拉大于80upx,松手即可触发下拉刷新的回调
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					},
					textNoMore: '没有更多了',
					toTop: {
						 src : '' ,
					}
					// onScroll: true // 是否监听滚动事件, 默认false (配置为true时,可@scroll="scroll"获取到滚动条位置和方向)
				},
				tabIndex: 0,
				dataList: []
			};
		},
		onShow() {
			this.$nextTick(() => {
				this.mescroll.resetUpScroll()
			})
		},
		methods:{
			changeIndex(index) {
				this.tabIndex = index
				this.mescroll.resetUpScroll()
			},
			callFn(number) {
				uni.makePhoneCall({
				    phoneNumber: number
				});
			},
			//下拉刷新
			downCallback(mescroll){
				mescroll.resetUpScroll()
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll
			},
			/*上拉加载的回调*/
			upCallback(mescroll) {
				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num; // 页码, 默认从1开始
				// let pageSize = mescroll.size; // 页长, 默认每页10条
				let data = {
					status: this.tabIndex == 0?'PROCESSING':'COMPLETE',
					page: pageNum
				}
			
				getCustomerList(data).then((res) =>{
					let curPageData = res.data.data;
					//设置列表数据
					if(mescroll.num == 1) this.dataList = []; //如果是第一页需手动置空列表
					if (curPageData) {
						this.dataList = this.dataList.concat(curPageData); //追加新数据
					}							
					mescroll.endSuccess(curPageData.length);
				}).catch((err) => {
					// 失败隐藏下拉加载状态
					mescroll.endErr()
				})
			},
			goCustomerDetails(id) {
				this.$Router.push({path: '/pages/own/customerInsetAndDetails', query:{
					customerId: id,
					isEdit: true
				}})
			},
			goAddCustomer() {
				this.$Router.push({path: '/pages/own/customerInsetAndDetails'})
			}
		}
	}
</script>

<style lang="scss">
.pending_resolved{
	display: flex;
	line-height: 80rpx;
	background: #fff;
	padding: 0 30rpx;
	border-bottom: 1px solid #eee;
	.pending,.resolved{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.pending{
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
		
	}
}
.person_list_box{
	ul{
		background: #fff;
		padding: 0;
		overflow: hidden;
		li{
			position: relative;
			list-style: none;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20rpx 30rpx;
			&::after{
				position: absolute;
				content: '';
				bottom: 0;
				left: 0;
				width: 180%;
				height: 1px;
				transform: translate(-22%,0) scale(0.5);
				background: #eee;
			}
			.people_icon{
				width: 80rpx;
				height: 80rpx;
				.avt{
					height: 80rpx;
				}
			}
			.content{
				display: flex;
				flex-direction: column;
				flex: 1;
				padding-left: 20px;
				padding-right: 10px;
				box-sizing: border-box;
				overflow: hidden;
				.title,.desc{
					line-height: 40rpx;
				}
			}
			.title{
				.right{
					margin-left: 10rpx;
				}
			}
			.phone{
				width: 40rpx;
				font-size: 40rpx;
			}
		}
	}
}
.fab{
	position: fixed;
	width: 100rpx;
	height: 100rpx;
	text-align: center;
	line-height: 100rpx;
	right: 80rpx;
	bottom: 80rpx;
	background: #007aff;
	border-radius: 50%;
	box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
	z-index: 99999;
	.add{
		font-size: 60rpx;
	}
}
</style>
