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
		<view v-for='(item, index) in orderArr'  :key='index' style="width: 94%;height: 475rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 30rpx;">
			<view style="padding: 40rpx;display: flex;flex-direction: row;">
				<text class="destinationArea" style="width:160rpx;">目的区域:</text>
				<text class="destinationArea" style="margin-left: 10rpx;">{{item.destinationArea}}</text>
			</view>
			<view style="margin: -10rpx 44rpx;display: flex;flex-direction: row;">
				<text class="userType">客户类型:</text>
				<text class="userType">普通</text>
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
	</view>
</template>

<script>
	import Map from '../../common/my-openMap/openMap.js';
	export default {
		data() {
			return {
				orderArr:[],
				getOrderInterval:0,
				userInfo:'',
				vehicleInfo:''
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
				that.realTimeOrder(that.userInfo.driverId,that.vehicleInfo.vehicleNumber); 
			}
		},
		onUnload(){
			let that = this;
			clearInterval(that.getOrderInterval); 
		},
		methods: {
			//本页面统一调用此方法
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
						console.log(res);
						uni.hideLoading();
						if(res.data.status){
							switch(item.orderType){
								case '实时':
									uni.navigateTo({
										url: '/pages/driver/confirmgetonCar',
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
							that.getOrder();
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
			formatEstimateDistance:function(estimateDistance){
				return estimateDistance + '公里';
			},
			formatEstimateTime:function(estimateTime){
				let time = (estimateTime/60) > 1 ? ((estimateTime/60) +'小时') :  (estimateTime + '分钟');
				
				return time
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
	.fontClass{
		font-size:30rpx;
		font-family:Source Han Sans SC;
		color:#666666;
		line-height:36rpx;
	}
</style>
