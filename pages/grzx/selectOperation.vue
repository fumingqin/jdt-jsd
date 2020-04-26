<template>
	<view class="content" v-bind:style="{height:imgHeight+'px'}">
		<!-- 背景图 -->
		<!-- <image src="../../static/login/backgroudimg.png" style="width: 100%; position: absolute; bottom: 0; height: 100%;"></image>
		<image src="../../static/login/back.png" class="returnClass" @click="returnClick"></image> -->
		<view class="loginClass" @click="loginClick">
			<text class="fontClass">登录</text>
		</view>
		<view class="registerClass" @click="registerClick">
			<text class="fontClass">注册</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgHeight:'',
			}
		},
		onLoad() {
			this.load();
		},
		methods: {
			//--------加载数据---------
			async load(){
				var that=this;
				uni.getSystemInfo({
				　　success: function(res) { // res - 各种参数
						that.imgHeight=res.windowHeight;
				       }
				});
			},
			//--------返回个人中心---------
			returnClick(){		
				uni.navigateBack();
			},
			//--------登录---------
			loginClick(){
				uni.navigateTo({
					url:'/pages/grzx/userLogin',
				})
			},
			//--------注册---------
			registerClick(){
				uni.navigateTo({
					url:'/pages/grzx/registerPage1',
				})
			},
		}
	}
</script>

<style lang="scss">
	//该界面的全局样式
	.content {
		width: 100%;
		height: 1000upx;
		position: relative;
	}
	.returnClass{  //返回按钮
		width: 2.53%;
		height: 35upx;
		top: 110upx;
		left: 4.13%;
		position: absolute;
	}
	.loginClass{ //登录
		width: 90%;
		height: 100upx;
		top: 450upx;
		left: 5%;
		position: absolute;
		text-align: center;
		border-radius: 55upx;
		background-color: #08AF2C;
	}
	.registerClass{ //注册
		width: 90%;
		height: 100upx;
		top: 600upx;
		left: 5%;
		position: absolute;
		text-align: center;
		border-radius: 55upx;
		background-color: #13A0DE;
	}
	.fontClass{
		color: #FFFFFF;
		font-size: 40upx;
		line-height: 100upx;
		width: 100%;
	}
</style>
