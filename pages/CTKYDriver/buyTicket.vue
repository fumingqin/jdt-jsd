<template>
	<view>
		<view>
			<view class="head">
				<view class="status_bar"></view>
				<view class="headbar">
					<uni-icons @click="goBack" type="arrowleft" size="24" color="#FFF"></uni-icons>
					<view class="title">购票</view>
					<view></view>
				</view>
			</view>
			<view style="padding: 0 30rpx;margin-top: -90rpx;">
				<view class="line">
					<view class="linedetail">
						<view>
							线路：{{ScheduleAndTickets.LineName}}
						</view>
					</view>
					<view class="linedetail">
						<view>
							发车时间：{{formatDate(ScheduleAndTickets.SetoutTime)}}
						</view>
					</view>
					<view class="linedetail">
						<view>
							司机姓名：{{ScheduleAndTickets.DriverName}}
						</view>
					</view>
					<view class="linedetail">
						<view>
							车牌号：{{ScheduleAndTickets.CoachCardNumber}}
						</view>
					</view>

				</view>
				<view class="uberstation" style="margin-top: 20rpx;">
					<view style="display: flex;align-items: center;">
						<view class="bluering"></view>
						<view style="padding-left: 10rpx;">上车点：</view>
						<view>{{startSite}}</view>
					</view>
					<view style="display: flex;align-items: center;">
						<view class="redring"></view>
						<view style="padding-left: 10rpx;">下车点：</view>
						<view>{{endSite}}</view>
					</view>
				</view>
				<!-- <view class="ticket">
					<view>数量</view>
					<view style="display: flex;align-items: center;">
						<view style="border:solid 1px #999999;width: 36rpx;height: 36rpx;border-radius: 100px;color: #999999;line-height: 30rpx;text-align: center;"
						 @click="changeNum(false)">
							—
						</view>
						<view>
							<input style="width: 60rpx;text-align: center;" v-model="num" type="number" @change="checknum" />
						</view>
						<view style="border:solid 1px #999999;width: 36rpx;height: 36rpx;border-radius: 100px;color: #999999;line-height: 30rpx;text-align: center;"
						 @click="changeNum(true)">
							+
						</view>
					</view>
				</view> -->
				<view class="ticket">
					<view>全票</view>
					<view style="color:#FC4646">￥{{price}}</view>
				</view>
				<view class="ticket">
					<view>半票</view>
					<view style="color:#FC4646">￥{{halfprice}}</view>
				</view>
				<view class="ticket">
					<radio-group @change="radioChange">
						<label class="radio">
							<radio value="0" checked="true" style="transform: scale(0.8)" color="#00b300" />全票</label>
						<label class="radio">
							<radio value="1" style="transform: scale(0.8)" color="#00b300" />半票</label>
						<label class="radio">
							<radio value="2" style="transform: scale(0.8)" color="#00b300" />免票</label>
					</radio-group>
				</view>
				<view class="ticket">
					携带儿童
					<radio-group @change="radiochrildChange">
						<label class="radio">
							<radio value="true" style="transform: scale(0.8)" color="#00b300" />是</label>
						<label class="radio">
							<radio value="false" checked="true" style="transform: scale(0.8)" color="#00b300" />否</label>
					</radio-group>
				</view>
				<view style="margin-top: 60rpx;display: flex;flex-direction: column;justify-content: space-between;align-items: center;">
				
					<view style="display: flex;">
						<view style="margin-right: 32rpx;">
							<button @click="payment" class="weixinpaybtn">
								<image src="../../static/CTKYDriver/weixin.png" style="width: 42rpx;height: 42rpx;padding-right: 20rpx;"></image>
								<text style="color: #FFF;font-size: 36rpx;">微信扫码支付</text>
							</button>
						</view>
				
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	export default {
		components: {
			uniIcons,
		},
		data() {
			return {
				num: 1,

				startSite: '',
				endSite: '',
				price: 0,
				halfprice: 0,

				userInfo: '',
				vehicleInfo: '',
				ScheduleAndTickets: '',
				executeScheduleID:'',
				startSiteID:'',
				endSiteID:'',
				tickets:0,
				chridren:false,
			}
		},
		onLoad(option) {
			let that = this;
			that.startSite = option.startSite;
			that.endSite = option.endSite;
		},
		onShow() {
			let that = this;
			that.userInfo = uni.getStorageSync('userInfo') || '';
			that.ScheduleAndTickets = uni.getStorageSync('scheduleInfo') || '';
			that.GetExecuteSchedulePrices();
			if (that.userInfo == '') {
				that.showToast('未取得用户信息');
			}

		},
		methods: {
			goBack: function() { //返回上一页
				uni.navigateBack();
			},
			checknum: function() {
				if (this.num < 1 || this.num == '') {
					uni.showToast({
						title: "票数不能小于1",
						icon: "none"
					})
					this.num = 1;
				}
				if (this.num > 60) {
					uni.showToast({
						title: "票数不能大于60",
						icon: "none"
					})
					this.num = 1;
				}

			},
			changeNum: function(type) {
				var that = this;
				if (type) {
					if (this.num == 60) {
						uni.showToast({
							title: "票数不能大于60",
							icon: "none"
						})
					} else {
						this.num++;
					}
				} else {
					if (this.num == 1) {
						uni.showToast({
							title: "票数不能小于1",
							icon: "none"
						})
					} else {
						this.num--;
					}
				}
			},
			//生成扫码支付
			payment: function() {
				var that = this;
				var param={
					Identity:'350624199906163254',
					Name:'张三' ,
					TicketType:that.tickets,
					IsCarryChild:that.chridren,
				}
				var parame=[];
				parame.push(param);
				console.log(that.userInfo.code,that.userInfo.AID,that.executeScheduleID,that.startSiteID,that.endSiteID);
				console.log(param);
				uni.request({
					url: that.$Ky.Interface.SellMobileTicket_Booking.value,
					method: that.$Ky.Interface.SellMobileTicket_Booking.method,
					data: {
						Code: that.userInfo.code,
						UserAID: that.userInfo.AID,
						executeScheduleID: that.executeScheduleID,
						startSiteID: that.startSiteID,
						endSiteID: that.endSiteID,
						param: parame,
					},
					success: function(res) {
						console.log(res);

					},
					fail: function(res) {
						//console.log(res);
						that.showToast('网络连接失败');
					}
				});
			},

			//-------------------------获取票价-------------------------
			GetExecuteSchedulePrices() {
				var that = this;
				uni.request({
					url: that.$Ky.Interface.GetMyCurrentExecuteSchedulePrices.value,
					method: that.$Ky.Interface.GetMyCurrentExecuteSchedulePrices.method,
					data: {
						Code: that.userInfo.code,
						UserAID: that.userInfo.AID,
					},
					success: function(res) {
						console.log(res);
						//这里的return类似于if判断
						var priceArr = res.data.MyPriceItems.filter(x => {
							return x.StartSiteName == that.startSite && x.EndSiteName == that.endSite;
						});
						that.price = priceArr[0].FullPrice;
						that.halfprice = priceArr[0].HalfPrice;
						that.executeScheduleID=res.data.MySchedule.ExecuteScheduleID;
						that.startSiteID=priceArr[0].StartSiteID;
						that.endSiteID=priceArr[0].EndSiteID;
					},
					fail: function(res) {
						//console.log(res);
						that.showToast('网络连接失败');
					}
				});

			},
			showToast: function(title, icon = 'none') {
				uni.showToast({
					title: title,
					icon: icon
				});
			},
			//--------------单选按钮点击事件-------------
			radioChange(e){
				this.tickets = e.detail.value;
			},
			//--------------单选按钮点击事件-------------
			radiochrildChange(e){
				this.children = e.detail.value;
			},
			formatDate: function(time) {
				return time.substring(5, 10) + ' ' + time.substring(11, 16);
			}
		}
	}
</script>

<style>
	page {
		background-color: #F6F8FA;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		box-sizing: content-box;
	}

	.head {
		width: 750rpx;
		height: 257rpx;
		background: linear-gradient(0deg, rgba(254, 68, 109, 1) 0%, rgba(254, 148, 95, 1) 100%);
		/* position: fixed;
		top: 0; */
	}

	.headbar {
		padding: 10rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.title {
		font-size: 38rpx;
		font-weight: bold;
		color: #FFF;
	}

	.line {
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 0 38rpx 20rpx 38rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 30rpx;
		font-family: Source Han Sans SC;
		font-weight: 300;
		color: rgba(51, 51, 51, 1);
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
	}

	.linedetail {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}

	.linedetail view {
		/*width: 345rpx;*/
	}

	.uberstation {
		background-color: #FFF;
		border-radius: 20rpx;
		font-size: 32rpx;
		height: 100rpx;
		color: rgba(51, 51, 51, 1);
		padding: 33rpx 38rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
	}

	.bluering {
		width: 15rpx;
		height: 15rpx;
		border-width: 4rpx;
		border-color: #309FF7;
		border-style: solid;
		background-color: #fff;
		border-radius: 100px;
	}

	.redring {
		width: 15rpx;
		height: 15rpx;
		border-width: 4rpx;
		border-color: #E3424B;
		border-style: solid;
		background-color: #fff;
		border-radius: 100px;
	}

	.ticket {
		background-color: #FFF;
		border-radius: 20rpx;
		font-size: 32rpx;
		height: 106rpx;
		margin-top: 20rpx;
		color: rgba(51, 51, 51, 1);
		padding: 0 38rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
	}

	.cashbtn {
		width: 668rpx;
		height: 100rpx;
		background: linear-gradient(270deg, rgba(249, 92, 117, 1), rgba(250, 116, 101, 1));
		box-shadow: 0px 7px 38px 8px rgba(216, 48, 75, 0.15);
		border-radius: 12rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.alipaybtn {
		width: 318rpx;
		height: 100rpx;
		background: linear-gradient(270deg, rgba(6, 180, 253, 1), rgba(0, 166, 235, 1));
		box-shadow: 0px 7px 38px 8px rgba(78, 179, 57, 0.15);
		border-radius: 12rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.weixinpaybtn {
		width: 600rpx;
		height: 100rpx;
		background: linear-gradient(270deg, rgba(40, 204, 40, 1), rgba(83, 176, 59, 1));
		box-shadow: 0px 7px 38px 8px rgba(78, 179, 57, 0.15);
		border-radius: 12rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.radio{
		margin-left: 56rpx;
	}
</style>
