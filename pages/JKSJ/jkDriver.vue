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
					<view>乘客：{{item.name}}</view>
					<view style="margin-top: 20rpx;">预计时间：{{item.time}}</view>
				</view>
				<view class="passengerView_info">
					<view>上车点：{{item.getOnStation}}</view>
					<view style="margin-top: 20rpx;">预计里程：{{item.distance}}</view>
				</view>
			</view>
			<view class="AllInfo">查看全部</view>
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
				orderArr: [
					{
						name:'张三',
						getOnStation:'南平',
						time:'2小时',
						distance:'44公里'
					},
					{
						name:'张三',
						getOnStation:'南平',
						time:'2小时',
						distance:'44公里'
					},
					{
						name:'张三',
						getOnStation:'南平',
						time:'2小时',
						distance:'44公里'
					}
				],
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
			that.isOpen = uni.getStorageSync('isOpen') || false;
			if (that.isOpen) {
				that.buttonContent = '发车';
			} else {
				that.buttonContent = '停止接单';
			}
			if (that.userInfo == '') {
				that.showToast('请先登录');
				//console.log(that.userInfo);
			} else {
				if (!that.isOpen) {
					uni.showLoading({
						mask: true
					});
					//在getOrder里面会关闭
					// that.getOrder(that.userInfo.driverId, that.vehicleInfo.vehicleNumber);
					// that.getSpecialLineOrder(that.userInfo.driverId, that.vehicleInfo.vehicleNumber);
					// that.realTimeOrder(that.userInfo.driverId, that.vehicleInfo.vehicleNumber);
				}


				//统计
				// that.getTaxiTodayOrderCount();
				// that.getSpecialTodayOrderCount();
			}
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
			//本页面统一调用此方法
			switchover: function(value) {
				let that = this;
				that.buttonActive = value;
			},

			showToast: function(title, icon = 'none') {
				uni.showToast({
					title: title,
					icon: icon
				});
			},
			back: function() {
				uni.switchTab({
					url: '/pages/index/index',
				})
			},
			receipt: function(item) {
				//接单
				uni.showLoading({
					mask: true
				});
				uni.request({
					url: that.$taxi.Interface.ReceiptExpressOrder_Driver.value,
					method: that.$taxi.Interface.ReceiptExpressOrder_Driver.method,
					data: {
						OrderNumber: item.orderNumber,
						driverId: that.userInfo.driverId,
						driverName: that.userInfo.userName,
						driverPhone: that.userInfo.phoneNumber,
						vehicleNumber: that.vehicleInfo.vehicleNumber,
					},
					success: function(res) {
						uni.hideLoading();
						if (res.data.status) {
							switch (item.orderType) {
								case '实时':
									uni.navigateTo({
										url: '/pages/driver/confirmgetonCar?orderNumber=' + item.orderNumber,
									});
									break;
								case '预约':
									that.showToast('接单成功');
									break;
								default:
									break;
							}
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
			reject: function(item) {
				//拒接
				uni.showLoading({
					mask: true
				});
				uni.request({
					url: that.$taxi.Interface.RefuseExpressOrderByOrderNumDriverID_Driver.value,
					method: that.$taxi.Interface.RefuseExpressOrderByOrderNumDriverID_Driver.method,
					data: {
						orderNumber: item.orderNumber,
						driverId: that.userInfo.driverId,
					},
					success: function(res) {
						//console.log(res);
						uni.hideLoading();
						if (res.data.status) {
							that.showToast('已拒绝');
							that.getOrder(that.userInfo.driverId, that.vehicleInfo.vehicleNumber);
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
			realTimeOrder: function(userId, vehicleNumber) {
				//定时器开启
				if (that.getOrderInterval == 0) {
					that.getOrderInterval = setInterval(function() {
						that.getOrder(userId, vehicleNumber);
						that.getSpecialLineOrder(userId, vehicleNumber);
					}, that.$taxi.delayTime.getOrderDelay.time);
				}
			},
			getOrder: function(userId, vehicleNumber) {
				uni.request({
					url: that.$taxi.Interface.GetCanReceiptExpressOrder_Driver.value,
					method: that.$taxi.Interface.GetCanReceiptExpressOrder_Driver.method,
					data: {
						driverId: userId,
						vehicleNumber: vehicleNumber
					},
					success: function(res) {
						uni.hideLoading();
						//console.log(res);
						if (res.data.status) {
							that.orderArr = [];
							let data = res.data.data;
							// that.orderArr = data;
							if (that.orderArr.length > 0) {
								var newIndex = parseInt(that.orderArr[0].orderNumber.substring(0, 14));
								if (newIndex > that.taxiLastIndex) {
									that.taxiLastIndex = newIndex;
									var text = '有新的出租车订单等待接单';
									Voice(text);
								}
							}
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

			getTaxiTodayOrderCount: function() {
				var startDate = that.$myTime.getNowDate();
				var endDate = that.$myTime.addDay(startDate, 1);
				uni.request({
					url: that.$taxi.Interface.GetExpressOrderCountByDriverID_Driver.value,
					method: that.$taxi.Interface.GetExpressOrderCountByDriverID_Driver.method,
					data: {
						driverId: that.userInfo.driverId,
						orderStartTime: utils.timeTodate(that.$home.dateFormat.dateformat, startDate.getTime()),
						orderEndTime: utils.timeTodate(that.$home.dateFormat.dateformat, endDate.getTime())
					},
					success: function(res) {
						if (res.data.status) {
							let data = res.data.data[0];
							that.taxiOrderNum = data == undefined ? 0 : data.orderNum;
						} else {
							//console.log(res);
						}
					},
					fail: function(res) {
						//console.log(res);
					}
				})
			},

			formatEstimateDistance: function(estimateDistance) {
				return parseFloat(estimateDistance).toFixed(1) + '公里';
			},
			formatEstimateTime: function(estimateTime) {
				let time = (estimateTime / 60) > 1 ? ((estimateTime / 60) + '小时') : (estimateTime + '分钟');
				return time
			},
			formatUserType: function(userType) {
				if (userType == 0) {
					return '普通用户';
				} else if (userType == 1) {
					return '普通会员';
				} else if (userType == 2) {
					return '超级会员';
				} else if (userType == 3) {
					return '其他用户';
				} else if (userType == 9) {
					return '体验用户';
				}
			},
			formatTime: function(time) {
				return time.replace('T', ' ');
			},
			//顺风车
			downwindCar: function() {
				uni.navigateTo({
					url: '../downwindCar/addDownwindOrder'
				});
			},
			//-----------------------------------------点击发车-----------------------------------------
			isOpenButton: function() {
				that.isOpen = !that.isOpen
				uni.navigateTo({
					url:'./Destination'
				})
				// if (that.isOpen) {
				// 	//关
				// 	that.buttonContent = '开始接单';
				// 	that.orderArr = [];
				// 	clearInterval(that.getOrderInterval);
				// 	that.getOrderInterval = 0;
				// 	uni.setStorageSync('isOpen', that.isOpen);
				// } else {
				// 	//开
				// 	that.buttonContent = '停止接单';
				// 	that.realTimeOrder(that.userInfo.driverId, that.vehicleInfo.vehicleNumber);
				// 	uni.setStorageSync('isOpen', that.isOpen);
				// }
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F9FC;
	}
	.scrollView{
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
			display: inline-block;
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
