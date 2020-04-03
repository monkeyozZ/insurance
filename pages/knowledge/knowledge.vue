<template>
	<view>
		<qs-tabs :current="current"
		ref="tabs"
		animationMode="line3"
		animationLineWidth="70"
		space="10"
		defaultColor="#333"
		activeColor='#3C82FB'
		:tabs="tabs"
		minWidth="160"
		backgroundColor="#fff"
		line2Style="height: 6rpx"
		:activeBold="false"
		@change="change($event)"/>
		<swiper
		class="swiper_container"
		:current="swiperCurrent" 
		@transition="transition"
		@animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
				<mescroll-uni @init="mescrollInit" class="mescroll" v-if="swiperCurrent == index" bottom="0rpx" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback">
					<view class="list_box">
						<view class="cu-card no-card article" v-for="(item, index) in dataList" :key="index">
							<view class="cu-item shadow" @click="goDetails(item.id)">
								<!-- <view class="title"><view class="text-cut">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</view></view> -->
								<view class="content">
									<image :src="item.cover"
									 mode="aspectFill"></image>
									<view class="desc">
										<view class="text-content"><view class="pro_title"><view class="cu-tag bg-red radius sm" v-if="item.hot">热门</view>{{item.name}}</view></view>
										<view class="bottom_panel">
											<view class="cu-tag auther text-cut">{{item.author}}</view>
											<view class="cu-tag time text-cut">{{item.createTime | parseTimeYMD}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</mescroll-uni>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { getArticleList, getArticleCate } from '@/api/article.js';
	import QsTabs from '@/components/QS-tabs/QS-tabs.vue';
	export default {
		components: {
			QsTabs
		},
		data() {
			return {
				current: 0,
				category: '',
				swiperCurrent: 0,
				swiperHeight: uni.getSystemInfoSync().windowHeight,
				tabs: [],
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
				// 列表数据
				dataList: [],
				mescroll: null
			};
		},
		onLoad() {
			this.getArticleCateHandler()
		},
		onShow() {

		},
		watch:{
			swiperCurrent: {
				handler() {
					this.dataList = []
					if (this.swiperCurrent == 0) {
						this.category = ''
						this.$nextTick(() => {
							this.mescroll.lockUpScroll()
						})
					} else {
						this.category = this.tabs[this.swiperCurrent].code
						this.$nextTick(() => {
							this.mescroll.lockUpScroll(false)
						})
					}
					this.$nextTick(() => {
						this.mescroll.num = 0
						this.mescroll.triggerUpScroll()
					})
				}
			}
		},
		methods: {
			goDetails(id) {
				this.$router.push({path: '/pages/knowledge/details', query: {articleId: id}})
			},
			change(index) {
				this.swiperCurrent = index;
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({detail: { current }}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll
			},
			// 获取栏目分类
			getArticleCateHandler() {
				getArticleCate().then((res) => {
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
						arr.push(item)
					})
					arr.unshift('热门推荐')
					this.tabs = arr
					setTimeout(() => {
						this.$refs.tabs.init()
						this.mescroll.lockUpScroll()
						this.mescroll.triggerUpScroll()
					},0)
					
				})
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
					category: this.category,
					page: pageNum
				}

				getArticleList(data).then((res) =>{
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

<style lang="scss" scoped>
	.mescroll{
		background: #fff;
		.cu-card{
			position: relative;
			&:after{
				content: '';
				position: absolute;
				bottom: 0;
				width: calc(200% - 120rpx);
				left: 30rpx;
				right: 30rpx;
				border-bottom: 1px solid rgba(51,51,51,0.2);
				transform: scale(.5);
				transform-origin: left top;
			}
			.cu-item{
				padding-top: 15px;
			}
			.text-content{
				.cu-tag{
					margin-right: 10rpx;
				}
				.pro_title{
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					font-size: 15px;
					font-weight: bold;
					color: #333;
				}
			}
			.bottom_panel{
				display: flex;
				.auther,.time{
					flex: 1;
					background: transparent;
					margin: 0;
				}
				.auther{
					justify-content: flex-start;
				}
				.time{
					justify-content: flex-end;
				}
			}
		}
	}
</style>
