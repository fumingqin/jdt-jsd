<template>
	<view>
		<!-- 顶部背景图片 -->
		<image style="width: 100%; height: 294rpx;" src="../../static/index/bgimage1.png"></image>
		<view style="position: fixed;top: 80rpx;left: 34rpx;right: 0px;align-items: center; display: flex;flex-direction: row;">
			<view>
				<image @click="back" src="../../static/grzx/back.png" style="width: 16rpx; height: 34rpx;"></image>
			</view>
			<view style="width: 180rpx; height: 56rpx;font-family:Source Han Sans SC;color: #FFFFFF; font-size: 38rpx;font-weight:bold; margin-left: 244rpx;">订单完成</view>
		</view>
		<!-- 中间白色背景 -->
		<view style="width: 94%;height: 1086rpx; position: absolute;background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: -120rpx;">
			<view>
				<image style="width: 264rpx; height: 146rpx; margin-top: 100rpx; margin-left: 212rpx;margin-bottom: 100rpx;" src="../../static/driver/finish.png"></image>
			</view>
			<view style=" align-items: center; justify-content: space-between;">
				<text style="width:371rpx;height:35rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:400;color:rgba(51,51,51,1);line-height:36rpx; margin-left: 248rpx;">订单已完成！</text>
			</view>
		</view>
		<!-- 按钮 -->
		<button @click="backIndex" style="width:507rpx;height:90rpx;border-radius:12rpx; margin-top: 400rpx; font-size: 34rpx;text-align: center;background-color: #FFFFFF; border: 1px solid #666666; color: #666666; align-items: center; margin-left: 112rpx;">返回首页</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			back: function() {
				uni.switchTab({
					url: '/pages/index/index',
				})
			},
			backIndex() {
				uni.switchTab({
					url: '/pages/index/index',
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #F5F9FC;
	}
</style>
