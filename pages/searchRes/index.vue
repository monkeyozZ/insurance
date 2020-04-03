<template>
	<view>
		<view class="res_knowledge">
			<view class="empty_box" v-if="articles.length == 0 && products.length == 0">
				<image src="../../static/img/empty.png" class="empty_img"></image>
				<view class="tip">
					无搜索结果，换个关键词试试~
				</view>
			</view>
			<view class="cu-card no-card article" v-for="(item, index) in articles" :key="index">
				<view class="cu-item shadow" @click="goKnowDetails(item.id)">
					<view class="content">
						<image :src="item.cover"
						 mode="aspectFill"></image>
						<view class="desc">
							<view class="text-content"><view class="pro_title"><view class="cu-tag bg-red radius sm" v-if="item.hot">热门</view>{{item.name}}</view></view>
							<view class="bottom_panel">
								<view class="cu-tag auther text-cut">{{'知识资讯'}}</view>
								<view class="cu-tag time text-cut">{{item.createTime | parseTimeYMD}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="res_product">
			<view class="cu-card no-card article" v-for="(item, index) in products" :key="index">
				<view class="cu-item shadow" @click="goProDetails(item.id)">
					<view class="content">
						<image :src="item.cover"
						 mode="aspectFill"></image>
						<view class="desc">
							<view class="text-content"><view class="pro_title"><view class="cu-tag bg-red radius sm" v-if="item.hot">热门</view>{{item.name}}</view></view>
							<view class="bottom_panel">
								<view class="cu-tag auther text-cut">{{'产品商城'}}</view>
								<view class="cu-tag time text-cut">{{item.createTime | parseTimeYMD}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {search} from '@/api/product.js';
	export default {
		data() {
			return {
				keyWord: '',
				articles: [],
				products: []
			};
		},
		onLoad() {
			this.keyWord = this.$Route.query.keyWord
		},
		onShow() {
			this.searchHandler()
		},
		methods:{
			searchHandler() {
				let obj = {
					keyword: this.keyWord
				}
				search(obj).then((res) =>{
					this.articles = res.data.data.articles
					this.products = res.data.data.products
				})
			},
			goKnowDetails(id) {
				this.$router.push({path: '/pages/knowledge/details', query: {articleId: id}})
			},
			goProDetails(id) {
				this.$Router.push(
					{
						path: '/pages/product/details',
						query: {proId: id}
					}
				)
			},
		}
	}
</script>

<style lang="scss">
	.res_knowledge{
		.empty_box{
			margin-top: 100px;
			text-align: center;
			.empty_img{
				display: inline-block;
				width: 64px;
				height: 64px;
			}
			.tip{
				margin-top: 5px;
				font-size: 12px;
			}
		}
	}
	
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
</style>
