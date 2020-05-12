<template>
	<view>
		<form @submit="formSubmit" >
			<!-- 内容 -->
			<view class="content">
				<!-- 投诉原因 -->
				<view class="ComplaintYY">
					<text class="yyText">申诉原因</text>
					<textarea class="yyTitle" placeholder-style="#AAAAAA" placeholder="描述详尽助于提升处理速度" maxlength="500" @input="descInput"
					 v-model="detailInfo.a" style="width: 295px;height: 100px;" />
					<view class="num">{{remnant}}/500字</view>
				</view>
				<!-- 原因范本 -->
				<view class="reasonFB">
					<text class="fbText">原因范本</text>
					<text class="tiemBtn" @click="paste">复制</text>
					<view class="fbTitle" v-model="b" style="width: 295px;height: 71px;color: #AAAAAA;">{{b}}</view>
				</view>
			</view>
			
			<button class="tjButton" type="primary" :color="'#2b9df2'" form-type="submit" >提交</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				aid:'',
				b:'本人于 #填写时间  在#填写事发地详细地址# 发生 了 #描述申诉原因# ， 本人希望 #填写您的述求， 如退票#',
				remnant: 0,//字数
				detailInfo : {//详细信息
					a:'',//投诉原因
				}
			}
		},
		onLoad:function(options) {
			this.aid = JSON.parse(options.aid);
			
		},
		methods: {
			//字数
			descInput: function(e) {
				// console.log(e)
				this.remnant = e.detail.cursor;	
			},
			//复制
			paste:function(){
				this.detailInfo.a=this.b;
			},
			
			formSubmit:function(e){
				var that = this;
				uni.showLoading({
					title:'提交投诉中...'
				})
				uni.request({
					url:this.$GrzxInter.Interface.complaintText.value,
					method:this.$GrzxInter.Interface.complaintText.method,
					header: {'content-type': 'application/json'},
					data:{
						declarantContent : that.detailInfo.a,
						aid : that.aid,
					},
					success: (res) => {
							console.log(res)
							uni.hideLoading()
							uni.showToast({
								title:'申诉成功'
							})
							uni.navigateBack()
					},
					fail:function(){
						uni.hideLoading()
						uni.showToast({
							title:'申诉失败',
							icon:'none'
						})
					},
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f6f6;
	}
	// 内容
	.content {
		margin: 0 0 24upx 0;
		padding-top: 56upx;
		padding-left: 32upx;
		padding-right: 32upx;
		background-color: #FFFFFF;
	
		// 投诉内容
		.ComplaintYY {
			border-bottom: 1px #F5F5F5 dotted;
	
			.yyText {
				font-weight: bold;
				font-size: 32upx;
			}
	
			.yyTitle {
				padding-top: 40upx;
				font-size: 30upx;
			}
	
			.num {
				text-align: right;
				font-size: 30upx;
				color: #AAAAAA;
				padding-bottom: 23upx;
			}
		}
	
		// 原因范本
		.reasonFB {
			position: relative;
			padding-top: 28upx;
	
			.fbText {
				font-weight: bold;
				font-size: 32upx;
			}
			
			.fbTitle {
				padding-top: 40upx;
				font-size: 30upx;
			}
			.tiemBtn{
				position: absolute;
				right: 6upx;
				font-size: 30upx;
				text-align: right;
				color: #47A5FC;
			}
		}
	}
	
	.tjButton{
		width: 90%;
		height: 104upx;
		font-size: 40upx;
		margin-top: 55upx;
		margin-bottom: 48upx;
		border-radius:30px;
		background-color: #007AFF;
		box-shadow:0 0 5px #06c;
	}
</style>
