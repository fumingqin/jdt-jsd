<template>
	<view>
		<view class="head">
			<view class="status_bar"></view>
			<view class="headbar">
				<uni-icons type="arrowleft" size="24" color="#FFF"></uni-icons>
				<view class="title">客车</view>
				<view></view>
			</view>
		</view>

		<view style="margin-left: 30rpx;margin-right: 30rpx;margin-top: -90rpx;">
			
			<view style="padding: 30rpx 40rpx;background:#FFFFFF;box-shadow:0px 6px 20px 0px rgba(231,231,231,0.53);border-radius:20rpx;">
				<view style="display: flex;flex-direction: column;">
					<view style="display: flex;flex-direction: row;">
						<view style="width: 305rpx;">
							<text class="informationFont">线路：泉州-石狮</text>
						</view> 
						<view style="width: 305rpx;">
							<text class="informationFont">类型：定制快车</text> 
						</view>
					</view>
				</view>
				
				<view style="display: flex;flex-direction: column;">
					<view style="display: flex;flex-direction: row;">
						<view style="width: 305rpx;">
							<text class="informationFont">车牌号：闽CK1678</text>
						</view> 
						<view style="width: 305rpx;">
							<text class="informationFont">发车时间：07-21 13:00</text> 
						</view>
					</view>
				</view>
				
				<view style="display: flex;flex-direction: column;">
					<view style="display: flex;flex-direction: row;">
						<view style="width: 305rpx;">
							<text class="informationFont">全票人数：5人</text>
						</view> 
						<view style="width: 305rpx;">
							<text class="informationFont">携童人数：0人</text> 
						</view>
					</view>
				</view>
				
			</view>
			
			
			<view style="padding: 30rpx 40rpx;margin-top: 30rpx;background:#FFFFFF;box-shadow:0px 6px 20px 0px rgba(231,231,231,0.53);border-radius:20rpx;">
				<scroll-view style="height: 550rpx;" :scroll-x="true" :scroll-into-view='scrollStationIndex'> 
					<view style="display: flex;flex-direction: row;">
						
						<view style="display: flex;flex-direction: column;width: 100rpx;" id="id_0">
							<view style="text-align: center;height: 35rpx;">
							</view>
							<view style="display: flex;margin-top: 10rpx;margin-bottom: 10rpx;">
								<image src="../../static/CTKYDriver/startSite.png" style="width: 40rpx;height: 50rpx;"></image>
							</view>
						</view>
						
						<view v-for='(item ,index) in stationArr' :key='index' :id="'id_' + (index + 1)"  style="display: flex;flex-direction: column;width: 100rpx;">
							<view style="text-align: center;height: 50rpx;">
								<image v-if="item.isArrive"  src="../../static/CTKYDriver/bus.png" style="width: 50rpx;height: 25rpx;"></image>
							</view>
							<view style="display: flex;margin-top: 10rpx;margin-bottom: 10rpx;">
								<image src="../../static/CTKYDriver/line2.png" style="width: 100rpx;height: 10rpx;"></image>
							</view>
							<view style="text-align: center;">
								<text style="font-size:30rpx;font-family:Source Han Sans SC;font-weight:300;color:#333333">{{index+1}}</text>
							</view>
							<view>
								<view style="width: 20px;margin: 0 auto;text-align: center;line-height: 35rpx;">
									<text style="font-size:30rpx;font-family:Source Han Sans SC;font-weight:300;color:#333333;">{{item.stationName}}</text>
								</view>
							</view>
							<view v-if="item.onNumber > 0">
								<view  style="width: 30px;margin: 0 auto;text-align: center;margin-top: 30rpx;line-height: 35rpx;">
									<text style="font-size:30rpx;font-family:Source Han Sans SC;font-weight:300;color:#5BC12D;">{{item.onNumber}}人</text>
								</view>
							</view>
							<view v-if="item.offNumber > 0">
								<view  style="width: 30px;margin: 0 auto;text-align: center;margin-top: 30rpx;line-height: 35rpx;">
									<text style="font-size:30rpx;font-family:Source Han Sans SC;font-weight:300;color:#fc4646;">{{item.offNumber}}人</text>
								</view>
							</view>
						</view>
						
						<view style="display: flex;flex-direction: column;width: 100rpx;">
							<view style="text-align: center;height: 35rpx;">
							</view>
							<view style="display: flex;margin-top: 10rpx;margin-bottom: 10rpx;">
								<image src="../../static/CTKYDriver/endSite.png" style="width: 40rpx;height: 50rpx;"></image>
							</view>
						</view>
					</view>
				</scroll-view>
				
				<scroll-view :scroll-y="true" style="height: 250rpx;" :scroll-into-view="scrollOnOffIndex">
					<view style="display: flex;flex-direction: column;">
						<view v-for="(item , index) in stationArr" :key='index' :id="'id_' + (index+1)">
							<view v-if="item.onNumber > 0" style="display: flex;flex-direction: row;align-items: center;margin-bottom: 10rpx;">
								<image src="../../static/CTKYDriver/msg-green.png" style="width: 28rpx;height: 28rpx;margin-right: 10rpx;"></image>
								<view style="display: flex;">
									<text class="noticeFont">请注意，</text>
									<text class="noticeOnFont">{{item.stationName}}</text>
									<text class="noticeFont">有</text>
									<text class="noticeOnFont">{{item.onNumber}}个</text>
									<text class="noticeFont">乘客等待上车</text>
								</view>
							</view>
							<view v-if="item.offNumber > 0" style="display: flex;flex-direction: row;align-items: center;margin-bottom: 10rpx;">
								<image src="../../static/CTKYDriver/msg-red.png" style="width: 28rpx;height: 28rpx;margin-right: 10rpx;"></image>
								<view style="display: flex;">
									<text class="noticeFont">请注意，</text>
									<text class="noticeOffFont">{{item.stationName}}</text>
									<text class="noticeFont">有</text>
									<text class="noticeOffFont">{{item.offNumber}}个</text>
									<text class="noticeFont">乘客等待下车</text>
								</view>
							</view>
						</view>
				
					</view>
				</scroll-view>
			</view>		
			
		</view>
		
		<view class="tabbarBlock">
			<view style="display: flex;flex-direction: row;">
				<view class="tabbarItem" v-for="(item,index) in tabbarArr" :key='index' @click="tabbarClick(item)">
					<view style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
						<image :src="item.imageSrc" :style="item.imageStyle"></image>
					</view>
					<text :style="item.color">{{item.title}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabbarArr: [{
						title: '首页',
						color: 'color: #FC4646',
						imageSrc: '../../static/tabbar/index-red.png',
						imageStyle: 'width: 51rpx;height: 45rpx;',
						canClick: false
					},
					{
						title: '购票',
						color: 'color: #2C2D2D',
						imageSrc: '../../static/tabbar/buy-black.png',
						imageStyle: 'width: 49rpx;height: 36rpx;',
						canClick: true
					},
					{
						title: '检票',
						color: 'color: #2C2D2D',
						imageSrc: '../../static/tabbar/check-black.png',
						imageStyle: 'width: 47rpx;height: 38rpx;',
						canClick: true
					}
				],
				stationArr:[
					{
						stationName:'客运中心站',
						isArrive:true,
						onNumber:3,//上车人数
						offNumber:0,//下车人数
					},
					{
						stationName:'丰泽行政服务中心',
						isArrive:false,
						onNumber:3,//上车人数
						offNumber:0,//下车人数
					},
					{
						stationName:'市皮肤医院',
						isArrive:false,
						onNumber:3,//上车人数
						offNumber:0,//下车人数
					},
					{
						stationName:'瑞士花园',
						isArrive:false,
						onNumber:0,//上车人数
						offNumber:4,//下车人数
					},
					{
						stationName:'云鹿路口',
						isArrive:false,
						onNumber:0,//上车人数
						offNumber:4,//下车人数
					},
					{
						stationName:'现在广场',
						isArrive:false,
						onNumber:0,//上车人数
						offNumber:4,//下车人数
					},
					{
						stationName:'东海街道办事处',
						isArrive:false,
						onNumber:0,//上车人数
						offNumber:4,//下车人数
					},
					{
						stationName:'黎明大学',
						isArrive:false,
						onNumber:0,//上车人数 
						offNumber:4,//下车人数
					},
				],
				scrollStationIndex:'id_0',
				scrollOnOffIndex:'id_0',
			}
		},
		onLoad() {
			let that = this;
			setTimeout(function(){
				that.scrollStationIndex = "id_5";
				that.scrollOnOffIndex = "id_5";
			},10000);
		},
		methods: {
			tabbarClick: function(el) {
				let url = '';
				if (el.canClick) {
					switch (el.title) {
						case '首页':
							url = './index';
							break;
						case '购票':
							url = './chooseSite';
							break;
						case '检票':
							url = './buyTicket';
							break;
						default:
							break;
					};
					uni.redirectTo({
						url:url
					})
				}
			},
			
			//调用语音合成接口
			baiduPlayer:function(){
				var main = plus.android.runtimeMainActivity();  
				var SpeechUtility = plus.android.importClass('com.iflytek.cloud.SpeechUtility');  
				var SpeechConstant = plus.android.importClass('com.iflytek.cloud.SpeechConstant');  
				SpeechUtility.createUtility(main,"appid=5e902d4d");  
				var SynthesizerPlayer = plus.android.importClass('com.iflytek.cloud.SpeechSynthesizer');  
				var mTts = SynthesizerPlayer.createSynthesizer(main, null);   
				mTts.setParameter(SpeechConstant.VOICE_NAME, "catherine");//设置发音人  
				mTts.setParameter(SpeechConstant.SPEED, "50");//设置语速    
				mTts.setParameter(SpeechConstant.VOLUME, "80");//设置音量，范围0~100    
				mTts.setParameter(SpeechConstant.ENGINE_TYPE, SpeechConstant.TYPE_CLOUD); //设置云端   
				mTts.startSpeaking('语音播报',null);   
				console.log(1);
			},
		}
	}
</script>

<style>
	page {
		background-color: #F5F9FA;
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
		color: #FFFFFF;
	}
	
	.informationFont{
		font-size:30rpx;
		font-family:Source Han Sans SC;
		font-weight:300;
		color:#333333;
	}
	
	.noticeFont{
		font-size:28rpx;
		font-family:Source Han Sans SC;
		font-weight:300;
		color:#262626;
	}
	.noticeOnFont{
		font-size:28rpx;
		font-family:Source Han Sans SC;
		font-weight:300;
		color:#5BC12D;
	}
	.noticeOffFont{
		font-size:28rpx;
		font-family:Source Han Sans SC;
		font-weight:300;
		color:#FC4646;
	}
	
/* 页面底部工具栏样式 */
	.tabbarBlock {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx 0;
		background-color: #FFF;
		box-shadow: 0px 8px 20px 0px rgba(172, 172, 172, 0.55);
		z-index: 99999;
		height: 40px;
	}
	
	.tabbarItem {
		width: 250rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	 .tabbarItem uni-view { 
		height: 50rpx;
		text-align: center;
	}
	
	 .tabbarItem uni-text {
		font-size: 25rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
	}
</style>
