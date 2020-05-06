<template>
	<view>
		<view style="display: flex">
			<view>
				<image @click="back" src="../../static/driver/back.png" style="width: 18rpx; height: 34rpx; margin:103rpx 26rpx; color: #2C2D2D;"></image>
			</view>
			<view style="width: 200rpx; height: 36rpx; margin: 92rpx 212rpx;color: #333333; font-size: 38rpx;font-weight:bold;">出租车司机</view>
		</view>
		
		<view style="display: flex;width: 100%;justify-content: center;margin-top: -50rpx;">
			<view style="width: 94%;display: flex;justify-content: space-between;">
				<button @click="switchover(true)"  :class="[buttonActive?'buttonActive':'']" style="width: 45%;margin: 0;" >
					<text :class="[buttonActive?'buttonFont':'unButtonFont']" class="buttonFont">出租车</text>
				</button>
				<button @click="switchover(false)" :class="[buttonActive?'':'buttonActive']" style="width: 45%;margin: 0;">
					<text :class="[buttonActive?'unButtonFont':'buttonFont']" class="buttonFont">专线</text>
				</button>
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
		
		<!-- 专线车-今日接单量 -->
		<view v-if="!buttonActive" style="width: 94%;height: 105rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx;margin-top: 30rpx;margin-bottom: 30rpx;">
			<view style="padding: 30rpx;display: flex;justify-content: space-between;align-items: center;">
				<text style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:42rpx;">今日班次量</text>
				<view style="display: flex;align-items: center;">
					<view style="margin:0 20rpx;width: 40rpx;height: 40rpx;border-radius: 100px;background: linear-gradient(270deg,rgba(250,116,101,1),rgba(249,92,117,1));font-size: 26rpx;color: #FFF;text-align: center;font-weight: 600;">
						{{specialLineOrderNum}}
					</view>
					<!-- <image style="width: 14rpx;height: 26rpx;" src="../../static/driver/right.png"></image> -->
				</view>
			</view>
		</view>
		
	
		<!-- 接单信息-出租车 -->
		<view v-if="buttonActive" v-for='(item, index) in orderArr'  :key='index' style="width: 94%;padding-bottom: 30rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-bottom: 30rpx;">
			<view style="padding: 40rpx;display: flex;flex-direction: row;">
				<text class="destinationArea" style="width:160rpx;">目的区域:</text>
				<text class="destinationArea" style="margin-left: 10rpx;">{{item.destinationArea}}</text>
			</view>
			<view style="margin: -10rpx 44rpx;display: flex;flex-direction: row;">
				<text class="userType">客户类型:</text>
				<text class="userType">{{formatUserType(item.userType)}}</text>
			</view>
			<view style="margin: 20rpx 44rpx;display: flex;flex-direction: row;">
				<text class="fontClass" style="width:140rpx;height:40rpx;">订单类型:</text>
				<text class="fontClass" style="width:140rpx;height:40rpx;">{{item.orderType}}</text>
			</view>
			<view style="margin: 20rpx 44rpx;display: flex;flex-direction: row;" v-if="item.orderType == '预约'">
				<text class="fontClass" style="width:140rpx;height:40rpx;">预约时间:</text>
				<text class="fontClass" style="height:40rpx;">{{formatTime(item.appointmentTime)}}</text>
			</view>
			<view style="margin: 20rpx 44rpx;display: flex;flex-direction: row;">
				<text class="fontClass" style="width:140rpx;height:40rpx;">预计里程:</text>
				<text class="fontClass" style="width:140rpx;height:40rpx;">{{formatEstimateDistance(item.estimateDistance)}}</text>
				<text class="fontClass" style="width:140rpx;height:40rpx;margin-left: 40rpx;">预计时长:</text>
				<text class="fontClass" style="width:140rpx;height:40rpx;">{{formatEstimateTime(item.estimateTime)}}</text>  
			</view>
			<view style="margin: -10rpx 40rpx;display: flex;flex-direction: row;">
				<text class="fontClass" style="width:110rpx;height:40rpx;">上车点:</text>
				<text class="fontClass" style="height:40rpx;">{{item.startAddress}}</text>
			</view>
			<view style="margin: 20rpx 40rpx;display: flex;flex-direction: row;">
				<text class="fontClass" style="width:110rpx;height:40rpx;">下车点:</text>
				<text class="fontClass" style="height:40rpx;">{{item.endAddress}}</text>
			</view>
			<view style="display: flex; margin-left: 4rpx;">
				<button @click="receipt(item)" style="width:278rpx;height:90rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #ED766C; border: 1px solid #ED766C; color: #FFFFFF; align-items: center;">
					接单
				</button>
				<button @click="reject(item)" style="width:278rpx;height:90rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #FFFFFF; border: 1px solid #666666; color: #666666; align-items: center; margin-left: -16rpx;">
					拒接
				</button>
			</view>
		</view>
		
		<!-- 接单信息-专线车 -->
		<view v-if="!buttonActive" v-for='(item, index) in specialLineArr'  :key='index' style="width: 94%;padding-bottom: 30rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 30rpx;">
			<view style="padding: 40rpx;display: flex;flex-direction: row;">
				<text class="destinationArea">专线名:</text>
				<text class="destinationArea" style="margin-left: 10rpx;">{{item.StartAddress}}-{{item.EndAddress}}</text>
			</view>
			<view style="margin: -10rpx 44rpx;display: flex;flex-direction: row;">
				<text class="userType">客户类型:</text>
				<text class="userType">{{formatUserType(item.UserType)}}</text>
			</view>
			<view style="margin: 20rpx 44rpx;display: flex;flex-direction: row;">
				<text class="userType">预约时间:</text>
				<text class="userType1">{{formatTime(item.AppointmentTime)}}</text>
			</view>
			<view style="margin: 20rpx 44rpx;display: flex;flex-direction: row;">
				<text class="fontClass" style="width:140rpx;height:40rpx;">预计里程:</text>
				<text class="fontClass" style="width:140rpx;height:40rpx;">{{formatEstimateDistance(item.EstimateDistance)}}</text>
				<text class="fontClass" style="width:140rpx;height:40rpx;margin-left: 40rpx;">预计时长:</text>
				<text class="fontClass" style="width:140rpx;height:40rpx;">{{formatEstimateTime(item.EstimateTime)}}</text>  
			</view>
			<view style="margin: -10rpx 40rpx;display: flex;flex-direction: row;">
				<text class="fontClass" style="width:110rpx;height:40rpx;">上车点:</text>
				<text class="fontClass" style="height:40rpx;">{{item.StartAddress}}</text>
			</view>
			<view style="margin: 20rpx 40rpx;display: flex;flex-direction: row;">
				<text class="fontClass" style="width:110rpx;height:40rpx;">下车点:</text>
				<text class="fontClass" style="height:40rpx;">{{item.EndAddress}}</text>
			</view>
			<view style="display: flex; margin-left: 4rpx;">
				<button @click="specialLineReceipt(item)" style="width:278rpx;height:90rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #ED766C; border: 1px solid #ED766C; color: #FFFFFF; align-items: center;">
					接单
				</button>
				<button @click="specialLineReject(item)" style="width:278rpx;height:90rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #FFFFFF; border: 1px solid #666666; color: #666666; align-items: center; margin-left: -16rpx;">
					拒接
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import Map from '../../common/my-openMap/openMap.js';
	import utils from '@/components/shoyu-date/utils.filter.js';
	export default {
		data() {
			return {
				orderArr:[],
				specialLineArr:[],
				getOrderInterval:0,
				userInfo:'',
				vehicleInfo:'',
				buttonActive:true,
				taxiOrderNum:0,
				specialLineOrderNum:0
			}
		},
		onLoad() {
			let that = this;
			uni.hideLoading();
			that.userInfo = uni.getStorageSync('userInfo') || '';
			that.vehicleInfo = uni.getStorageSync("vehicleInfo")||'';
			if(that.userInfo == ''){
				that.showToast('请先登录');
				console.log(that.userInfo);
			} else if(that.vehicleInfo == '') {
				that.showToast('请先上班');
			} else {
				uni.showLoading({
					mask:true
				});
				//在getOrder里面会关闭
				that.getOrder(that.userInfo.driverId,that.vehicleInfo.vehicleNumber);
				that.getSpecialLineOrder(that.userInfo.driverId,that.vehicleInfo.vehicleNumber);
				that.realTimeOrder(that.userInfo.driverId,that.vehicleInfo.vehicleNumber); 
				//统计
				that.getTaxiTodayOrderCount();
				that.getSpecialTodayOrderCount();
			}
		},
		onUnload(){
			let that = this;
			clearInterval(that.getOrderInterval); 
		},
		methods: {
			//本页面统一调用此方法
			switchover:function(value){
				let that = this;
				that.buttonActive = value;
			},
			
			showToast:function(title,icon='none'){
				uni.showToast({
					title:title,
					icon:icon
				});
			},
			back: function() {
				uni.switchTab({
					url: '/pages/index/index',
				})
			},
			receipt:function(item) {
				//接单
				let that = this;
				uni.showLoading({
					mask:true
				});
				uni.request({
					url:that.$taxi.Interface.ReceiptExpressOrder_Driver.value,
					method:that.$taxi.Interface.ReceiptExpressOrder_Driver.method,
					data:{
						OrderNumber:item.orderNumber,
						driverId:that.userInfo.driverId,
						driverName:that.userInfo.userName,
						driverPhone:that.userInfo.phoneNumber,
						vehicleNumber:that.vehicleInfo.vehicleNumber,
					},
					success:function(res){
						uni.hideLoading();
						if(res.data.status){
							switch(item.orderType){
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
						}else{
							that.showToast(res.data.msg);
						}
					},
					fail:function(res){
						uni.hideLoading();
						that.showToast('网络连接失败');
						console.log(res);
					}
				})
			},
			
			specialLineReceipt:function(item){
				//专线车接单
				let that = this;
				uni.showLoading({
					mask:true
				});
				uni.request({
					url:that.$CzcPrivate.Interface.ReceiptSpecialLineOrder_Driver.value,
					method:that.$CzcPrivate.Interface.ReceiptSpecialLineOrder_Driver.method,
					data:{
						OrderNumber:item.OrderNumber,
						DriverId:that.userInfo.driverId,
						DriverName:that.userInfo.userName,
						DriverPhone:that.userInfo.phoneNumber,
						VehicleNumber:that.vehicleInfo.vehicleNumber,
					},
					success:function(res){
						console.log(res);
						uni.hideLoading();
						if(res.data.status){
							that.showToast('接单成功,请到订单列表查看');
						}else{
							that.showToast(res.data.msg);
						}
					},
					fail:function(res){
						uni.hideLoading();
						that.showToast('网络连接失败');
						console.log(res);
					}
				})
			},
			reject:function(item) {
				//拒接
				let that = this;
				uni.showLoading({
					mask:true
				});
				uni.request({
					url:that.$taxi.Interface.RefuseExpressOrderByOrderNumDriverID_Driver.value,
					method:that.$taxi.Interface.RefuseExpressOrderByOrderNumDriverID_Driver.method,
					data:{
						orderNumber:item.orderNumber,
						driverId:that.userInfo.driverId,
					},
					success:function(res){
						//console.log(res);
						uni.hideLoading();
						if(res.data.status){
							that.showToast('已拒绝');
							that.getOrder(that.userInfo.driverId,that.vehicleInfo.vehicleNumber);
						}else{
							that.showToast(res.data.msg);
						}
					},
					fail:function(res){
						uni.hideLoading();
						that.showToast('网络连接失败');
						console.log(res);
					}
				})
			},
			specialLineReject:function(item){
				//专线车拒接
				let that = this;
				uni.showLoading({
					mask:true
				});
				uni.request({
					url:that.$CzcPrivate.Interface.RefuseSpecialLineOrderByOrderNumDriverID_Driver.value,
					method:that.$CzcPrivate.Interface.RefuseSpecialLineOrderByOrderNumDriverID_Driver.method,
					data:{
						OrderNumber:item.OrderNumber,
						DriverId:that.userInfo.driverId,
					},
					success:function(res){
						//console.log(res);
						uni.hideLoading();
						if(res.data.status){
							that.showToast('已拒绝');
							that.getOrder(that.userInfo.driverId,that.vehicleInfo.vehicleNumber);
						}else{
							that.showToast(res.data.msg);
						}
					},
					fail:function(res){
						uni.hideLoading();
						that.showToast('网络连接失败');
						console.log(res);
					}
				})
			},
			
			realTimeOrder:function(userId,vehicleNumber){
				//定时器开启
				let that = this;
				if(that.getOrderInterval == 0){
					that.getOrderInterval = setInterval(function(){
						that.getOrder(userId,vehicleNumber);
						that.getSpecialLineOrder(userId,vehicleNumber);
					},that.$taxi.delayTime.getOrderDelay.time);
				}
			},
			getOrder:function(userId,vehicleNumber){
				let that = this;
				uni.request({
					url:that.$taxi.Interface.GetCanReceiptExpressOrder_Driver.value,
					method:that.$taxi.Interface.GetCanReceiptExpressOrder_Driver.method,
					data:{
						driverId:userId,
						vehicleNumber:vehicleNumber
					},
					success:function(res){
						uni.hideLoading();
						if(res.data.status){
							that.orderArr = [];
							let data = res.data.data;
							that.orderArr = data;
						}else{
							that.showToast(res.data.msg);
						}
					},
					fail:function(res){
						uni.hideLoading();
						that.showToast('网络连接失败');
						console.log(res);
					}
				})
			},
			//专线车获取可接单订单列表
			getSpecialLineOrder:function(userId,vehicleNumber){
				let that = this;
				uni.request({
					url:that.$CzcPrivate.Interface.GetCanReceiptSpecialLineOrder_Driver.value,
					method:that.$CzcPrivate.Interface.GetCanReceiptSpecialLineOrder_Driver.method,
					data:{
						DriverId:userId,
						VehicleNumber:vehicleNumber 
					},
					success:function(res){
						uni.hideLoading();
						if(res.data.status){
							that.specialLineArr = [];
							let data = res.data.data;
							that.specialLineArr = data;
						}else{
							that.showToast(res.data.msg);
						}
					},
					fail:function(res){
						uni.hideLoading();
						that.showToast('网络连接失败');
						console.log(res);
					}
				});
			},
			
			getTaxiTodayOrderCount:function(){
				let that = this;
				var startDate = that.$myTime.getNowDate();
				var endDate = that.$myTime.addDay(startDate,1);
				uni.request({
					url:that.$taxi.Interface.GetExpressOrderCountByDriverID_Driver.value,
					method:that.$taxi.Interface.GetExpressOrderCountByDriverID_Driver.method,
					data:{
						driverId:that.userInfo.driverId,
						orderStartTime: utils.timeTodate(that.$home.dateFormat.dateformat, startDate.getTime()),
						orderEndTime:utils.timeTodate(that.$home.dateFormat.dateformat, endDate.getTime())
					},
					success:function(res){
						console.log(res);
						if(res.data.status){
							let data = res.data.data[0];
							that.taxiOrderNum = data == undefined ? 0 : data.orderNum;
						} else {
							console.log(res);
						}
					},
					fail:function(res){
						console.log(res);
					}
				})
			},
			getSpecialTodayOrderCount:function(){
				let that = this;
				var startDate = that.$myTime.getNowDate();
				var endDate = that.$myTime.addDay(startDate,1);
				uni.request({
					url:that.$CzcPrivate.Interface.GetSpecialOrderCountByDriverID_Driver.value,
					method:that.$CzcPrivate.Interface.GetSpecialOrderCountByDriverID_Driver.method,
					data:{
						driverId:that.userInfo.driverId,
						orderStartTime: utils.timeTodate(that.$home.dateFormat.dateformat, startDate.getTime()),
						orderEndTime:utils.timeTodate(that.$home.dateFormat.dateformat, endDate.getTime())
					},
					success:function(res){
						if(res.data.status){
							let data = res.data.data[0];
							that.specialLineOrderNum = data == undefined?0:data.orderNum;
						} else {
							console.log(res);
						}
					},
					fail:function(res){
						console.log(res);
					}
				})
			},
			
			formatEstimateDistance:function(estimateDistance){
				return parseFloat(estimateDistance).toFixed(1) + '公里';
			},
			formatEstimateTime:function(estimateTime){
				let time = (estimateTime/60) > 1 ? ((estimateTime/60) +'小时') :  (estimateTime + '分钟');
				return time 
			},
			formatUserType:function(userType){ 
				if(userType == 0){
					return '普通用户';
				} else if (userType == 1){
					return '普通会员';
				} else if (userType == 2){
					return '超级会员';
				} else if (userType == 3){
					return '其他用户';
				} else if( userType == 9){
					return '体验用户';
				}
			},
			formatTime:function(time){
				return time.replace('T',' ');
			}
		}
	}
</script>

<style>
	page {
		background-color: #F5F9FC;
	}
	.destinationArea{
		height:40rpx;
		font-size:36rpx;
		font-family:Source Han Sans SC;
		font-weight:bold;
		color:rgba(44,45,45,1);
		line-height:36rpx;
	}
	.userType{
		width:140rpx;
		height:40rpx;
		font-size:30rpx;
		font-family:Source Han Sans SC;
		color:#666666;
		line-height:36rpx;
	}
	.userType1{
		height:40rpx;
		font-size:30rpx;
		font-family:Source Han Sans SC;
		color:#666666;
		line-height:36rpx;
	}
	.fontClass{
		font-size:30rpx;
		font-family:Source Han Sans SC;
		color:#666666;
		line-height:36rpx;
	}
	.buttonActive{
		background:linear-gradient(270deg,#FA7465,#F95C75);
		box-shadow:0px 7px 38px 8px rgba(216,48,75,0.15);
	}
	.buttonFont{
		font-size:36rpx;
		font-family:Source Han Sans SC;
		font-weight:400;
		color:#FFFFFF;
	}
	.unButtonFont{
		font-size:36rpx;
		font-family:Source Han Sans SC;
		font-weight:400;
		color:#000000;
	}
</style>
