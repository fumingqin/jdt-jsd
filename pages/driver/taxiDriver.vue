<template>
	<view>
		<view style="display: flex">
			<view>
				<image @click="back" src="../../static/driver/back.png" style="width: 18rpx; height: 34rpx; margin:103rpx 26rpx; color: #2C2D2D;"></image>
			</view>
			<view style="width: 200rpx; height: 36rpx; margin: 92rpx 212rpx;color: #333333; font-size: 38rpx;font-weight:bold;">出租车司机</view>
		</view>
		<!-- 今日接单量 -->
		<view style="width: 94%;height: 105rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: -50rpx;">
			<view style="padding: 30rpx;display: flex;flex-direction: row;">
				<text style="width:340rpx;height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:42rpx; margin-left: 10rpx;">今日接单量</text>
				<view>
					<image style="width: 14rpx;height: 26rpx; margin-left: 270rpx;" src="../../static/driver/right.png"></image>
				</view>
			</view>
		</view>
		<!-- 接单信息 -->
		<view style="width: 94%;height: 475rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 30rpx;">
			<view style="padding: 40rpx;display: flex;flex-direction: row;">
				<text style="width:160rpx;height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:36rpx;">目的区域:</text>
				<text style="width:160rpx;height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:36rpx; margin-left: 10rpx;">{{Area}}</text>
			</view>
			<view style="margin: -10rpx 44rpx;display: flex;flex-direction: row;">
				<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">客户类型:</text>
				<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{Member}}</text>
			</view>
			<view style="margin: 20rpx 44rpx;display: flex;flex-direction: row;">
				<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">预计里程:</text>
				<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{Mileage}}</text>
				<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx; margin-left: 40rpx;">预计时长:</text>
				<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{Hour}}</text>
			</view>
			<view style="margin: -10rpx 40rpx;display: flex;flex-direction: row;">
				<text style="width:110rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">上车点:</text>
				<text style="width:400rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{beginAddress}}</text>
			</view>
			<view style="margin: 20rpx 40rpx;display: flex;flex-direction: row;">
				<text style="width:110rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">下车点:</text>
				<text style="width:400rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{endAddress}}</text>
			</view>
			<view style="display: flex; margin-left: 4rpx;">
				<button @click="receipt" style="width:278rpx;height:90rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #ED766C; border: 1px solid #ED766C; color: #FFFFFF; align-items: center;">接单</button>
				<button style="width:278rpx;height:90rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #FFFFFF; border: 1px solid #666666; color: #666666; align-items: center; margin-left: -16rpx;">拒接</button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				Area: '丰泽区',
				Member: '会员/普通',
				Mileage: '44 km',
				Hour: '2小时',
				beginAddress: '茶叶大厦',
				endAddress: '晋江机场',
			}
		},
		methods: {
			back: function() {
				var that = this;
				uni.navigateBack({});
			},
			receipt() {
				uni.navigateTo({
					url: '/pages/driver/confirmgetonCar',
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
