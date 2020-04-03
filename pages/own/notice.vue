<template>
	<view class="notice">
		<mescroll-uni class="mescroll" top="0" bottom="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback">
			<view class="cu-list menu-avatar notice_list">
				<view class="cu-item " v-for="(item, index) in dataList" :key="index" @click="goDetails(item.id)">
					<view class="cu-avatar bg-green cuIcon-notificationfill round lg"></view>
					<view class="content">
						<view class="text-gray">
							<view class="text-cut text-bold title">{{item.name}}</view>
						</view>
						<view class="text-gray text-sm flex"> <view class="text-cut">{{item.createTime | parseTimeYMD}}</view></view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import {getNoticeList} from '@/api/company.js';
	export default {
		data() {
			return {
				downOption: {
					use: true,
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					offset: 50, // 在列表顶部,下拉大于80upx,松手即可触发下拉刷新的回调
				},
				upOption: {
					use: true,
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
				},
				dataList: []
			};
		},
		methods:{
			goDetails(id) {
				this.$Router.push({path: '/pages/own/noticeDetails',query:{
					noticeId: id
				}})
			},
			//下拉刷新
			downCallback(mescroll){
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调*/
			upCallback(mescroll) {
				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num; // 页码, 默认从1开始
				// let pageSize = mescroll.size; // 页长, 默认每页10条
				let data = {
					page: pageNum
				}
			
				getNoticeList(data).then((res) =>{
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
			}
		}
	}
</script>

<style lang="scss">
.notice_list{
	.title{
		color: #333;
		margin-right: 20rpx;
	}
	.content{
		left: 180rpx!important;
		width: calc(100% - 60rpx - 128rpx)!important;
		margin-right: 0;
	}
}
</style>
