<template>
	<view>
		<view class="statistics bg-blue" ref="header_nav">
			<view class="tab_title_box">
				<text class="title_text">累计访客(人)</text>
				<text class="title_text">昨日访客(人)</text>
				<text class="title_text">今日访客(人)</text>
			</view>
			<view class="tab_value_box">
				<text class="value_num"><text class="cuIcon-loading2 cuIconfont-spin loading" v-if="total == null"></text>{{total}}</text>
				<text class="value_num"><text class="cuIcon-loading2 cuIconfont-spin loading" v-if="yesterday == null"></text></uni-icon>{{yesterday}}</text>
				<text class="value_num"><text class="cuIcon-loading2 cuIconfont-spin loading" v-if="today == null"></text></uni-icon>{{today}}</text>
			</view>
		</view>
		<mescroll-uni class="mescroll" @init="mescrollInit" :top="top" bottom="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback">
			<view class="cu-list menu-avatar message_list">
				<view class="cu-item " v-for="(item, index) in dataList" :key="index" @click="goDetails(item.category, item.targetId)">
					<view class="cu-avatar radius lg" :style="{'background-image':`url(${item.avatar})`}"></view>
					<view class="content">
						<view class="text-gray">
							<view class="text-cut"><text class="text-bold name">{{item.visitorName}}</text>于{{item.createTime | parseTimeYMD}}阅读了：</view>
						</view>
						<view class="text-gray text-sm flex"> <view class="text-cut">{{item.targetName}}</view></view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.createTime | parseTimeHI}}</view>
						<view class="cu-tag round bg-white sm"></view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import {getVisitorCount, getVisitorList} from '@/api/own.js';
	export default {
		data() {
			return {
				// 下拉刷新的常用配置
				downOption: { 
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
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
				dataList: [],
				top: null,
				yesterday: null,
				total: null,
				today: null
			};
		},
		mounted() {
			let statistics =  uni.createSelectorQuery().in(this).select('.statistics')
			statistics.fields({
				size: true
			}, data => {
				if (data) {
					this.top = (data.height)*2
				}
			}).exec();
			
			this.getVisitorCountHandler()
		},
		methods:{
			// 详情
			goDetails(cate, id) {
				if (cate == 'ARTICLE') {
					this.$router.push({path: '/pages/knowledge/details', query: {articleId: id}})
				} else {
					this.$Router.push(
						{
							path: '/pages/product/details',
							query: {proId: id}
						}
					)
				}
			},
			getVisitorCountHandler() {
				getVisitorCount().then((res) => {
					this.yesterday = res.data.data.yesterday
					this.total = res.data.data.total
					this.today = res.data.data.today
				})
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
					page: pageNum
				}
			
				getVisitorList(data).then((res) =>{
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
		}
	}
</script>

<style lang="scss">
	.statistics{
		display: flex;
		flex-direction: column;
		padding: 16rpx 30rpx;
		.tab_title_box,.tab_value_box{
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			.title_text,.value_num{
				flex: 1;
				.loading{
					font-size: 24px;
				}
			}
		}
		.tab_title_box{
			font-size: 30rpx;
			color: #fff;
			font-weight: bold;
		}
		.tab_value_box{
			font-size: 28rpx;
			color: #fff;
			line-height: 48rpx;
		}
	}
	.message_list{
		.name{
			color: #333;
			margin-right: 20rpx;
		}
	}
</style>
