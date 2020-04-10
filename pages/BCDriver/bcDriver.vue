<template>
	<view>
		<view style="display: flex">
			<view>
				<image @click="back" src="../../static/driver/back.png" style="width: 18rpx; height: 34rpx; margin:103rpx 26rpx; color: #2C2D2D;"></image>
			</view>
			<view style="width: 200rpx; height: 36rpx; margin: 92rpx 212rpx;color: #333333; font-size: 38rpx;font-weight:bold;">包车司机</view>
		</view>
		<!-- 本月接单量 -->
		<view style="width: 94%;height: 105rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: -64rpx;">
			<view style="padding: 30rpx;display: flex;flex-direction: row;">
				<text style="width:340rpx;height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:42rpx; margin-left: 10rpx;">本月接单量</text>
				<view>
					<image style="width: 14rpx;height: 26rpx; margin-left: 270rpx;" src="../../static/driver/right.png"></image>
				</view>
			</view>
		</view>
		<!-- 接单信息 -->
		<view v-for="(item,index) in receiptInfo" :key="index" style="margin-top: -12rpx;">
			<view v-if="item.Type=='专线'">
				<view style="width: 94%;height: 460rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 30rpx;">
					<view style="padding: 40rpx;display: flex;flex-direction: row;">
						<text style="width:160rpx;height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:36rpx;">包车类型:</text>
						<text style="width:160rpx;height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:36rpx; margin-left: 10rpx;">{{item.Type}}</text>
					</view>
					<view style="margin: -10rpx 44rpx;display: flex;flex-direction: row;">
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">客户类型:</text>
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.Member}}</text>
					</view>
					<view style="margin: 20rpx 44rpx;display: flex;flex-direction: row;">
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">出发时间:</text>
						<text style="width:200rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.departureTime}}</text>
						<text style="width:80rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.Week}}</text>
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.Time}}</text>
					</view>
					<view style="margin: -10rpx 40rpx;display: flex;flex-direction: row;">
						<text style="width:110rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">上车点:</text>
						<text style="width:400rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.beginAddress}}</text>
					</view>
					<view style="margin: 20rpx 40rpx;display: flex;flex-direction: row;">
						<text style="width:110rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">下车点:</text>
						<text style="width:400rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.endAddress}}</text>
					</view>
					<view style="display: flex; margin-left: 4rpx; margin-top: -10rpx;">
						<button @click="depart" style="width:278rpx;height:90rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #ED766C; border: 1px solid #ED766C; color: #FFFFFF; align-items: center;">发车</button>
						<button style="width:278rpx;height:90rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #FFFFFF; border: 1px solid #666666; color: #666666; align-items: center; margin-left: -16rpx;">联系客户</button>
					</view>
				</view>
			</view>
			<view v-if="item.Type=='定制'">
				<view style="width: 94%;height: 510rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 30rpx;">
					<view style="padding: 40rpx;display: flex;flex-direction: row;">
						<text style="width:160rpx;height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:36rpx;">包车类型:</text>
						<text style="width:160rpx;height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:36rpx; margin-left: 10rpx;">{{item.Type}}</text>
					</view>
					<view style="margin: -10rpx 44rpx;display: flex;flex-direction: row;">
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">客户类型:</text>
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.Member}}</text>
					</view>
					<view style="margin: 20rpx 44rpx;display: flex;flex-direction: row;">
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">包车天数:</text>
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.Day}}</text>
					</view>
					<view style="margin: -10rpx 44rpx;display: flex;flex-direction: row;">
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">出发时间:</text>
						<text style="width:200rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.departureTime}}</text>
						<text style="width:80rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.Week}}</text>
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.Time}}</text>
					</view>
					<view style="margin: 20rpx 40rpx;display: flex;flex-direction: row;">
						<text style="width:110rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">上车点:</text>
						<text style="width:400rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.beginAddress}}</text>
					</view>
					<view style="margin: -10rpx 40rpx;display: flex;flex-direction: row;">
						<text style="width:110rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">下车点:</text>
						<text style="width:400rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.endAddress}}</text>
					</view>
					<view style="display: flex; margin-left: 4rpx; margin-top: 20rpx;">
						<button @click="depart1" style="width:278rpx;height:90rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #ED766C; border: 1px solid #ED766C; color: #FFFFFF; align-items: center;">发车</button>
						<button style="width:278rpx;height:90rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #FFFFFF; border: 1px solid #666666; color: #666666; align-items: center; margin-left: -16rpx;">联系客户</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				receiptInfo: [{
						Type: '专线',
						Member: '普通',
						departureTime: '2020-03-02',
						Week: '周五',
						Time: '14:30',
						beginAddress: '茶叶大厦',
						endAddress: '晋江机场',
					},
					{
						Type: '定制',
						Member: '会员',
						Day:'1天',
						departureTime: '2020-03-02',
						Week: '周五',
						Time: '14:30',
						beginAddress: '茶叶大厦',
						endAddress: '晋江机场',
					}
				],

			}
		},
		methods: {
			back: function() {
				uni.switchTab({
					url: '/pages/index/index',
				})
			},
			depart() {
				uni.navigateTo({
					url: '/pages/BCDriver/specialLineCar',
				})
			},
			depart1() {
				uni.navigateTo({
					url: '/pages/BCDriver/specialLineCar',
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
