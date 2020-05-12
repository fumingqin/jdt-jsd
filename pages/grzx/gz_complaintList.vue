<template>
	<view>
		<view class="cl_outermostLayer" v-for="(item,index) in complaintList" :key="index">
			<!-- <text class="ol_text">投诉人:{{item.beComplainant}}</text> -->
			<view>
				<text class="ol_title">{{item.complaintContent}}</text>
			</view>
			<view class="ol_button" v-if="item.declarantContent==' '"  @click="event(index)">
				<text class="bt_text">申诉</text>
			</view>
			<view class="ol_button2" v-if="item.declarantContent!==' '">
				<text class="bt_text2">已申诉</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				complaintList:[{
					beComplainant:'',
					complaintContent:'',
					declarantContent:'',
					model:'',
					aid:'',
				}]
			}
		},
		onShow() {
			var userInfo = uni.getStorageSync('userInfo') || '';
			this.grzxData(userInfo.userName);
		},
		methods: {
			//---------------------------------接口数据--------------------------------------
			grzxData:function(e){
				uni.request({
					url:this.$GrzxInter.Interface.complaintList.value,
					method:this.$GrzxInter.Interface.complaintList.method,
					header: {'content-type': 'application/json'},
					data:{
						becomplainant:e,
					},
					success: (res) => {
						this.complaintList=res.data.data;
						// console.log(this.vehicleSelection)
					}
				})
			},
			
			event:function(e){
				uni.navigateTo({
					url: './gz_complaintText?aid=' +JSON.stringify(this.complaintList[e].aid),
				})
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f6f6;
	}
	
	.cl_outermostLayer{
		margin: 32upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		padding-bottom: 108upx;
		.ol_text{
			display: flex;
			padding-top: 20upx;
			padding-left: 30upx;
			font-size: 32upx;
			font-weight: bold;
			text-align: left;
		}
		.ol_title{
			display: flex;
			padding-top: 20upx;
			padding-left: 30upx;
			font-size: 30upx;
			text-align: left;
		}
		.ol_button{
			float: right;
			padding: 20upx 30upx;
			.bt_text{
				padding: 10upx 20upx;
				color: #ff0000;
				font-size: 20upx;
				border-radius: 30upx;
				border: 1px solid #ff0000;
			}
		}
		.ol_button2{
			float: right;
			padding: 20upx 30upx;
			.bt_text2{
				padding: 10upx 20upx;
				color: #aaa;
				font-size: 20upx;
				border-radius: 30upx;
				border: 1px solid #aaa;
			}
		}
	}
</style>
