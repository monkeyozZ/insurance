<template>
	<view class="notice">
		<mescroll-uni class="mescroll" top="0" bottom="0" :down="downOption" :up="upOption">
			<view class="cu-list menu-avatar notice_list">
				<view class="cu-item " v-for="(item, index) in dataList" :key="index" @click="goDetails(item.jumpUrl)">
					<view class="cu-avatar radius xl" :style="{'background-image':`url(${item.companyLogo})`}"></view>
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
	import {getClaimServiceList} from '@/api/company.js';
	export default {
		data() {
			return {
				downOption: {
					use: false,
				},
				upOption: {
					use: false,
				},
				dataList: []
			};
		},
		onShow() {
			this.getListHandler()
		},
		methods:{
			goDetails(Url) {
				window.location.href = Url
			},
			getListHandler() {
				getClaimServiceList().then((res) => {
					this.dataList = res.data.data
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
