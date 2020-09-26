<template>
	<view>
		<view style="margin:0 30rpx;">
			<view style="position: fixed;top: 0;left: 30rpx;right: 30rpx;z-index: 9999;background-color: #F6F8FE;">
				<view class="tab">
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==0?'tabactive':''" @click="tabclick(0)">全部</view>
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==1?'tabactive':''" @click="tabclick(1)">未完成</view>
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==2?'tabactive':''" @click="tabclick(2)">已完成</view>
					<!-- <view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==3?'tabactive':''" @click="tabclick(3)">已取消</view> -->
				</view>
			</view>
			<!--全部-->
			<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==0">
				<view v-for="(item,index) in orderArr" :key="index">
					<!-- 出租车开始 -->
					<view style="margin-top: 20rpx;">
						<!-- <view class="booktime" v-if="item.orderType == '预约'">
							预约日期：{{taxiFormatTime(item.appointmentTime)}}
						</view> -->
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/CPDG.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">接客服务</view>
									</view>
									<view class="orderstatus">{{formatState(item[0].OrderState)}}</view>
								</view>

								<view class="passengerView" v-for='(passager, index1) in item' :key='index1'>
									<view class="passengerView_info">
										<view>乘客：{{passager.PassengerName}}</view>
									</view>
									<view class="passengerView_info">
										<view>上车点：{{passager.PickUpAddress}}</view>
									</view>
									<view @click="toCallPassenger(passager.PhoneNumber)">
										<image src="../../static/driver/phone.png" style="width: 50rpx;margin-top: 20rpx;" mode="widthFix"></image>
									</view>
								</view>

								<view class="btnarea">
									<view>
										<button @click="toDetail(item[0].OrderState,item[0].OrderAID,item)" style="width: auto;">详情</button>
									</view>
									<!-- <view v-if="item.state == 1">
										<button @click="toDepart(item)" style="background-color: #FC4646;color: #FFF;width: auto;">发车</button>
									</view>
									 -->
								</view>
							</view>
						</view>
					</view>
					<!-- 出租车结束 -->
				</view>
			</view>
			<!--进行中-->
			<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==1">
				<view v-for="(item,index) in underwayArr" :key="index">
					<!-- 出租车开始 -->
					<view style="margin-top: 20rpx;">
						<!-- <view class="booktime" v-if="item.orderType == '预约'">
							预约日期：{{taxiFormatTime(item.appointmentTime)}}
						</view> -->
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/CPDG.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">接客服务</view>
									</view>
									<view class="orderstatus">{{formatState(item[0].OrderState)}}</view>
								</view>

								<view class="passengerView" v-for='(passager, index1) in item' :key='index1'>
									<view class="passengerView_info">
										<view>乘客：{{passager.PassengerName}}</view>
									</view>
									<view class="passengerView_info">
										<view>上车点：{{passager.PickUpAddress}}</view>
									</view>
									<view @click="toCallPassenger(passager.PhoneNumber)">
										<image src="../../static/driver/phone.png" style="width: 50rpx;margin-top: 20rpx;" mode="widthFix"></image>
									</view>
								</view>
								<view class="btnarea">
									<view>
										<button @click="toDetail(item[0].OrderState,item[0].OrderAID,item)" style="width: auto;">详情</button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 出租车结束 -->
				</view>
			</view>
			<!--已完成-->
			<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==2">
				<view v-for="(item,index) in finishedArr" :key="index">
					<!-- 出租车开始 -->
					<view style="margin-top: 20rpx;">
						<!-- <view class="booktime" v-if="item.orderType == '预约'">
							预约日期：{{taxiFormatTime(item.appointmentTime)}}
						</view> -->
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/CPDG.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">接客服务</view>
									</view>
									<view class="orderstatus">{{formatState(item[0].OrderState)}}</view>
								</view>

								<view class="passengerView" v-for='(passager, index1) in item' :key='index1'>
									<view class="passengerView_info">
										<view>乘客：{{passager.PassengerName}}</view>
									</view>
									<view class="passengerView_info">
										<view>上车点：{{passager.PickUpAddress}}</view>
									</view>
									<view @click="toCallPassenger(passager.PhoneNumber)">
										<image src="../../static/driver/phone.png" style="width: 50rpx;margin-top: 20rpx;" mode="widthFix"></image>
									</view>
								</view>
								<view class="btnarea">
									<view>
										<button @click="toDetail(item[0].OrderState,item[0].OrderAID,item)" style="width: auto;">详情</button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 出租车结束 -->
				</view>
			</view>

		</view>
	</view>
	</view>
</template>

<script>
	import uniTransition from '@/components/uni-transition/uni-transition.vue'
	export default {
		components: {
			uniTransition
		},
		data() {
			return {
				//carTypeid: 0,
				ani: ['slide-top', 'zoom-in'],
				current: 0,
				orderArr: [],
				underwayArr: [], //进行中
				finishedArr: [], //已完成
				cancleArr: [], //已取消
				userInfo: '',
			}
		},
		onLoad() {
			let that = this;
		},
		onShow() {
			var that = this;
			that.userInfo = uni.getStorageSync('userInfo') || '';
			if (that.userInfo == '') {
				that.showToast('请先登录');
			} else {
				that.getTaxiOrder();
			}
		},
		onPullDownRefresh() {
			var that = this;
			if (that.userInfo != '') {
				uni.showLoading({
					mask: true
				});
				that.getTaxiOrder();
			}
		},
		methods: {
			showToast: function(title, icon = 'none') {
				uni.showToast({
					title: title,
					icon: icon
				});
			},
			tabclick: function(e) {
				this.current = e;
			},
			show: function(el) {
				el.IsShow = !el.IsShow
			},
			getTaxiOrder: function() {
				let that = this;
				uni.stopPullDownRefresh();
				uni.request({
					url: that.$order.Interface.GetOrderListByDriverID.value,
					method: that.$order.Interface.GetOrderListByDriverID.method,
					data: {
						DriverID: that.userInfo.AID,
					},
					success: function(res) {
						console.log(res);
						if (res.statusCode == 200) {
							that.orderArr = [];
							that.orderArr = res.data.data;
							//for循环取出每个的状态
							for (var i = 0; i < that.orderArr.length; i++) {
								that.underwayArr = that.orderArr.filter(x => {
									return x[i].OrderState == 0;
								});
								that.finishedArr = that.orderArr.filter(x => {
									return x[i].OrderState == 1;
								});
							}

							// that.cancleArr = that.orderArr.filter(x => {
							// 	return x.orderState == '已取消';
							// });
						} else {
							that.showToast(res.data.msg);
						}
					},
					fail: function(res) {
						//console.log(res);
						uni.hideLoading();
						that.showToast('网络连接失败');
					}
				})
			},
			//--------------------订单状态格式化--------------------------
			formatState: function(OrderState) {
				switch (OrderState) {
					case 1:
						return '已完成';
						break;
					case 0:
						return '未完成';
						break;
					default:
						return '';
				}
			},
			//详情
			toDetail: function(item,OrderAID,orderItem) {
				let that = this;
				if (item== 0) {
					uni.navigateTo({
						url: '../JKSJ/Destination?orderArr=' + encodeURIComponent(JSON.stringify(orderItem))
					});
				} else {
					uni.navigateTo({
						url: '../JKSJ/orderDetail?OrderAID=' + OrderAID
					});
				}

			},
			//联系乘客
			toCallPassenger: function(item) {
				let that = this;
				if (item == null) {
					that.showToast('获取手机号出错');
					return;
				}
				uni.makePhoneCall({
					phoneNumber: item
				});
			},
			//到达
			toArrive: function(item) {
				let that = this;
				uni.showLoading({
					mask: true
				});
				let url = '';
				let method = '';
				let data = '';
				if (item.title == '出租车') {
					url = that.$taxi.Interface.FinishExpressOrder_Driver.value;
					method = that.$taxi.Interface.FinishExpressOrder_Driver.method;
					data = {
						orderNumber: item.orderNumber
					};
				} else if (item.title == '专线车') {
					url = that.$CzcPrivate.Interface.FinishSpecialLineOrder_Driver.value;
					method = that.$CzcPrivate.Interface.FinishSpecialLineOrder_Driver.method;
					data = {
						orderNumber: item.orderNumber
					};
				} else if (item.title == '顺风车') {
					url = that.$downwindCar.Interface.FinishSF_HitchhikerOrder_Driver.value;
					method = that.$downwindCar.Interface.FinishSF_HitchhikerOrder_Driver.method;
					data = {
						orderNumber: item.orderNumber
					};
				}
				that.taxiRequest(url, method, data).then(res => {
					if (res.data.status) {
						if (item.title == '出租车') {
							that.showToast('到达成功');
							uni.navigateTo({
								url: '/pages/driver/otherExpenses?orderNumber=' + item.orderNumber,
							})
						} else if (item.title == '专线车') {
							that.showToast('到达成功');
							uni.navigateTo({
								url: '../driver/orderComplete'
							});
						} else if (item.title == '顺风车') {
							that.showToast('到达成功');
							uni.navigateTo({
								url: '../driver/orderComplete'
							});
						}
					} else {
						that.showToast(res.data.msg);
					}
				}).catch(rej => {
					that.showToast('网络连接失败');
				});
			},
			//发车
			toDepart: function(item) {
				let that = this;
				uni.showLoading({
					mask: true
				});
				let url = '';
				let method = '';
				let data = '';
				if (item.title == '出租车') {
					url = that.$taxi.Interface.SetoutExpressOrder_Driver.value;
					method = that.$taxi.Interface.SetoutExpressOrder_Driver.method;
					data = {
						orderNumber: item.orderNumber
					};
				} else if (item.title == '专线车') {
					url = that.$CzcPrivate.Interface.SetoutSpecialLineOrder_Driver.value;
					method = that.$CzcPrivate.Interface.SetoutSpecialLineOrder_Driver.method;
					data = {
						orderNumber: item.orderNumber
					};
				} else if (item.title == '顺风车') {
					url = that.$downwindCar.Interface.SetoutHitchhikerOrder_Driver.value;
					method = that.$downwindCar.Interface.SetoutHitchhikerOrder_Driver.method;
					data = {
						orderNumber: item.orderNumber
					};
				}

				that.taxiRequest(url, method, data).then(res => {
					//成功回调
					if (res.data.status) {
						if (item.title == '出租车') {
							uni.navigateTo({
								url: '../driver/confirmgetonCar?orderNumber=' + item.orderNumber
							});
						} else if (item.title == '专线车') {
							uni.navigateTo({
								url: '../ZXC/CzcPrivate?orderNumber=' + item.orderNumber
							});
						} else if (item.title == '顺风车') {
							uni.navigateTo({
								url: '../downwindCar/downwindCarDriver?orderNumber=' + item.orderNumber
							});
						}
					} else {
						that.showToast(res.data.msg);
					}
				}).catch(rej => {
					//失败回调
					that.showToast('网络连接失败');
				});
			},
			
			taxiFormatUserType: function(userType) {
				if (userType == 0) {
					return '普通用户';
				} else if (userType == 1) {
					return '普通会员';
				} else if (userType == 2) {
					return '超级会员';
				} else if (userType == 3) {
					return '其他用户';
				} else if (userType == 9) {
					return '体验会员';
				}
			},
			taxiFormatTime: function(time) {
				var dateTime = time.replace('T', ' ');
				if (dateTime.indexOf('1900') > -1) {
					return '';
				} else {
					return dateTime;
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F6F8FE;
	}

	.tab {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		padding: 0 20rpx 20rpx 20rpx;
	}

	.tabactive {
		border-bottom: solid 1px #FC4646;
		color: #FC4646;
	}

	.booktime {
		width: 375rpx;
		background-color: #06B4FD;
		color: #FFF;
		font-size: 24rpx;
		height: 48rpx;
		border-radius: 24rpx;
		text-align: center;
		line-height: 48rpx;
	}

	.order {
		background-color: #FFF;
		margin-top: 20rpx;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		border-radius: 20rpx;
	}

	.ordertitle {
		font-size: 36rpx;
		padding-left: 5rpx;
		font-family: Source Han Sans SC;
		font-weight: bold;
		color: rgba(44, 45, 45, 1);
		line-height: 42rpx;
	}

	.orderstatus {
		font-size: 33rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 50rpx;
		margin-right: 20rpx;
	}

	.btnarea {
		display: flex;
		justify-content: flex-end;
		padding-top: 40rpx;
		flex-wrap: nowrap
	}

	.btnarea uni-view {
		padding-left: 20rpx;
	}

	.btnarea button {
		background-color: #FFF;
		font-size: 32rpx;
		color: #333333;
		width: 140rpx;
	}

	.one {
		width: 150rpx;
		height: 80rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		/*相对位置*/
		position: absolute;
		bottom: -95rpx;
		z-index: 555;
		text-align: center;
		font-size: 32rpx;
		color: #333333;
		line-height: 80rpx;
	}

	.one0 {
		width: 0;
		height: 0;
		border: 20rpx solid white;
		border-top: none;
		border-right-color: transparent;
		border-left-color: transparent;
		/*绝对位置*/
		position: absolute;
		top: -20rpx;
		left: 40rpx;
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
		border-radius: 20rpx;

		.passengerView_info {
			display: inline-block;
			font-size: 30rpx;
			color: #333333;
		}
	}
</style>
