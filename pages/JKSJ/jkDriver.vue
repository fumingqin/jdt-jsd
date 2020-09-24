<template>
	<view>
		<view class="status_bar">

		</view>
		<view style="display: flex;width: 94%;margin: 30rpx auto 30rpx auto;flex-direction: row;">
			<view style="width: 40%;">
				<image @click="back" src="../../static/driver/back.png" style="width: 20rpx; height: 35rpx;color: #2C2D2D;margin-top: 10rpx;"></image>
			</view>
			<view>
				<text style="font-size:38rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);">接客司机</text>
			</view>
			
		</view>


		<!-- 出租车-今日接单量 -->
		<view v-if="buttonActive" style="width: 94%;height: 105rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx;margin-top: 30rpx;margin-bottom: 30rpx;">
			<view style="padding: 30rpx;display: flex;justify-content: space-between;align-items: center;">
				<text style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:42rpx;">今日班次量</text>
				<view style="display: flex;align-items: center;">
					<view style="margin:0 20rpx;width: 40rpx;height: 40rpx;border-radius: 100px;background: linear-gradient(270deg,rgba(250,116,101,1),rgba(249,92,117,1));font-size: 26rpx;color: #FFF;text-align: center;font-weight: 600;">
						{{taxiOrderNum}}
					</view>
					<!-- <image style="width: 14rpx;height: 26rpx;" src="../../static/driver/right.png"></image> -->
				</view>
			</view>
		</view>

		<!-- 接单信息-出租车 -->
		<scroll-view class="scrollView" scroll-y=true>
			<view style="margin-left: 30rpx;margin-top: 20rpx;font-size: 34rpx;font-weight: bolder;">接客人数</view>
			<view class="passengerView" v-if="buttonActive" v-for='(item, index) in orderArr' :key='index'>
				<view class="passengerView_info">
					<view>乘客：{{item.PassengerName}}</view>
					<!-- <view style="margin-top: 20rpx;">预计时间：{{item.time}}</view> -->
				</view>
				<view class="passengerView_info">
					<view>上车点：{{item.PickUpAddress}}</view>
					<!-- <view style="margin-top: 20rpx;">预计里程：{{item.distance}}</view> -->
				</view>
			</view>
			<view class="AllInfo" v-if="orderArr.length > 3">查看全部</view>
		</scroll-view>
		
		<view style="width: 94%;margin-left: auto;margin-right: auto;margin-top: 20rpx;">
			<button @click="isOpenButton" class="buttonActive">
				<text class="buttonFont">{{buttonContent}}</text>
			</button>
		</view>
	</view>
</template>

<script>
	var that;
	import Map from '../../common/my-openMap/openMap.js';
	import utils from '@/components/shoyu-date/utils.filter.js';
	import Voice from '../../js_sdk/QuShe-baiduYY/QS-baiduyy/QS-baiduyy.js';
	export default {
		data() {
			return {
				orderArr: [],
				getOrderInterval: 0,
				userInfo: '',
				vehicleInfo: '',
				buttonActive: true,
				taxiOrderNum: 0,

				taxiLastIndex: 0,
				privateLineLastIndex: 0,

				isOpen: false,
				buttonContent: '发车',
				
			}
		},
		onLoad() {
			that = this;
			uni.hideLoading();
			that.userInfo = uni.getStorageSync('userInfo') || '';
			that.vehicleInfo = uni.getStorageSync("vehicleInfo") || '';
			// that.isOpen = uni.getStorageSync('isOpen') || false;
			if (that.userInfo == '') {
				that.showToast('请先登录');
				//console.log(that.userInfo);
			} else {
				// if (!that.isOpen) {
				// 	uni.showLoading({
				// 		mask: true
				// 	});
				// }
			}
			that.getOrder();
		},
		onShow() {

		},
		onUnload() {
			clearInterval(that.getOrderInterval);
		},
		onHide() {
			clearInterval(that.getOrderInterval);
		},
		methods: {
//----------------------------------------------------功能方法区开始----------------------------------------------------
			//本页面统一调用此方法
			switchover: function(value) {
				let that = this;
				that.buttonActive = value;
			},
			//-----------------------------------------自定义弹框-----------------------------------------
			showToast: function(title, icon = 'none') {
				uni.showToast({
					title: title,
					icon: icon
				});
			},
			//-----------------------------------------自定义返回-----------------------------------------
			back: function() {
				uni.switchTab({
					url: '/pages/index/index',
				})
			},
			//-----------------------------------------点击发车-----------------------------------------
			isOpenButton: function() {
				that.isOpen = !that.isOpen
				if(that.orderArr.length == 0){
					uni.showToast({
						title:'暂无乘客',
						icon:'none'
					})
				}else {
					//发车
					that.PullOut();
				}
			},
			//-----------------------------------------格式化时间-----------------------------------------
			formatEstimateTime: function(estimateTime) {
				let time = (estimateTime / 60) > 1 ? ((estimateTime / 60) + '小时') : (estimateTime + '分钟');
				return time
			},
			formatTime: function(time) {
				return time.replace('T', ' ');
			},
//----------------------------------------------------功能方法区结束----------------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------网络请求方法区开始----------------------------------------------------
            //-----------------------------------------根据司机ID获取接客订单-----------------------------------------
			getOrder: function(userId, vehicleNumber) {
				uni.request({
					url: that.$CustomDriver.Interface.GetOrderByDriverID.Url,
					method: that.$CustomDriver.Interface.GetOrderByDriverID.method,
					data: {
						DriverId: "2020-09-22-f9f9da9f-9e98-4ecb-a7a0-36a63c6cd31d",
					},
					success: function(res) {
						uni.hideLoading();
						console.log(res)
						if (res.data.status) {
							that.orderArr = [];
							that.orderArr = res.data.data;
						} else {
							that.showToast(res.data.msg);
						}
					},
					fail: function(res) {
						uni.hideLoading();
						that.showToast('网络连接失败');
						//console.log(res);
					}
				})
			},
			PullOut: function(userId, vehicleNumber) {
				uni.request({
					url: that.$CustomDriver.Interface.PullOut.Url,
					method: that.$CustomDriver.Interface.PullOut.method,
					data: {
						AID:that.orderArr[0].OrderAID
					},
					success: function(res) {
						uni.hideLoading();
						console.log(res)
						if (res.data.status) {
							uni.navigateTo({
								url:'./Destination?orderArr=' + encodeURIComponent(JSON.stringify(that.orderArr))
							})
						} else {
							that.showToast(res.data.msg);
						}
					},
					fail: function(res) {
						uni.hideLoading();
						that.showToast('网络连接失败');
						//console.log(res);
					}
				})
			},
//----------------------------------------------------网络请求方法区结束----------------------------------------------------
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F9FC;
	}
	.scrollView{
		padding-bottom: 20rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		width: 94%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
	.passengerView {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 94%;
		padding-bottom: 30rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		margin-left: 22rpx;
		border-radius:20rpx;
		.passengerView_info{
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			display: inline-block;
			width: 60%;
			font-size: 30rpx;
			color: #333333;
		}
	}
	.AllInfo{
		text-align: center;
		color: #333333;
		font-size: 28rpx;
		font-weight: 300;
		margin-bottom: 20rpx;
	}
	.buttonActive {
		background: linear-gradient(270deg, #FA7465, #F95C75);
		box-shadow: 0px 7px 38px 8px rgba(216, 48, 75, 0.15);
	}

	.buttonFont {
		font-size: 36rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #FFFFFF;
	}

	.buttonFont1 {
		font-size: 36rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #FC4646;
	}

	.unButtonFont {
		font-size: 36rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #000000;
	}

	.chooseBorder {
		border-bottom: #FC4646 1px solid;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		box-sizing: content-box;
	}
</style>
