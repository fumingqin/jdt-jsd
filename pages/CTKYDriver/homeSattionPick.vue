<template>
	<view>
		<!-- 顶部搜索框 -->
		<view class="topSerchView">
			<view class="SearchBar" elevation='5px' style="">
				<input class="addressInput" @input="onInput" placeholder="请输入关键字搜索" />
			</view>
		</view>
		<!-- 搜索列表 -->
		<view class="stationList" :style="{ 'height':scrollHeight }" v-if="isShowList">
			<block v-for="(item,index) in keywordList" :key="index">
				<view class="listItem" @tap="itemClick(item)">
					<rich-text :nodes="item.htmlStr"></rich-text>
				</view>
			</block>
		</view>
		
	</view>
</template>

<script>
	// import $KyInterface from "@/common/Ctky.js"
	export default {
		data() {
			return {
				scrollHeight:'500px',
				stationArray:['车牌号'],
				leftArray:[],
				mainArray:[],
				leftIndex:0,
				keywordList: [],
				isShowAllList:true,//是否显示联动列表
				isShowList:false,//是否显示站点列表
				stationType:'',//判断上个页面点击的是上车点还是下车点
				userInfo: '',
			}
		},
		onLoad(param){
			var that = this;
			// console.log(param);
			that.stationType = param.station;
			//获取站点列表
			/* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
			uni.getSystemInfo({
				success:(res)=>{
					this.scrollHeight=`${res.windowHeight}px`;
				}
			});
		},
		onShow() {
			let that = this;
			that.userInfo = uni.getStorageSync('userInfo') || '';
			// that.vehicleInfo = uni.getStorageSync("vehicleInfo") || '';
			if (that.userInfo == '') {
				that.showToast('未取得用户信息');
			} 
		},
		methods: {
			//-------------------------监听输入-------------------------
			onInput(event){
				let that = this;
				var keyword = event.detail?event.detail.value:event;
				if (!keyword) {
					this.keywordList = [];
					this.isShowList = false;
					this.isShowAllList = true;
					return;
				}
				this.isShowList = true;
				this.isShowAllList = false;
				//以下示例截取淘宝的关键字，请替换成你的接口
				uni.showLoading();
				uni.request({
					url: that.$Ky.Interface.GetCoachByNumber.value,
					method: that.$Ky.Interface.GetCoachByNumber.method,
					data:{
						coachNumber: keyword,
						Code: that.userInfo.code,
					},
					success: (res) => {
						uni.hideLoading();
						console.log(res);
						this.keywordList = [];
						this.keywordList = this.drawCorrelativeKeyword(res.data.Coachs, keyword);
					},
					fail(res) {
						uni.hideLoading();
					}
				});
			},
			//-------------------------高亮关键字-------------------------
			//keywords：模糊查询返回的数组  keyword：输入的关键字
			//注意点CoachCardNumber 需要替换接口的字段
			drawCorrelativeKeyword(keywords, keyword) {
				// console.log(keywords);
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i].CoachCardNumber;
					var coachID = keywords[i].CoachID;
					//定义高亮#9f9f9f
					var html = row.replace(keyword, "<span style='color: #9f9f9f;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row,
						htmlStr: html,
						CoachID: coachID,
					};
					keywordArr.push(tmpObj)
				}
				return keywordArr;
			},
			//-------------------------更改车牌号-------------------------
			itemClick(item){
				var that = this;
				//获取点击选项的文字
				var key = item.CoachID;
				console.log(item.CoachID);
				uni.request({
					url: that.$Ky.Interface.SetMyCoach.value,
					method: that.$Ky.Interface.SetMyCoach.method,
					data: {
						coachNumberID: key,
						Code: that.userInfo.code,
						UserAID: that.userInfo.AID,
					},
					success: function(res) {
						uni.hideLoading();
						console.log(res);
						if (res.statusCode==200) {
							that.showToast('更改车牌号成功');
								setInterval(function() {
								uni.navigateBack({});
							}, 1000);
						} else {
							that.showToast(res.data.Message);
						}
					},
					fail: function(res) {
						uni.hideLoading();
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
			//-------------------------左侧导航点击-------------------------
			leftTap(e){
				let index=e.currentTarget.dataset.index;
				this.leftIndex=Number(index);
			},
			/* 轮播图切换 */
			swiperChange(e){
				let index=e.detail.current;
				this.leftIndex=Number(index);
			}
		}
	}
</script>

<style lang="scss">
	.topSerchView {
		height: 100rpx;
		background-color: #DBDBDB;
		padding-top: 20rpx;
	}
	.SearchBar {
		background-color: #FFFFFF;
		margin-right: 20rpx;
		margin-left: 20rpx;
		box-shadow: 0px 4px 9px 1px rgba(204, 204, 204, 1);
		flex-direction: row;
		border-radius: 9px;
		padding: 20rpx;
		align-items: center;
		justify-content: space-between;
	}
	//地址搜索输入
	.addressInput {
		color: #999999;
		font-size: 30rpx;
		font-weight: 300;
	}
	//站点列表
	.stationList {
		background-color: #FFFFFF;
		line-height: 80rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		height: 100rpx;
		.listItem{
			margin-left: 20rpx;
			border-bottom: 1rpx solid #eeeeee;
		}
	}
.list_box{
	display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
	font-size: 28rpx;
	
	.left{
		width: 200rpx;
		background-color: #f6f6f6;
		line-height: 80rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		text-align: center;
		.item{
			padding-left: 20rpx;
			position: relative;
			&:not(:first-child) {
				margin-top: 1px;
			
				&::after {
					content: '';
					display: block;
					height: 0;
					border-top: #d6d6d6 solid 1px;
					width: 620upx;
					position: absolute;
					top: -1px;
					right: 0;
					transform:scaleY(0.5);	/* 1px像素 */
				}
			}
			
			&.active,&:active{
				color: #42b983;
				background-color: #fff;
			}
		}
	}
	.main{
		background-color: #fff;
		padding-left: 20rpx;
		width: 0;
		flex-grow: 1;
		box-sizing: border-box;
		
		.swiper{
			height: 500px;
		}

		
		.item{
			padding-bottom: 10rpx;
		}
	}
	.goods{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		margin-bottom: 10rpx;
		border-bottom: 1rpx solid #eeeeee;
		line-height: 80rpx;
	}
}
</style>
