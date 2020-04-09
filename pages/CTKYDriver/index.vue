<template>
	<view>
		<view class="head">
			<view class="status_bar"></view>
			<view style="padding:10rpx 30rpx;text-align: center;">
				<text class="titleFont">上下车点选择</text>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
</style>
