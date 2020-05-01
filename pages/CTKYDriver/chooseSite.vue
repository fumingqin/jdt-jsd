<template>
	<view>
		<view class="head">
			<view class="status_bar"></view>
			<view style="padding:10rpx 30rpx;text-align: center;">
				<text class="titleFont">上下车点选择</text>
			</view>
		</view>
		<view style="margin-left: 30rpx;margin-right: 30rpx;">
			<view class="startSiteBlock">
				<view style="margin-bottom: 30rpx;">
					<text class="SiteTitleFont">选择上车点</text>
				</view>
				<scroll-view style="height: 300rpx;" :style="{height:siteHeight}"  :scroll-y='true'>
					<view class="siteBlock">
						<view v-for="(item,index) in startSite" :key='index' @click="startSiteClick(item)" :class="item.isActive?'activated':'unActivated'"
						 style="margin-right: 20rpx;margin-bottom: 20rpx;background-color: #E3E3E3;">
							<text class="siteFont">{{item.name}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="endSiteBlock">
				<view style="margin-bottom: 30rpx;">
					<text class="SiteTitleFont">选择下车点</text>
				</view>
				<scroll-view style="height: 300rpx;" :style="{height:siteHeight}" :scroll-y='true'>
					<view class="siteBlock">
						<view v-for="(item,index) in endSite" :key='index' @click="endSiteClick(item)" :class="item.isActive?'activated':'unActivated'"
						 style="margin-right: 20rpx;margin-bottom: 20rpx;">
							<text class="siteFont">{{item.name}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view>
				<button :disabled="Disabled" @click="finished" :class="[Disabled?'unfinishedButtom':'finishedButtom']" style="width: 100%;">
					<text>完成</text>
				</button>
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
						color: 'color: #2C2D2D',
						imageSrc: '../../static/tabbar/index-black.png',
						imageStyle: 'width: 51rpx;height: 45rpx;',
						canClick: true
					},
					{
						title: '购票',
						color: 'color: #FC4646',
						imageSrc: '../../static/tabbar/buy-red.png',
						imageStyle: 'width: 49rpx;height: 36rpx;',
						canClick: false
					},
					{
						title: '检票',
						color: 'color: #2C2D2D',
						imageSrc: '../../static/tabbar/check-black.png',
						imageStyle: 'width: 47rpx;height: 38rpx;',
						canClick: true
					}
				],
				startSite: [{
						id:'0',
						name: '茶叶大厦',
						isActive: false
					},
					{
						id:'0',
						name: '信和路口',
						isActive: false
					},
					{
						id:'0',
						name: '浦西路口',
						isActive: false
					},
					{
						id:'0',
						name: '清源山',
						isActive: false
					},
					{
						id:'0',
						name: '华侨大学',
						isActive: false
					},
					{
						id:'0',
						name: '客运中心站',
						isActive: false
					},
					{
						id:'0',
						name: '幸福路口',
						isActive: false
					},
					{
						id:'0',
						name: '中骏世界城',
						isActive: false
					},
					{
						id:'0',
						name: '海关大楼',
						isActive: false 
					},
					{
						id:'0',
						name: '汽车站',
						isActive: false
					},
					{
						id:'0',
						name: '万达广场',
						isActive: false
					},
					{
						id:'0',
						name: '第一医院',
						isActive: false
					}
				],
				endSite: [{
						id:'0',
						name: '茶叶大厦',
						isActive: false
					},
					{
						id:'0',
						name: '信和路口',
						isActive: false
					},
					{
						id:'0',
						name: '浦西路口',
						isActive: false
					},
					{
						id:'0',
						name: '清源山',
						isActive: false
					},
					{
						id:'0',
						name: '华侨大学',
						isActive: false
					},
					{
						id:'0',
						name: '客运中心站',
						isActive: false
					},
					{
						id:'0',
						name: '幸福路口',
						isActive: false
					},
					{
						id:'0',
						name: '中骏世界城',
						isActive: false
					},
					{
						id:'0',
						name: '海关大楼',
						isActive: false
					},
					{
						id:'0',
						name: '汽车站',
						isActive: false
					},
					{
						id:'0',
						name: '万达广场',
						isActive: false
					},
					{
						id:'0',
						name: '第一医院',
						isActive: false
					}
				],
				chooseStartSite:'',
				chooseEndSite:'',
				Disabled:true,
				siteHeight:''
			}
		},
		onShow() {
			var that=this;
			uni.getSystemInfo({
				success(res) {
					that.siteHeight=res.windowHeight*0.23+'px';
				}
			})
		},
		methods: {
			startSiteClick: function(el) {
				//上车点点击事件
				let that = this;
				that.startSite = that.startSite.filter(x => {
					x.isActive = false;
					return true
				});
				el.isActive = !el.isActive;
				that.chooseStartSite = el.id;
				
				//取消按钮禁用
				if(that.chooseStartSite != '' && that.chooseEndSite){
					that.Disabled = false;
				}
			},
			endSiteClick: function(el) {
				//上车点点击事件
				let that = this;
				that.endSite = that.endSite.filter(x => {
					x.isActive = false;
					return true
				});
				el.isActive = !el.isActive;
				that.chooseEndSite = el.id;
				
				//取消按钮禁用
				if(that.chooseStartSite != '' && that.chooseEndSite){
					that.Disabled = false;
				}
			},
			
			finished:function(){
				uni.navigateTo({
					url:'./buyTicket'
				})
			},
			
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
							url = './checkTicket';
							break;
						default:
							break;
					};
					uni.redirectTo({
						url:url
					})
				}
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

	.titleFont {
		font-size: 38rpx;
		font-family: Source Han Sans SC;
		font-weight: bold;
		color: #FFFFFF;
	}

	.siteBlock {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.startSiteBlock {
		margin-top: -90rpx;
		padding: 30rpx 40rpx;
		background-color: #FFFFFF;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		border-radius: 20rpx;
	}

	.endSiteBlock {
		margin-top: 30rpx;
		padding: 30rpx 40rpx;
		background-color: #FFFFFF;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		border-radius: 20rpx;
	}

	.SiteTitleFont {
		font-size: 32rpx;
		font-family: Source Han Sans SC;
		font-weight: 500;
		color: #333333;
	}

	.unActivated {
		display: flex;
		border: 1px solid #666666;
		padding: 20rpx 30rpx;
		border-radius: 12rpx;
	}

	.unActivated .siteFont {
		font-size: 30rpx;
		font-family: Source Han Sans SC;
		font-weight: 300;
		color: #333333;
	}

	.activated {
		display: flex;
		border: 1px solid #FC4646;
		padding: 20rpx 30rpx;
		border-radius: 12rpx;
	}

	.activated .siteFont {
		font-size: 30rpx;
		font-family: Source Han Sans SC;
		font-weight: 300;
		color: #FC4646;
	}

	.finishedButtom {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		background: linear-gradient(270deg, rgba(249, 92, 117, 1), rgba(250, 116, 101, 1));
		box-shadow: 0px 7px 38px 8px rgba(216, 48, 75, 0.15);
		border-radius: 12rpx;
	}
	
	.unfinishedButtom {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		background: #CBCBCB;
		border-radius: 12rpx;
	}

	.finishedButtom text {
		font-size: 36rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
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
	
	.tabbarItem view {
		height: 50rpx;
		text-align: center;
	}
	
	 .tabbarItem text {
		font-size: 25rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
	}
</style>
