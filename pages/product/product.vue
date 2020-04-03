<template>
	<view class="content">
		<view class="filter_box" v-if="showFliter" :animation="animationData">
			<my-search @back="backFn" @refresh="searchFn"></my-search>
		</view>
		<view class="slide_nav_box">
			<view class="tabs">
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
			</view>
			<view class="fliter" @click="search">
				<text class="text-gray cuIcon-filter"></text>
			</view>
		</view>
		<swiper
		class="swiper_container"
		:current="swiperCurrent" 
		@transition="transition"
		@animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
				<mescroll-uni class="mescroll" @init="mescrollInit" v-if="swiperCurrent == index" bottom="0rpx" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback">
					<view class="list_box" v-if="dataList.length !== 0">
							<text class="title" v-if="recommendPro.startPrice">精品推荐</text>
							<ul v-if="swiperCurrent !== chexianIndex">
								<li class="shadow-warp bg-white" v-show="recommendPro.startPrice" @click="goDetails(recommendPro.id, recommendPro.thirdParty, recommendPro.thirdPartyUrl)">
									<view class="img_box" :data-tag="recommendPro.categories[0]" :data-company="recommendPro.company">								
										<image :src="recommendPro.cover" mode="scaleToFill" lazy-load="true">								
									</view>
									<view class="pro_info">
										<view class="desc_price">
											<view class="desc">
												<text v-if="recommendPro.conditions[4]">{{recommendPro.conditions[4].value}}</text>
												<text>保额</text>
											</view>
											<view class="desc border_right">
												<text v-if="recommendPro.conditions[2]">{{recommendPro.conditions[2].value}}</text>
												<text>保障期限</text>
											</view>
											<view class="price">
												<text><text class="money">&yen;</text>{{recommendPro.startPrice}}<text class="qi">起</text> </text>
											</view>
										</view>
									</view>
								</li>
								<li class="shadow-warp bg-white" v-for="(item, index) in dataList" :key="index" @click="goDetails(item.id, item.thirdParty, item.thirdPartyUrl)">
									<view class="img_box" :data-tag="item.categories[0]" :data-company="item.company">								
										<image :src="item.cover" mode="scaleToFill" lazy-load="true">								
									</view>
									<view class="pro_info">
										<text class="pro_title">{{item.name}}</text>
										<view class="desc_price">
											<view class="desc">
												<text v-if="item.conditions[4]">{{item.conditions[4].value}}</text>
												<text>保额</text>
											</view>
											<view class="desc border_right">
												<text v-if="item.conditions[2]">{{item.conditions[2].value}}</text>
												<text>保障期限</text>
											</view>
											<view class="price">
												<text><text class="money">&yen;</text>{{item.startPrice}}<text class="qi">起</text> </text>
											</view>
										</view>
									</view>
								</li>
							</ul>
							<view v-else>
								<view class="cu-card no-card article" v-for="(item, index) in dataList" :key="index">
									<view class="cu-item shadow" @click="goCarDetails(item.id)">
										<!-- <view class="title"><view class="text-cut">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</view></view> -->
										<view class="content">
											<image :src="item.cover"
											 mode="aspectFill"></image>
											<view class="desc">
												<view class="text-content">
													<view class="pro_title">{{item.name}}</view>
													<view class="text-cut company">{{item.company}}</view>
													<view class="text-cut money"><span class="money_yen">&yen;</span>{{item.startPrice}}<span class="qi text-gray">起</span></view>
												</view>
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
	import {getProCate, getProList, getProDetails} from '@/api/product.js';
	import QsTabs from '@/components/QS-tabs/QS-tabs.vue';
	import MySearch from '@/components/search/search.vue';
	export default {
		components: {
			QsTabs,
			MySearch
		},
		data() {
			return {
				current: 0,
				swiperCurrent: 0,
				category: '',
				animationData: {},
				showFliter: false,
				recommendId: null,
				company: '',
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
				//推荐产品
				recommendPro: {
					categories: [],
					company: '',
					cover: '',
					conditions: [],
					startPrice: '',
					thirdParty: false,
					thirdPartyUrl: ''
				},
				hasLoadCate: false,
				chexianIndex: 4
			};
		},
		onLoad() {
			this.getProCateHandler()
		},
		onShow() {
			
			if (this.$Route.query.tabIndex) {
				this.current = parseInt(this.$Route.query.tabIndex)
				this.swiperCurrent = parseInt(this.$Route.query.tabIndex)
			} else {
				this.current = 0
				this.swiperCurrent = 0
			}
			/* setTimeout(() => {
				this.$refs.tabs.init()
			},200) */
		},
		watch:{
			swiperCurrent: {
				// immediate: true,
				handler() {
					this.company = ''
					this.dataList = []
					this.recommendPro = {
						categories: [],
						company: '',
						cover: '',
						conditions: [],
						startPrice: ''
					}
					
					if (this.hasLoadCate) {
						this.category = this.tabs[this.swiperCurrent].code
						if (this.tabs[this.swiperCurrent].recommend) {
							this.recommendId = this.tabs[this.swiperCurrent].recommend
						} else {
							this.recommendId = null
						}
						
						this.$nextTick(() => {
							this.mescroll.num = 0
							this.getRecommendPro()
							this.mescroll.triggerUpScroll()
						})
					}
				}
			}
		},
		methods: {
			backFn() {
				this.showFliter = false
				this.company = ''
			},
			searchFn(val) {
				this.showFliter = false
				this.company = val
				this.mescroll.resetUpScroll()
			},
			// 产品详情页
			goDetails(id, status, url) {
				if (status) {
					window.location.href = url
				} else {
					this.$Router.push(
						{
							path: '/pages/product/details',
							query: {proId: id}
						}
					)
				}
			},
			// 车险详情
			goCarDetails(id) {
				this.$Router.push(
					{
						path: '/pages/product/carDetails',
						query: {proId: id}
					}
				)
			},
			search() {
				this.showFliter = !this.showFliter
				 /* this.animationData = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease',
				}) */
				/* if (!this.showFliter) {
					this.animationData.translateY(-1000).step()
				} else {
					this.animationData.translateY(1000).step()
				} */
				// this.$Router.push({path: '/pages/search/search'})
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
			getProCateHandler() {
				getProCate().then((res) => {
					this.hasLoadCate = true
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
					
					this.tabs = arr
					this.chexianIndex = arr.findIndex((item) =>{
						return item.code == "CX"
					})
					setTimeout(() => {						
						this.$refs.tabs.init()
						this.category = this.tabs[this.swiperCurrent].code
						if (this.tabs[this.swiperCurrent].recommend) {
							this.recommendId = this.tabs[this.swiperCurrent].recommend
						} else {
							this.recommendId = null
						}
						this.getRecommendPro()
						this.mescroll.triggerUpScroll()
					},0)
				})
			},
			getRecommendPro() {
				if (this.recommendId) {
					getProDetails(this.recommendId).then((res) => {
						this.recommendPro = res.data.data
					})
				}
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
					page: pageNum,
					company: this.company
				}
				getProList(data).then((res) =>{
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
	.content{
		.filter_box{
			position: fixed;
			width: 100%;
			height: 100vh;
			top: 0;
			left: 0;
			z-index: 9999;
			background: #fff;
		}
		.title{
			display: inline-block;
			width: 100%;
			font-size: 18px;
			font-weight: bold;
			padding: 30rpx 0;
		}
		.slide_nav_box{
			position: relative;
			.tabs{
				width: calc(100% - 80rpx);
			}
			.fliter{
				position: absolute;
				top: 0;
				right: 0;
				width: 80rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: #fff;
				.cuIcon-filter{
					font-size: 40rpx;
				}
			}
		}
		.mescroll{
			background: #fff;
			.list_box{
				padding: 0 calc(30rpx - 2%);
				background-color: #fff;
				ul{
					overflow: hidden;
					padding: 0;
					padding-bottom: 10px;
					li{
						list-style: none;
						margin: 0 2%;
						margin-top: 20rpx;
						.img_box{
							position: relative;
							height: 370rpx;
							&:after{
								position: absolute;
								content: attr(data-company);
								right:0;
								bottom: 40rpx;
								padding: 10rpx 30rpx;
								font-size: 15px;
								background: rgba(243,172,28,0.5);
								border-top-left-radius: 50px;
								border-bottom-left-radius: 50px;
								color: #fff;
								z-index: 999;
							}
							image{
								max-width: 100%;
								width: 100%;
								height: 100%;
							}
						}
						.pro_info{
							padding:30rpx;
							.pro_title{
								display:block;
								font-size: 16px;
								font-weight: bold;
								padding: 20rpx 0;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								word-break: keep-all;
							}
							.desc_price{
								display: flex;
								align-items: center;
								justify-content: center;
								.desc{
									flex: 1;
									text-align: center;
									color: #9B9B9B;
									text{
										font-size: 14px;
										display: block;
										&:first-child{
											color: #333;
											font-weight: bold;
											font-size: 16px;
										}
									}
									&.border_right{
										border-right: 1px solid rgba(51, 51, 51, 0.2);
									}
								}
								.price{
									flex: 1;
									text-align: right;
									font-size: 18px;
									color: #F7AA0B;
									.money{
										font-size: 12px;
										padding-right: 4rpx;
									}
									.qi{
										font-size: 14px;
										color: #9B9B9B;
										padding-left: 8rpx;
									}
								}
							}
						}
						&:not(:first-child){
							width: 46%;
							float: left;
							.img_box{
								height: 300rpx;
								&:before{
									position: absolute;
									content: attr(data-tag);
									top:0;
									left: 40rpx;
									font-size: 12px;
									background: #F3AC1C;
									border-bottom-left-radius: 5px;
									border-bottom-right-radius: 5px;
									z-index: 999;
									padding: 6rpx;
									color: #fff;
								}
								&:after{
									padding: 6rpx 20rpx;
									font-size: 13px;
								}
							}
							.desc_price{
								.desc{
									text-align: left;
									text{
										font-size: 12px;
										color: #9B9B9B;
										&:first-child{
											color: #9B9B9B;
											font-weight: unset;
											font-size: 12px;
										}
									}
									&.border_right{
										display: none;
									}
								}
								.price{
									flex: unset;
									font-size: 14px;
									text-align: left;
									margin-top: 4rpx;
									.money{
										font-size: 12px;
										padding-right: 4rpx;
									}
									.qi{
										font-size: 14px;
										color: #9B9B9B;
										padding-left: 8rpx;
									}
								}
							}
						}
					}
				}
				.text-content{
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.pro_title{
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						font-size: 15px;
						font-weight: bold;
						color: #333;
					}
					.money{
						font-size: 40rpx;
						color: #FC6568;
						.money_yen{
							font-size: 26rpx;
						}
						.qi{
							font-size: 26rpx;
							margin-left: 5px;
						}
					}
				}
			}
		}
	}
</style>
