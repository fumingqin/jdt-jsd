<template>
	<view>
		<!-- 顶部背景图片 -->
		<image style="width: 100%; height: 294rpx;" src="../../static/index/bgimage1.png"></image>
		<!-- 中间搜索部分 -->
		<view style="position: fixed;top: 80rpx;left: 10rpx;right: 0px;align-items: center; display: flex;flex-direction: row;">
			<view>
				<image @click="qrcode" style="width: 47rpx;height: 45rpx; margin-left: 20rpx;" src="../../static/index/QRcode.png"></image>
			</view>
			<view class="SearchBar">
				<view>
					<image style="width: 33rpx;height: 30rpx;" src="../../static/index/search.png"></image>
				</view>
				<text style="width: 500rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:300; color:rgba(153,153,153,1); margin-left: 10rpx;">{{Address}}</text>
			</view>
			<view>
				<image style="width: 55rpx;height: 47rpx; margin-left: 20rpx;" src="../../static/index/message.png"></image>
			</view>
		</view>
		<!-- 广告 -->
		<image style="width: 94%; height: 260rpx; margin: -104rpx 22rpx;" src="../../static/index/advertisement.png"></image>
		<!-- 五个模块 -->
		<view class="bottomContent" style="width: 100%;">
			<view style="display: flex;flex-direction: row;width: 700rpx;text-align: center;margin-top:50rpx;margin-left: 24rpx;">
				<view class="tabItem" @click="setPlateNumber('../CTKYDriver/buyTicket','客车')">
					<image class="tabItem-image" src="../../static/index/KC.png"></image>
					<text class="tabItem-font">客车</text>
				</view>
				<view class="tabItem" @click="setPlateNumber('../driver/bindCoachCode','出租车')">
					<image class="tabItem-image" src="../../static/index/WLYC.png"></image>
					<text class="tabItem-font">出租车</text>
				</view>
				<view class="tabItem" @click="setPlateNumber('../driver/bindCoachCode','公交车')">
					<image class="tabItem-image" src="../../static/index/GJCX.png"></image>
					<text class="tabItem-font">公交车</text>
				</view>
				<view class="tabItem" @click="setPlateNumber('../driver/bindCoachCode','包车')">
					<image class="tabItem-image" src="../../static/index/BCFW.png"></image>
					<text class="tabItem-font">包车</text>
				</view>
				<view class="tabItem" @click="setPlateNumber('../driver/bindCoachCode','旅游')">
					<image class="tabItem-image" src="../../static/index/LVFW.png"></image>
					<text class="tabItem-font">旅游</text>
				</view>
			</view>
		</view>
		<!-- 工作提示框 -->
		<view style="width: 94%;height: 335rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 300rpx;">
			<view style="padding: 40rpx;display: flex;flex-direction: row;">
				<view>
					<image style="width: 38rpx;height: 38rpx;" src="../../static/index/workTips.png"></image>
				</view>
				<text style="width:145rpx;height:34rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:42rpx; margin-left: 10rpx;">工作提示</text>
			</view>
			<view style="margin: -12rpx 42rpx;display: flex;flex-direction: row;">
				<text style="width:160rpx;height:40rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:300;color:rgba(44,45,45,1);line-height:42rpx;">{{Work}}</text>
				<text style="width:160rpx;height:40rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:300;color:rgba(44,45,45,1);line-height:42rpx;">{{CarType}}</text>
			</view>
			<view style="display: flex; margin-left: 4rpx;">
				<button class="upWork" :disabled="IsWork" :class="!IsWork?'BtnStyle':''" @click="changeWorkState(true)">上班</button>
				<button class="downWork" :disabled="!IsWork" :class="IsWork?'BtnStyle':''" @click="changeWorkState(false)">下班</button>
			</view>
		</view>
		<!-- 消息提示 -->
		<view style="width: 94%;height: 185rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 30rpx;">
			<view style="padding: 40rpx;display: flex;flex-direction: row;">
				<view>
					<image style="width: 38rpx;height: 38rpx;" src="../../static/index/messageTips.png"></image>
				</view>
				<text style="width:145rpx;height:34rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:42rpx; margin-left: 10rpx;">消息提示</text>
			</view>
			<view style="margin: -12rpx 42rpx;display: flex;flex-direction: row;">
				<text style="width:560rpx;height:40rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:300;color:rgba(44,45,45,1);line-height:42rpx;">{{Message}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Address: '搜索您要去的地方',
				Work: '所属工作:',
				CarType: '',
				Message: '丰泽区云鹿口有一名乘客等待上车...',
				IsWork: false,
			}
		},
		onLoad() {
			let that = this;
			getApp().globalData.constantly();
		},
		onShow() {
			var that = this;
			uni.getStorage({
				key: 'CarType',
				success(res) {
					that.CarType = res.data;
					if (res.data != '') {
						that.IsWork = true;
					}
				}
			});
		},
		methods: {

			qrcode() {
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						void plus.runtime.openWeb(res.result, function() {
							//识别失败
						});
					}
				})
			},

			changeWorkState: function(iswork) {
				var that = this;
				if(!iswork){
					//下班才变色
					uni.showModal({
					    content: '您是否确认下班',
					    success: function (res) {
					        if (res.confirm) {
								that.IsWork = iswork;
								//点击下班变色移除缓存
								uni.removeStorage({
									key: 'CarType',
									success: function(res) {
										that.CarType = '';
									}
								});
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
								
					        }
					    }
					});
				}
				if (iswork) {
					uni.navigateTo({
						url: '/pages/driver/bindCoachCode1',
					});
				} 
			},

			setPlateNumber: function(url, carType) {
				var that = this;
 
				if (that.CarType == '') {
					uni.navigateTo({
						url: url + '?cartype=' + carType,
						animationType: 'pop-in',
						animationDuration: 200
					});
				} else if (that.CarType == carType) {
					uni.navigateTo({
						url: '../driver/taxiDriver'
					})
				} else {
					uni.showToast({
						title: '您已在' + that.CarType + '绑定车牌',
						icon: "none"
					})

				}
			},

		}

	}
</script>

<style>
	page {
		background-color: #F5F9FC;
	}

	.BtnStyle {
		border: 0;
		background-image: linear-gradient(270deg, rgba(250, 116, 101, 1), rgba(249, 92, 117, 1));
		box-shadow: 0px 7px 38px 8px rgba(216, 48, 75, 0.15);
	}

	.SearchBar {
		background-color: #FFFFFF;
		width: 510rpx;
		height: 36rpx;
		display: flex;
		flex-direction: row;
		border-radius: 35rpx;
		padding: 20rpx;
		margin-left: 20rpx;
		align-items: center;
		justify-content: space-between;
	}

	.downWork {
		width: 308rpx;
		height: 100rpx;
		border-radius: 11rpx;
		margin-top: 50rpx;
		font-size: 38rpx;
		text-align: center;
		background-color: #CBCBCB;
		color: #FFFFFF;
		align-items: center;
		margin-left: -16rpx;
	}

	.upWork {
		width: 308rpx;
		height: 100rpx;
		order-radius: 11rpx;
		margin-top: 50rpx;
		font-size: 38rpx;
		text-align: center;
		background-color: #CBCBCB;
		color: #FFFFFF;
		align-items: center;
	}

	.bottomContent {
		position: fixed;
		left: 0;
		right: 0;
		top: 450rpx;
		align-items: center;
	}

	.tabItem {
		width: 150rpx;
		text-align: center;
		align-items: center;
		display: flex;
		flex-direction: column;
	}

	.tabItem-image {
		width: 60rpx;
		height: 60rpx;
	}

	.tabItem-font {
		margin-top: 10rpx;
		font-size: 24rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #333333;
	}
</style>
