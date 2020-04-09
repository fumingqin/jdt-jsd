<template>
	<view>
		<view>
			<view class="head">
				<view class="status_bar"></view>
				<view class="headbar">
					<uni-icons type="scan" size="24" color="#FFF"></uni-icons>
					<view class="title">检票</view>
					<view></view>
				</view>
			</view>
			<view style="padding: 0 30rpx;margin-top: -60rpx;">
				<view class="btnarea">
					<view style="width: 349rpx;"><button :class="IsCheck?'':'btnclick'" @click="change(false)">未检票数</button></view>
					<view style="width: 349rpx;"><button :class="!IsCheck?'':'btnclick'" @click="change(true)">已检票数</button></view>
				</view>
				<scroll-view>
					<view style="background-color: #FFFFFF;margin-top: 20rpx;border-radius: 20rpx;" v-for="(item,index) in ticketArr" :key="index">
						<view style="padding: 35rpx 35rpx 0 35rpx;">
							<view style="display: flex;justify-content: space-between;font-size: 32rpx;padding-bottom: 30rpx;border-bottom: solid 1px #EAEAEA;">
								<view>
									上车点：{{item.startPoint}}
								</view>
								<view>
									下车点：{{item.endPoint}}
								</view>
							</view>
							<view style="padding: 20rpx 0;font-size: 32rpx;font-weight: 200;display: flex;flex-direction: column;justify-content: space-between;height: 290rpx;">
								<view style="display: flex;justify-content: space-between;">
									<view style="display: flex;flex-direction: column;justify-content: space-between;height: 110rpx;">
										<view>
											车次信息：{{item.trains}}
										</view>
										<view>
											车票号：{{item.ticketNo}}
										</view>
									</view>
									<view>
										<image src="../../static/CTKYDriver/Nocheck.png" style="width: 104rpx;height: 104rpx;"></image>
									</view>
								</view>
								<view>
									旅客姓名：{{item.Name}}
								</view>
								<view>
									旅客身份证：{{item.idCardNo}}
								</view>
								<view>
									座位号：{{item.seatNo}}
								</view>
							</view>
						</view>
						<view style="display: flex;font-size: 30rpx;color: #666666;justify-content:flex-end;padding: 10rpx 35rpx 35rpx 0;">
							<view style="padding-right: 30rpx;"><button style="width: 200rpx;background-color: #FFF;" >过站未检</button></view>
							<view><button style="width: 200rpx;background-color: #FFF;">联系电话</button></view>
						</view>
					</view>
				</scroll-view>
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
				IsCheck: false,
				ticketArr:[{
					startPoint:"茶叶大厦",
					endPoint:"晋江机场",
					trains:"泉州 - 石狮",
					 ticketNo:"425111144482716",
					 Name:"罗苗东",
					 seatNo:'5',
					 idCardNo:'3505**********8571'
				},
				{
					startPoint:" 丰泽广场",
					endPoint:"动车站",
					trains:"泉州 - 石狮",
					 ticketNo:"425111144482716",
					 Name:"罗苗",
					 seatNo:'6',
					 idCardNo:'3505**********8571'
				}]
			}
		},
		methods: {
			change: function(type) {
				this.IsCheck = type;
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

	.btnarea {
		display: flex;
		height: 118rpx;
		background: #FFF;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		border-radius: 20rpx;
	}

	.btnarea button {
		margin-top: 10rpx;
		background-color: #FFF;
		border-radius: 0px;
		font-size: 34rpx;
		width: 200rpx;
	}

	.btnarea uni-button:after {
		border: none;

	}

	.btnclick {
		color: #FC4646;
		border-bottom: solid 1px #FC4646;
	}
</style>
