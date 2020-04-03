<template>
	<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
	 :autoplay="true" interval="5000" duration="500">
		<swiper-item v-for="(item,index) in bannerList" :key="index" @click="goDetails(item.jumpUrl)">
			<image :src="item.imgSrc" mode="scaleToFill"></image>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		props:{
			bannerList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}]
			}
		},
		methods:{
			goDetails(jumpUrl) {
				window.location.href = jumpUrl
			}
		}
	}
</script>

<style lang="less">
	
</style>