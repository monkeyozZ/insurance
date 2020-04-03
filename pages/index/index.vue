<template>
	<view class="content">
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback">
			<uni-search-bar placeholder="搜索" @confirm="search"></uni-search-bar>
			<view class="banner">
				<my-swiper :bannerList="bannerList"></my-swiper>
			</view>
			
			<view class="nav_menu_box">
				<ul class="nav_menu">
					<li @click="goProList(yiwaiIndex)">
						<image src="/static/img/yiwai.png" lazy-load="true">
						<text>意外保险</text>
					</li>
					<li @click="goProList(zhongjiIndex)">
						<image src="/static/img/zhongji.png" lazy-load="true">
						<text>重疾保险</text>
					</li>
					<li @click="goProList(renshouIndex)">
						<image src="/static/img/renshou.png" lazy-load="true">
						<text>人寿保险</text>
					</li>
					<li @click="goProList(lvyouIndex)">
						<image src="/static/img/lvyou.png" lazy-load="true">
						<text>旅游保险</text>
					</li>
					<li @click="goProList">
						<image src="/static/img/all.png" lazy-load="true">
						<text>全部</text>
					</li>
				</ul>
			</view>
			
			<view class="list_box">
				<text class="title">家庭保障方案</text>
				<ul>
					<li class="shadow-warp bg-white" v-for="(item, index) in dataList" :key="index" @click="goDetails(item.id, item.thirdParty, item.thirdPartyUrl)">
						<view class="img_box" :data-tag="item.categories[0]" :data-company="item.company">								
							<image :src="item.cover" mode="scaleToFill" lazy-load="true">								
						</view>
						<view class="pro_info">
							<text class="pro_title">{{item.name}}</text>
							<view class="desc_price">
								<view class="desc" v-if="item.rights.length !== 0">
									<text>{{item.rights[0].name}}</text>
									<text>{{item.rights[1].name}}</text>
								</view>
								<view class="price">
									<text><text class="money">&yen;</text>{{item.startPrice}}<text class="qi">起</text> </text>
								</view>
							</view>
						</view>
					</li>
				</ul>
			</view>
			<view class="advantage_list">
				<text class="title">优势保障</text>
				<ul>
					<li>
						<image src="/static/img/ke.png" mode="aspectFit" lazy-load="true">
						<text class="sub_tite">以客为本</text>
						<text>深入了解客户</text>
						<text>深度解析需求</text>
					</li>
					<li>
						<image src="/static/img/total.png" mode="aspectFit" lazy-load="true">
							<text class="sub_tite">技能全面</text>
							<text>专业知识精湛</text>
							<text>一对一服务</text>
					</li>
					<li>
						<image src="/static/img/mult.png" mode="aspectFit" lazy-load="true">
							<text class="sub_tite">产品多元化</text>
							<text>各大保险公司</text>
							<text>产品多样化</text>
					</li>
					<li>
						<image src="/static/img/serve.png" mode="aspectFit" lazy-load="true">
							<text class="sub_tite">服务范围广</text>
							<text>服务范围广泛</text>
							<text>多家门店</text>
					</li>
				</ul>
				<text class="bottom_text">为用户提供1000多款产品，累计服务用户数4730万</text>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import mySwiper from '@/components/swiper/swiper.vue'
	import { getProList, getBanners, getProCate } from '@/api/product.js';
	export default {
		components: {
			// mySearchBar,
			mySwiper,
			uniSearchBar
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				// 下拉刷新的常用配置
				downOption: { 
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					offset: 50, // 在列表顶部,下拉大于80upx,松手即可触发下拉刷新的回调
				},
				// 上拉加载的常用配置
				upOption: {
					use: false, // 是否启用上拉加载; 默认true
				},
				// 列表数据
				dataList: [],
				// banner
				bannerList: [],
				codeArr: [],
				yiwaiIndex: null,
				zhongjiIndex: null,
				renshouIndex: null,
				lvyouIndex: null,
			}
		},
		onLoad() {
		},
		mounted() {
			this.getBannersHandler()
			this.getProCateHandler()
		},
		methods: {
			search(obj) {
				if (obj.value.length == 0) {
					uni.showToast({
					    title: '请输入搜索关键字',
					    icon: 'none'
					});
					return
				}
				this.$Router.push({
					path: '/pages/searchRes/index',
					query:{
						keyWord: obj.value
					}
				})
			},
			getProCateHandler() {
				getProCate().then((res) => {
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
					this.yiwaiIndex = arr.findIndex((item) =>{
						return item.code == "X01"
					})
					this.zhongjiIndex = arr.findIndex((item) =>{
						return item.code == "X02"
					})
					this.renshouIndex = arr.findIndex((item) =>{
						return item.code == "X03"
					})
					this.lvyouIndex = arr.findIndex((item) =>{
						return item.code == "X04"
					})
				})
			},
			/**
			 * @param {Number} index
			 * index: 0 => 产品列表-意外保险
			 * index: 1 => 产品列表-重疾保险
			 * index: 2 => 产品列表-人寿保险
			 * index: 3 => 产品列表-旅游保险
			 * index: 不传 => 产品列表
			 */
			goProList(index) {
				switch (index){
					case 0:
					this.$Router.push({path:'/pages/product/product',query:{
						tabIndex: index
					}})
						break;
					case 1:
					this.$Router.push({path:'/pages/product/product',query:{
						tabIndex: index
					}})
						break;
					case 2:
					this.$Router.push({path:'/pages/product/product',query:{
						tabIndex: index
					}})
						break;
					case 3:
					this.$Router.push({path:'/pages/product/product',query:{
						tabIndex: index
					}})
						break;
					default:
					this.$Router.push({path:'/pages/product/product'})
						break;
				}
			},
			downCallback(mescroll){
				let data = {
					category: '',
					page: 1
				}
				getProList(data).then((res) => {
					this.dataList = res.data.data
					mescroll.endSuccess()
				}).catch((err) => {
					mescroll.endErr()
				})
			},
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
			getBannersHandler() {
				getBanners().then((res) => {
					this.bannerList = res.data.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.content{
	.title{
		display: inline-block;
		width: 100%;
		font-size: 18px;
		font-weight: bold;
		padding: 30rpx 0;
	}
	.nav_menu_box{
		padding: 40rpx 20rpx;
		box-sizing: border-box;
		background-color: #fff;
		.nav_menu{
			display: flex;
			padding: 0;
			li{
				flex: 1;
				text-align: center;
				list-style: none;
				image {
					width: 45px;
					height: 45px;
				}
				text{
					display: inline-block;
				}
				&:not(:last-child){
					text{
						margin-top: 5px;
					}
				}
				&:last-child{
					image {
						padding: 0;
						width: 50px;
						height: 50px;
					}
				}
			}
		}
	}
	.list_box{
		padding: 0 calc(30rpx - 2%);
		margin-top: 40rpx;
		background-color: #fff;
		ul{
			overflow: hidden;
			padding: 10rpx 0 40rpx;
			li{
				list-style: none;
				margin: 0 2%;
				.img_box{
					position: relative;
					height: 370rpx;
					&:before{
						position: absolute;
						content: attr(data-tag);
						top:0;
						left: 40rpx;
						padding: 10rpx;
						font-size: 12px;
						background: #F3AC1C;
						border-bottom-left-radius: 5px;
						border-bottom-right-radius: 5px;
						z-index: 999;
						color: #fff;
					}
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
						z-index: 999;
						color: #fff;
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
							flex: 2;
							text-align: left;
							color: #9B9B9B;
							text{
								font-size: 14px;
								display: block;
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
					margin-top: 20rpx;
					.img_box{
						height: 300rpx;
						&:before{
							padding: 6rpx;
						}
						&:after{
							padding: 6rpx 20rpx;
							font-size: 13px;
						}
					}
					.desc_price{
						display: unset;
						.desc{
							flex: unset;
							text{
								font-size: 12px;
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
	}
	.advantage_list{
		padding: 0 20rpx;
		background-color: #fff;
		ul{
			display: flex;
			padding: 20rpx 0;
			border-bottom: 1px solid #9B9B9B;
			li{
				text-align: center;
				flex: 1;
				margin: 0 10rpx;
				list-style: none;
				image{
					width: 80rpx;
					height: 80rpx;
				}
				text{
					display: block;
					font-size: 12px;
					color:#9B9B9B;
					&.sub_tite{
						margin: 6rpx 0;
						font-size: 13px;
						font-weight: bold;
						color: #333;
					}
				}
			}
		}
		.bottom_text{
			display: block;
			font-size: 13px;
			text-align: center;
			color:#9B9B9B;
			line-height: 80rpx;
			padding: 10px 0;
		}
	}
}
	
</style>
