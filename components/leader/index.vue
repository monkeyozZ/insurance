<template>
	<view class="leader_box">
		<view class="leader_arrow_box">
			<image src="../../static/img/lead.png" class="leader_arrow"></image>
		</view>
		<view class="leader_confirm_box" @click="close">
			<image src="../../static/img/confirm.png" class="leader_confirm"></image>
		</view>
		
	</view>
</template>

<script>
	export default{
		data() {
			return{
				
			}
		},
		methods:{
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.leader_box{
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,0.3);
		overflow: hidden;
		text-align: right;
		z-index: 999;
		.leader_arrow{
			display: inline-block;
			width: 50%;
			margin-right: 10px;
			height:220px;
		}
		.leader_confirm{
			display: inline-block;
			width: 40%;
			margin-right: 10%;
			height: 40px;
		}
	}
</style>
