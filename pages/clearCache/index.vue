<template>
	<view class="flex flex-direction padding">
		<button class="cu-btn bg-gradual-blue submitBtn lg" @click="clear">清除缓存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			clear() {
				uni.clearStorageSync();
				uni.showToast({
				    title: '缓存已清除',
				    icon: 'none'
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
