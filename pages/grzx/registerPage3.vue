<template>
	<view class="content">
		<text class="titleClass">{{title}}</text>
		<image src="../../static/grzx/btnReturn.png" class="returnClass" @click="returnClick"></image>
		<image src="../../static/grzx/nav3.png" class="navClass"></image>
		
		<view class="boxClass">
			<text class="fontClass">驾龄</text>
			<input class="inputClass"  name="userdrivingAge"  placeholder="请输入您的驾龄" v-model="userdrivingAge" />
		</view>
		<view class="boxClass">
			<text class="fontClass">驾照证号</text>
			<input class="inputClass" maxlength="18"  name="userlicenseNum"  placeholder="请输入驾照证号(身份证号)" v-model="userlicenseNum" />
		</view>
		<view v-if="type1==0" @click="getFront" class="boxStyle1">
			<image src="../../static/grzx/licensefront.png" style="width: 100%;height: 100%;"></image>
		</view>
		<view v-if="type1==1" @click="getFront" class="boxStyle2">
			<image :src="userlicenseFront" name="userlicenseFront" style="width: 100%;height: 100%;"></image>
		</view>
		<text class="fontStyle">驾照主页</text>
		<view v-if="type2==0" @click="getBack" class="boxStyle1">
			<image src="../../static/grzx/licenseback.png" style="width: 100%;height: 100%;" mode="aspectFill"></image>
		</view>
		<view v-if="type2==1" @click="getBack" class="boxStyle2">
			<image :src="userlicenseBack" name="userlicenseBack"  mode="aspectFill" style="width: 100%;height: 100%;"></image>
		</view>
		<text class="fontStyle">驾照副页</text>
		<view @click="submitClick" class="submitClass">
			提交
		</view>
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from '@/components/grzx/js_sdk/gsq-image-tools/image-tools/index.js';
	export default{
		data(){
			return{
				type1:0,
				type2:0,
				title:'完善驾照',
				userdrivingAge:'',
				userlicenseNum:'',
				userlicenseFront:'',
				userlicenseBack:'',
				frontImg:'',//用于上传
				backImg:'',//用于上传
			}
		},
		onLoad(){
			
		},
		methods:{
			//-----------返回------------
			returnClick(){
				uni.navigateBack();
				console.log("返回");
			},
			//-----------上传驾照主页------------
			getFront(){
				var that=this;
				uni.chooseImage({
					count:1,
					success(res) {
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
						  tempFilePath: tempFilePaths[0],
							success: function (res1) {
								that.userlicenseFront=res1.savedFilePath;
								that.type1=1;
								pathToBase64(res1.savedFilePath)
									.then(base64 => {
									that.frontImg=base64;	
								})
							}
						});
					}
				})
			},
			//-----------上传驾照副页------------
			getBack(){
				var that=this;
				uni.chooseImage({
					count:1,
					success(res) {
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
						  tempFilePath: tempFilePaths[0],
							success: function (res1) {
								that.userlicenseBack=res1.savedFilePath;
								that.type2=1;
								pathToBase64(res1.savedFilePath)
									.then(base64 => {
									that.backImg=base64;	
								})
							}
						});
					}
				})
			},
			//-----------提交数据------------
			submitClick(){
				console.log(this.userdrivingAge)
				console.log(this.userlicenseNum)
				console.log(this.frontImg)
				console.log(this.backImg)
				if(this.userdrivingAge==""||this.userdrivingAge==null){
					uni.showToast({
						title:'请输入您的驾龄',
						icon:'none',
					})
				}else if(this.userlicenseNum==""||this.userlicenseNum==null){
					uni.showToast({
						title:'请输入您的驾照证号',
						icon:'none',
					})
				}else if(this.userlicenseNum.length!=18){
					uni.showToast({
						title:'请输入正确的驾照证号',
						icon:'none',
					})
				}else if(this.frontImg==""||this.frontImg==null){
					uni.showToast({
						title:'请输入上传驾照的首页',
						icon:'none',
					})
				}else if(this.backImg==""||this.backImg==null){
					uni.showToast({
						title:'请输入上传驾照的副页',
						icon:'none',
					})
				}else{
					
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F9FC;
	}
	.content {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.returnClass{  //返回按钮
		width: 2.53%;
		height: 35upx;
		top: 84upx;
		left: 4.13%;
		position: fixed;
	}
	.titleClass{	//标题
		color: #333333;
		font-size: 40upx;
		width: 100%;
		text-align: center;
		top: 70upx;
		position: fixed;
		font-weight: bold;
	}
	.navClass{	//导航
		width: 90%;
		height: 75upx;
		margin-left: 5%;
		margin-top: 170upx;
		//position: absolute;
	}
	.boxClass{
		background-color: #FFFFFF;
		line-height:109upx;
		width: 90%;
		height: 109upx;
		margin-left: 5%;
		display: flex;
		flex-direction: row;
		margin-top: 24upx;
		border-radius: 26upx;
	}
	.fontClass{	//姓名，性别，公司，驾照等级
		font-size: 30upx;
		color: #2C2D2D;
		margin-left: 6%;
	}
	.inputClass{
		color: #2C2D2D;
		width: 66%;
		// border: 1upx solid #000000;
		margin-left: 7%;
		margin-top: 33upx;
		font-size: 30upx;
	}
	.boxStyle1{
		width: 98%;
		height: 400upx;
		margin-top: 20upx;
		margin-left: 1%;
	}
	.boxStyle2{
		width: 90%;
		height: 400upx;
		margin-top: 20upx;
		margin-left: 5%;
		border-radius: 26upx;
	}
	.fontStyle{
		width: 100%;
		text-align: center;
		font-size: 34upx;
		color: #333333;
		margin-top: 20upx;
	}
	.submitClass{
		width: 90%;
		height: 90upx;
		line-height: 90upx;
		margin-top: 40upx;
		margin-bottom: 20upx;
		margin-left: 5%;
		text-align: center;
		color:#FFFFFF;
		border-radius: 8upx;
		background-color: #FC4646;
		font-size: 34upx;
	}
</style>
