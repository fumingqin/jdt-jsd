<template>
	<view>
		<view class="status_bar"></view>
		<view style="margin: 30rpx;">
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view>
					<!-- <image @click="back" src="../../static/driver/back.png" style="width: 18rpx; height: 34rpx;"></image> -->
					<uni-icons type="contact" size="30" @click="navToGrzx"></uni-icons>
				</view>
				<view style="color: #333333; font-size: 38rpx;font-weight:bold;">客运司机</view>
				<view style="width: 18rpx; height: 34rpx;"></view>
			</view>
			
			<!-- 接单信息 -->
			<scroll-view v-if="ScheduleState" :style="{height:scollerHeight}" scroll-y="true" style="margin-top: 10rpx;">

				<view style="padding:40rpx 35rpx;background-color: #FFF;border-radius: 20rpx;margin-top: 20rpx;" v-for="(item,index) in orderInfo"
				 :key="index">
					<view v-show="item.title === '定制班车'">
						<view style="font-size: 34rpx;color: #333333;font-weight: bold;">{{item.title}}</view>
						<view style="font-size: 34rpx;color: #333333;font-weight: bold;">发车时间：{{formatSetoutTime(item.data.SetoutTime)}}</view>
						<view style="font-size: 30rpx;color: #333333;line-height: 60rpx;">
							<view>出发地：{{formatStartSite(item.data)}}</view>
							<view>目的地：{{formatEndSite(item.data)}}</view>
							<view>车牌号：{{item.data.CoachCardNumber}}</view>
							<view style="display: flex;">
								<view>已检：{{formatCheckCount(item.data).isCheckCount}}人</view>
								<view style="padding-left: 30rpx;">未检：{{formatCheckCount(item.data).unCheckCount}}人</view>
							</view>
							<view style="padding: 40rpx 0 20rpx 0;" @click="depart(item.data)">
								<button style="height:90rpx;background:linear-gradient(270deg,rgba(249,92,117,1),rgba(250,116,101,1));border-radius:12rpx;color: #FFF;">查看详情</button>
							</view>
							<view style="padding-top: 20rpx;" @click="changeCardNumber">
								<button style="height:90rpx;background:linear-gradient(270deg,rgba(249,92,117,1),rgba(250,116,101,1));border-radius:12rpx;color: #FFF;">更换车牌号</button>
							</view>
						</view>
					</view>
				</view>
				
				<!-- <view style="padding: 40rpx 0 20rpx 0;width: 90%;margin-left: 36rpx;" @click="changeCardNumber">
					<button style="height:90rpx;background:linear-gradient(270deg,rgba(249,92,117,1),rgba(250,116,101,1));border-radius:12rpx;color: #FFF;">更换车牌号</button>
				</view> -->
				
			</scroll-view>
			<view v-if="!ScheduleState" style="text-align: center;justify-content: space-between;margin-top: 200rpx;font-size: 36rpx;">
				今日暂无可查询班次
			</view>
		</view>
	</view>
</template>

<script>
	import tc from '@/common/my-openMap/transformCoordinate.js'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {uniIcons},
		data() {
			return {
				scollerHeight: 0,
				classNum: 5,
				orderInfo: [],
				CustomizedBusOrderInfo: [],
				userInfo: '',
				vehicleInfo: '',
				ScheduleState:false,//班次状态
			}
		},
		onLoad() {
			let that = this;
			
			// that.orderInfo.push({
			// 	title: '定制班车',
			// 	data: that.$Ky.testData
			// })
		},
		onShow() {
			let that = this;
			that.userInfo = uni.getStorageSync('userInfo') || '';
			that.getRunScheduleInfo(that.userInfo);
			// that.vehicleInfo = uni.getStorageSync("vehicleInfo") || '';
			if (that.userInfo == '') {
				that.showToast('未取得用户信息');
			} else {
				uni.showLoading({
					mask: true
				});
				//that.getRunScheduleInfo();
				//that.getCustomizedBusScheduleInfo();
			}
		},
		onPullDownRefresh() {
			let that = this;
			uni.showLoading({
				mask: true
			});
			that.getRunScheduleInfo();
			// that.getCustomizedBusScheduleInfo();
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
			showToast: function(title, icon = 'none') {
				uni.showToast({
					title: title,
					icon: icon
				});
			},
			back: function() {
				let that = this;
				uni.switchTab({
					url: '/pages/index/index',
				})
			},
			navToGrzx(){
				uni.navigateTo({
					url: '/pages/grzx/ky_user',
				})
			},


			//定制班车开始----------------------------------------------
			depart: function(item) {
				let that = this;
				item.SiteTicketList = that.arrayDistinct(item.SiteTicketList);
				item.SiteTicketList = that.arrayBDToGcj02(item.SiteTicketList);
				uni.setStorageSync('scheduleInfo', item);
				uni.navigateTo({
					url: '/pages/CTKYDriver/index',
				})
			},
			getRunScheduleInfo: function(userInfo) {
				//获取定制班车
				let that = this;
				uni.stopPullDownRefresh();
                console.log(that.userInfo);
				uni.request({
					url: that.$Ky.Interface.GetMyScheduleAndTickets.value,
					method: that.$Ky.Interface.GetMyScheduleAndTickets.method,
					data: {
						UserAID: that.userInfo.AID,
						Code: that.userInfo.code,
					},
					success: function(res) {
						console.log(res);
						uni.hideLoading();
						that.orderInfo = [];
						if (res.statusCode==200) {
							let data = res.data;
							that.orderInfo.push({
								title: '定制班车',
								data: data.ScheduleAndTickets
							});
							if(res.data.ScheduleAndTickets==null){
								that.ScheduleState=false;
							}else{
								that.ScheduleState=true;
							}
						}
					},
					fail: function(res) {
						uni.hideLoading();
						//console.log(res);
						that.showToast('网络连接失败');
					}
				});
			},
			//定制班车结束--------------------------------------
		
			arrayDistinct: function(array) {
				let siteNameArr = [];
				for (let item of array) {
					siteNameArr.push(item.SiteName);
				}
				let distinctArr = array.filter((x, index) => {
					return siteNameArr.indexOf(x.SiteName) == index
				});
				return distinctArr
			},
			arrayBDToGcj02: function(array) {
				for (let item of array) {
					var arr = tc.bd09togcj02(parseFloat(item.Longitude), parseFloat(item.Latitude));
					item.Longitude = arr[0];
					item.Latitude = arr[1];
				}
				return array;
			},
			formatStartSite: function(item) {
				return item.SiteTicketList[0].SiteName;
			},
			formatEndSite: function(item) {
				return item.SiteTicketList[item.SiteTicketList.length - 1].SiteName;
			},
			formatCheckCount: function(item) {
				let isCheckCount = item.Tickets.filter(x => x.Checked).length;
				let unCheckCount = item.Tickets.filter(x => !x.Checked).length;
				return {
					isCheckCount: isCheckCount,
					unCheckCount: unCheckCount
				}
			},
			formatSetoutTime: function(dateTime) {
				console.log(dateTime);
				return dateTime.replace('T',' ').substring(0, 16);
				
			},
			changeCardNumber(){
				uni.navigateTo({
					url:'./homeSattionPick'
				})
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
