<template>
	<view>
		<view>
			<view class="head">
				<view class="status_bar"></view>
				<view class="tab">
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==0?'tabactive':''" @click="tabclick(0)">全部</view>
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==1?'tabactive':''" @click="tabclick(1)">客运</view>
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==2?'tabactive':''" @click="tabclick(2)">出租车</view>
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==3?'tabactive':''" @click="tabclick(3)">包车</view>
					<view></view>
					<view></view>
				</view>
			</view>
			<view style="margin: 0 30rpx;">
				<view style="height: 110rpx;display: flex;align-items: center;justify-content: space-between;padding: 0 40rpx;font-size: 32rpx;background-color: #FFF;border-radius: 20rpx;margin-top: -55rpx;">
					<view>报表时间</view>
					<view> {{range[0]}}——{{range[1]}}</view>
					<view @click="onShowDatePicker('range')">
						<image src="../../static/index/calendar.png" style="width: 35rpx;" mode="widthFix" @click="onShowDatePicker('range')"></image>
					</view>
				</view>
				<scroll-view style="margin:20rpx 0;" :style="{height:scrollHeight}" :scroll-y="true">
					<view style="background-color: #FFF;border-radius: 20rpx;padding: 30rpx;">
						<view style="display: flex;align-items: center;">
							<view style="width: 8rpx;height: 34rpx; background-color: #E9554E;"></view>
							<view style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:#2C2D2D;line-height:42rpx;padding-left: 10rpx;">按岗位统计</view>
						</view>
						<view>
							<view>
								<histogram-chart :dataAs="histogramData" canvasId="ht0" />
							</view>
						</view>
					</view>
					<view style="background-color: #FFF;border-radius: 20rpx;margin-top: 20rpx;padding: 30rpx;">
						<view style="display: flex;align-items: center;">
							<view style="width: 8rpx;height: 34rpx; background-color: #E9554E;"></view>
							<view style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:#2C2D2D;line-height:42rpx;padding-left: 10rpx;">按日期统计</view>
						</view>
						<view>
							<!-- 折线Line纯数字-->
							<view>
								<line-chart canvasId="index_line_2" :dataAs="lineData2" />
							</view>
						</view>
					</view>
					<view style="height: 500rpx;background-color: #FFF;border-radius: 20rpx;margin-top: 20rpx;padding: 30rpx;">
						<view style="display: flex;align-items: center;">
							<view style="width: 8rpx;height: 34rpx; background-color: #E9554E;"></view>
							<view style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:#2C2D2D;line-height:42rpx;padding-left: 10rpx;">按订单统计</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :show-seconds="true" @confirm="onSelected"
		 @cancel="onSelected" />
	</view>
</template>

<script>
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import HistogramChart from '@/components/stan-ucharts/HistogramChart.vue';
	import LineChart from '@/components/stan-ucharts/LineChart.vue';
	export default {
		components: {
			HistogramChart,
			LineChart,
			MxDatePicker
		},
		data() {
			return {
				current: 0,
				scrollHeight: "",
				showPicker: false,
				date: '2019/01/01',
				time: '15:00:12',
				datetime: '2019/01/01 15:00:12',
				range: ['2020/01/01', '2020/01/02'],
				rangetime: ['2019/01/08 14:00', '2019/01/16 13:59'],
				type: 'rangetime',
				value: '',
				histogramData: {//柱状图
					categories: ['客车', '出租车', '包车'],
					series: [{
							name:'',
							data: [{
									name:"chus",
									value: 111.4,
									color: "#FE9908"
								},
								{
									value: 60,
									color: "#E9554E"
								},
								{
									value: 70,
									color: "#76BD48"
								},
							],
						},
					]
				},
				lineData2: {//数字的图--折线图数据
					categories: ['4月14号','4月15号','4月16号','4月14号','4月15号','4月16号'],
					series: [
						{ name: '客车', data: [35,50,10,35,50,10],color: '#FE9908',legendShape:'line' },
						{ name: '出租车', data: [70,90,50],color: '#E9554E',legendShape:'line' },
						{ name: '包车', data: [100,14,50],color: '#76BD48',legendShape:'line' }
					]
				},
			}
		},
		onLoad() {
			this.getnowdate();
		},
		mounted() {
			var that = this;

			uni.getSystemInfo({
				success(res) {
					that.scrollHeight = res.windowHeight - 145 - 25 + "px";
				}
			})
		},
		methods: {
			tabclick: function(e) {
				this.current = e;
			},
			getnowdate: function() { //获取当前日期
				var that = this;
				var begindate = new Date(new Date().setDate(new Date().getDate() - 1));
				var enddate = new Date(new Date());
				var endMonth = (enddate.getMonth() + 1);
				var endDate = enddate.getDate();
				var beginMonth = (begindate.getMonth() + 1);
				var beginDate = begindate.getDate();
				if (endMonth < 10) {
					endMonth = '0' + endMonth;
				}
				if (endDate < 10) {
					endDate = '0' + endDate
				}
				if (beginMonth < 10) {
					beginMonth = '0' + beginMonth;
				}
				if (beginDate < 10) {
					beginDate = '0' + beginDate
				}
				var end = enddate.getFullYear() + '/' + endMonth + '/' + endDate;
				var begin = begindate.getFullYear() + '/' + beginMonth + '/' + beginDate;
				this.range = [begin, end];
			},
			onShowDatePicker(type) { //显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					this[this.type] = e.value;
				}
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
		height: 235rpx;
		background: linear-gradient(0deg, rgba(235, 85, 111, 1) 0%, rgba(240, 152, 105, 1) 100%);
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

	.tab {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 36rpx;
		line-height: ;
		padding: 30rpx 20rpx 20rpx 40rpx;
		color: #FFFFFF;
	}

	.tabactive {
		border-bottom: solid 1px #FFFFFF;
		color: #FFFFFF;
	}
</style>
