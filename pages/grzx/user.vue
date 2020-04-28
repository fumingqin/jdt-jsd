<template>
	<view class="content">
		<view class="backImg">
			<image src="../../static/grzx/backImg.png" class="imgClass"></image>
			<!-- #ifdef MP-WEIXIN -->
			<image src="../../static/grzx/set.png" class="setClass" @click="navTo('/pages/grzx/set')"></image>
			<!-- <image src="../../static/grzx/info.png" class="infoClass" @click="navTo('/pages/grzx/myNews')"></image> -->
			<!-- #endif -->
			<view class="userInfoClass" @click="checkLogin">
				<image class="portraitClass" :src=" userInfo.userPortrait || '/static/grzx/touxiang.png'"></image>
				<text class="usernameClass">{{userInfo.userName || '请登录'}}</text>
			</view>
		</view>
		<view class="serviceBox">
			<text class="moreClass">更多服务</text>
			<view class="boxClass" @click="QQClick">
				<image src="../../static/grzx/tubiao_kefu.png" class="iconClass2"></image>
				<text class="fontStyle">QQ客服</text>
				<image src="../../static/grzx/tubiao_Right.png" class="btnClass"></image>
			</view>
			<!-- <view class="boxClass borderTop" @click="infoClick">
				<image src="../../static/grzx/tubiao_zhengzhao.png" class="iconClass3"></image>
				<text class="fontStyle">信息登记</text>
				<image src="../../static/grzx/tubiao_Right.png" class="btnClass"></image>
			</view>
			<view class="boxClass borderTop" @click="drivingClick">
				<image src="../../static/grzx/tubiao_zhengzhao.png" class="iconClass3"></image>
				<text class="fontStyle">驾照登记</text>
				<image src="../../static/grzx/tubiao_Right.png" class="btnClass"></image>
			</view> -->
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/grzx/mix-list-cell';
	import {  
	    mapState 
	} from 'vuex'; 
	export default{
		components: {
			listCell
		},
		data(){
			return{
				QQ:'2482549389',
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		onLoad(){
		},
		onShow(){
			//this.loadData();
		},
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if(index === 0){
				uni.navigateTo({
					url:'/pages/grzx/set'
				})
			}
			if(index === 1){
				// uni.navigateTo({
				// 	url:'/pages/grzx/myNews'
				// })
			}
			if(index === 2){
				uni.scanCode({
					onlyFromCamera:true,
					success:function(res){
						void plus.runtime.openWeb(res.result,function(){
							//识别失败
						});
					}
				})
			}
			
		},
		methods:{
			orderClick(){
				uni.switchTab({
					url:'/pages/order/OrderList'
				})
			},
			navTo(url){
				uni.navigateTo({
					url
				})
				console.log(url)
			},
			//信息管理
			infoClick(){
				uni.navigateTo({
					url:'/pages/grzx/infoManage'
				})
			},
			checkLogin(){
				console.log(this.hasLogin,"6666")
				if(!this.hasLogin){
					uni.showToast({
						title : '请先登录',
						icon : 'none',
					})
					setTimeout(function(){
						uni.navigateTo({	
							url  : '/pages/grzx/selectOperation'
						}) 
					},500);
				}else{
					// uni.navigateTo({
					// 	url :'/pages/grzx/personal'
					// })  
				}
			},
			scanClick(){
				uni.showToast({
					title : '扫一扫',
					icon : 'none',
				})
			},
			QQClick(){
				plus.runtime.openURL('mqq://im/chat?chat_type=wpa&uin=' + this.QQ + '&version=1&src_type=web ');
			},
			drivingClick(){
				uni.navigateTo({
					url:'/pages/grzx/licenseManage',
				})
			},
		}
		
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F9FA;
	}
	.content{
		position: relative;
	}
	.backImg{ 
		width: 100%;
		height: 490upx;
	}
	.imgClass{ //背景图片
		width: 100%;
		height: 490upx;
	}
	.setClass{ //设置按钮
		width: 47upx;
		height: 45upx;
		position: absolute;
		left: 4.67%;
		top: 74upx;
	}
	.scanClass{ //扫一扫按钮
		width: 44upx;
		height: 41upx;
		position: absolute;
		left: 14.8%;
		top: 74upx;
	}
	.infoClass{ 	//消息按钮
		width: 47upx;
		height: 42upx;
		position: absolute;
		//left: 87.73%;
		left: 20%;
		top: 74upx;
	}
	.userInfoClass{ 	//包括头像昵称
		position: absolute;
		left: 4.53%;
		top:161upx;
		height: 127upx;
		width: 80%;
		// background-color: #06B4FD;
		display: flex;
		flex-direction: row;
	}
	.portraitClass{ 	//头像
		border-radius: 50%;
		width: 127upx;
		height: 127upx;
	}
	.usernameClass{		//昵称
		// height: 44upx;
		// line-height: 44upx;
		font-size: 42upx;
		color: #FFFFFF;
		margin-top: 40upx;
		margin-left: 5%;
		width: 350upx;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		// border: 1upx solid #007AFF;
	}
	.grzyClass{  		//个人主页
		width: 20%;
		height: 34upx;
		position: absolute;
		left:75.47%;
		top: 200upx;
		color: #FFFFFF;
		font-size: 28upx;
		line-height: 27upx;
	}
	.rightClass{
		width: 10%;
		height: 29upx;
		position: absolute;
		left:82%;
		top:-1upx;
	}
	.typeBox{  //普通用户
		width: 126upx;
		height: 42upx;
		background-color: #C25E4E;
		position: absolute;
		top: 245upx;
		left: 24%;
		border-radius: 8upx;
	}
	.imgTubiao{
		width: 15%;
		height: 21upx;
		position: absolute;
		left: 9upx;
		top: 10upx;
	}
	.fontClass{
		font-size: 20upx;
		color: #FFFFFF;
		line-height: 42upx;
		height: 42upx;
		position: absolute;
		left: 34upx;
		top: 1upx;
	}
	.editClass{		//修改按钮
		width: 40upx;
		height: 40upx;
		margin-left: 17upx;
		margin-top: 25upx;
	}
	.myBox{			//包括我的收藏，我的订单，我的历史
		width: 91.47%;
		height: 170upx;
		position: absolute;
		left: 4.27%;
		top:341upx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		border-radius: 12upx;
	}
	.collection{		//我的收藏
		width: 33.33%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.imgStyle1{
		width: 61upx;
		height: 59upx;
		margin-top: 31upx;
		margin-left: 36.68%;
	}
	.order{				//我的订单
		width: 33.33%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.imgStyle2{
		width: 55upx;
		height: 56upx;
		margin-top: 32upx;
		margin-left: 36.68%;
	}
	.history{			//我的历史
		width: 33.34%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.imgStyle3{
		width: 58upx;
		height: 57upx;
		margin-top: 31upx;
		margin-left: 36.68%;
	}
	.myFont{		//文字的样式
		color: #2C2D2D;
		height: 27upx;
		line-height: 27upx;
		font-size:28upx;
		font-family: SourceHanSansSC-Regular;
		margin-top: 22upx;
		text-align: center;
	}
	.advertClass{		//广告
		width: 91.47%;
		height: 142upx;
		margin-top: 42upx;
		margin-left: 4.27%;
	}
	.serviceBox{		//更多服务
		width:91.47%;
		position: absolute;
		left: 4.27%;
		top: 390upx;
		background-color: #FFFFFF;
		border-radius: 12upx;
		display: flex;
		flex-direction: column;
	}
	.moreClass{		
		font-size:32upx ;
		font-weight: bold;
		color: #000000;
		margin-top: 34upx;
		margin-left: 3.55%;
	}
	.boxClass{
		width: 620upx;
		height: 104upx;
		margin-top: 0upx;
		margin-left: 4.27%;
		position: relative;
	}
	.marginTop{
		margin-top: 18upx;
	}
	.iconClass1{  //电子发票图标
		width: 38upx;
		height: 37upx;
		position: absolute;
		left: 11upx;
		top:34upx;
		/* margin-top: 34upx;
		margin-left: 11upx; */
	}
	.iconClass2{  //在线客服图标
		width: 40upx;
		height: 38upx;
		margin-top: 34upx;
		margin-left: 9upx;
	}
	.iconClass3{  //证照信息图标
		width: 42upx;
		height: 34upx;
		margin-top: 34upx;
		margin-left: 8upx;
	}
	.iconClass4{  //我的投诉图标
		width: 36upx;
		height: 39upx;
		margin-top: 29upx;
		margin-left: 13upx;
	}
	.btnClass{
		width: 11upx;
		height: 22upx;
		position: absolute;
		left: 610upx;
		top:43upx;
	}
	.fontStyle{
		font-size: 28upx;
		color: #2C2D2D;
		position: absolute;
		left: 80upx;
		top:33upx;
	}
	.borderTop{
		border-top: 1upx solid #EAEAEA;
	}
</style>
