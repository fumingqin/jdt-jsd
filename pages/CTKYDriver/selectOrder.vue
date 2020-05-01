<template>
	<view>
		<view class="status_bar"></view>
		<view style="margin: 30rpx;">
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view>	
					<image @click="back" src="../../static/driver/back.png" style="width: 18rpx; height: 34rpx;"></image>
				</view>
				<view style="color: #333333; font-size: 38rpx;font-weight:bold;">客运司机</view>
				<view style="width: 18rpx; height: 34rpx;"></view>
			</view>
			<!-- 本月接单量 -->
			<view style="background-color: #FFFFFF;border-radius:20rpx; margin-top:30rpx;">
				<view style="padding: 30rpx;display: flex;justify-content: space-between;align-items: center;">
					<text style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:42rpx;">今日班次量</text>
					<view style="display: flex;align-items: center;">
						<view style="margin:0 20rpx;width: 40rpx;height: 40rpx;border-radius: 100px;background: linear-gradient(270deg,rgba(250,116,101,1),rgba(249,92,117,1));font-size: 26rpx;color: #FFF;text-align: center;font-weight: 600;">
							{{classNum}}
						</view>
						<image style="width: 14rpx;height: 26rpx;" src="../../static/driver/right.png"></image>
					</view>
				</view>
			</view>
			<!-- 接单信息 -->
			<scroll-view :style="{height:scollerHeight}" scroll-y="true" style="margin-top: 10rpx;">
				<view style="padding:40rpx 35rpx;background-color: #FFF;border-radius: 20rpx;margin-top: 20rpx;" v-for="(item,index) in orderInfo"
				 :key="index">
					<view style="font-size: 34rpx;color: #333333;font-weight: bold;">发车时间：{{item.departureTime}}</view>
					<view style="font-size: 30rpx;color: #333333;line-height: 60rpx;">
						<view>出发地：{{item.beginAddress}}</view>
						<view>目的地：{{item.endAddress}}</view>
						<view style="display: flex;">
							<view>已检：{{item.checkedNum}}人</view>
							<view style="padding-left: 30rpx;">未检：{{item.noCheckedNum}}人</view>
						</view>
						<view style="padding: 40rpx 0 20rpx 0;" @click="depart(item)">
							<button style="height:90rpx;background:linear-gradient(270deg,rgba(249,92,117,1),rgba(250,116,101,1));border-radius:12rpx;color: #FFF;">查看详情</button>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scollerHeight: 0,
				classNum:5,
				orderInfo: [
					{
						ScheduleAndTickets:	{
							ExecuteScheduleID:'',
							PlanScheduleCode:'',
							DriverID:'',
							DriverName:'',
							CoachCardNumber:'闽CK1678',
							LineID:'',
							LineName:'泉州-石狮',
							SetoutTime:'07-21 13:00',
							SetoutStationName:'',
							FreeSeats:'',
							Tickets:[
								{
									BookTicketAID:'',
									SeatNumber:'',
									TicketID:'',
									PassengerID:'',
									PassengerName:'',
									BillNumber:'',
									StartSiteName:'',
									EndSiteName:'',
									StartEndSiteName:'',
									BuyType:'',
									Checked:'',//bool
									TicketType:'',
									CarryChild:'',//bool
									PhoneNumber:'',
								}
							],
							SiteTicketList:[{
								SiteID:'',
								SiteName:'客运中心站',
								ThisSiteGetonTicketCount:'',//INT
								ThisSiteGetonTickets:[{
									BookTicketAID:'',
									SeatNumber:'',
									TicketID:'',
									PassengerID:'',
									PassengerName:'',
									BillNumber:'',
									StartSiteName:'',
									EndSiteName:'',
									StartEndSiteName:'',
									BuyType:'',
									Checked:'',//bool
									TicketType:'',
									CarryChild:'',//bool
									PhoneNumber:'',
								}],
								ThisSiteGetoffTicketCount:'',//INT
								ThisSiteGetoffTickets:[{
									BookTicketAID:'',
									SeatNumber:'',
									TicketID:'',
									PassengerID:'',
									PassengerName:'',
									BillNumber:'',
									StartSiteName:'',
									EndSiteName:'',
									StartEndSiteName:'',
									BuyType:'',
									Checked:'',//bool
									TicketType:'',
									CarryChild:'',//bool
									PhoneNumber:'',
								}],
								Longitude:'',
								Latitude:'',
							}],
							MyLine:{
								LineID:'',
								LineName:'',
								Mileage:'',
								RunTime:'',//INT
								StartSiteName:'',
								EndSiteName:'',
								StationCompanyCode:'',
								ViaSiteDesc:'',
								MyLineSite:[],
							}
						},
					}
				
					
					/* {
						departureTime: '2020-03-02 8:00', //发车时间
						beginAddress: '茶叶大厦',//上车点
						endAddress: '晋江机场',//下车点
						checkedNum: 10,//已检人数
						noCheckedNum: 8//未检人数
					}, */
					/* {
						departureTime: '2020-03-02 12:20', //发车时间
						beginAddress: '晋江机场',
						endAddress: '茶叶大厦',
						checkedNum: 10,
						noCheckedNum: 2
					},
					{
						departureTime: '2020-03-02 15:00', //发车时间
						beginAddress: '茶叶大厦',
						endAddress: '晋江机场',
						checkedNum: 10,
						noCheckedNum: 0
					} */
					
				],
				
				
				userInfo:'',
				vehicleInfo:'',
			}
		},
		onLoad() {
			let that = this;
			that.userInfo = uni.getStorageSync('userInfo') || '';
			that.vehicleInfo = uni.getStorageSync("vehicleInfo")||'';
			if(that.userInfo == ''){
				that.showToast('未取得用户信息');
			}else if(that.vehicleInfo == ''){
				that.showToast('未取得车辆信息');
			}else {
				that.getRunScheduleInfo();
			}
		},
		onShow() {
			
		},
		mounted() {
			var that = this;
			uni.getSystemInfo({
				success(res) {
					that.scollerHeight = res.windowHeight - (res.windowWidth / 750) * 310 + "px"
				}
			})
		},
		methods: {
			showToast:function(title,icon='none'){
				uni.showToast({
					title:title,
					icon:icon
				});
			},
			back: function() {
				let that = this;
				uni.switchTab({
					url: '/pages/index/index',
				})
			},
			depart:function(item) {
				let that = this;
				uni.setStorageSync('scheduleInfo',item);
				uni.navigateTo({
					url: '/pages/CTKYDriver/index',
				})
			},
			getRunScheduleInfo:function(){
				let that = this;
				uni.showLoading({
					mask:true
				});
				uni.request({
					url:that.$Ky.Interface.GetRunScheduleInfoByVheicleNumberDriverPhone.value,
					method:that.$Ky.Interface.GetRunScheduleInfoByVheicleNumberDriverPhone.method,
					data:{
						vehicleNumber : that.vehicleInfo.vehicleNumber,
						phoneNumber : that.userInfo.phoneNumber,
						//vehicleNumber:'闽CYB103',
						//phoneNumber:'18965641002'
					},
					success:function(res){
						uni.hideLoading();
						console.log(res);
						if(res.data.status){
							
						} else {
							that.showToast('未取得订单信息');
						}
					},
					fail:function(res){
						uni.hideLoading();
						console.log(res);
						that.showToast('网络连接失败');
					}
				});
			},
		}
	}
</script>

<style>
	page {
		background-color: #F5F9FC;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		box-sizing: content-box;
	}
</style>
