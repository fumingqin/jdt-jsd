<template>
	<view class="myView" v-bind:style="{height:imgHeight+'px'}">
		<image src="../../static/driver/background.png" style="width: 100%;height: 100%;bottom: 0;position: absolute;"></image>
		<view style="position: absolute;top:0;width: 100%;">
			<image src="../../static/driver/return.png" style="width:18upx ;height: 34upx;margin-left: 46upx;margin-top: 79upx;z-index: 650;"
			 @click="goBack"></image>
			<view style="width: 100%;text-align: center;margin-top: 48upx;font-size:44upx ;font-family:SourceHanSansSC-Medium ;color: #FFFFFF;font-weight: 450;">请绑定车牌号</view>
			<view style="margin-left: 53upx;margin-right: 53upx;margin-top:76upx ;">
				<uniSegmentedControl :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#FFFFFF"></uniSegmentedControl>
			</view>
			<view v-if="current === 0" style="margin-top: 43rpx;margin-left: 53upx;margin-right: 53upx;">
				<validCode ref="code" :maxlength="7" :isPwd="false" @finish="getCode"></validCode>
			</view>
			<view v-if="current === 1" style="margin-top: 43rpx;margin-left: 53upx;margin-right: 53upx;">
				<validCode ref="code" :maxlength="8" :isPwd="false" @finish="getCode"></validCode>
			</view>
			<view style="margin-top: 37upx;margin-left: 53upx;margin-right: 53upx; color: #FFFFFF;font-size: 36upx;font-family: SourceHanSansSC-Regular;text-align: left;">
				所选工作：{{carType}}
			</view>
			<view style="margin-top: 100upx;margin-left: 53upx;margin-right: 53upx; color: #FFFFFF;font-size: 30upx;font-family: SourceHanSansSC-Normal;text-align: left;">
				提示：请确保您填写的车牌号的正确性，以免后续造成不必要麻烦。
			</view>
			<!-- <button @tap="key3">汽车键盘</button> -->
			<button class="btn" @click="Confirm">确定</button>
		</view>

	</view>
</template>

<script>
	import uniSegmentedControl from "../../components/uni-segmented-control/uni-segmented-control.vue";
	import validCode from "../../components/p-validCode/validCode.vue";
	export default {
		components: {
			uniSegmentedControl,
			validCode
		},
		data() {
			return {
				imgHeight: "",
				current: 0,
				items: ['燃油汽车', '新能源汽车'],
				carType: "",
				vals: "",
				keyMode: 'car',
				keyType: 0,
				plateNumber: "",
				keyTitle: '汽车键盘',
			}
		},
		onReady() {},
		onLoad(option) {
			this.carType = option.cartype;
			/* if(uni.getStorageSync('CarType') == this.carType){
				uni.navigateTo({
					url:'./taxiDriver',
				});
			} */
		},
		methods: {
			async load() {
				var that = this;
				uni.getSystemInfo({
					success: function(res) { // res - 各种参数
						that.imgHeight = res.windowHeight;
					}
				});
			},
			isLicensePlate: function(str) { //验证是不车牌
				return /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
					.test(str);
			},
			goBack: function() {
				uni.clearStorageSync('CarType');
				uni.navigateBack();
			},
			onClickItem(e) { //tab点击事件
				var that = this;
				if (that.current !== e.currentIndex) {
					that.current = e.currentIndex;
				}
				that.$refs.code.clear();
			},
			getCode(val) {
				this.plateNumber = val;
				console.log(val + '车牌');
			},
			Confirm(e) {
				var that = this;
				const {
					plateNumber
				} = this;
				var plate = this.plateNumber;
				if (that.isLicensePlate(plate)) {
					if (this.current == 0) {
						if (plate.length == 7) {
							uni.setStorage({
								key: 'CarType',
								data: that.carType,
								success() {
									if(that.carType=="出租车"){
										uni.redirectTo({
										url: '/pages/driver/taxiDriver',
									})
									}
									if(that.carType=="包车"){
										uni.redirectTo({
										url: '/pages/BCDriver/bcDriver',
									})
									}
									if(that.carType=="客车"){
										uni.redirectTo({
										url: '/pages/CTKYDriver/index',
									})
									}
									
								}
							});
						} else {
							uni.showToast({
								title: '请输入车牌号',
								icon: "none"
							})
						}
					}
					if (this.current == 1) {
						if (plate.length == 8) {
							uni.setStorage({
								key: 'CarType',
								data: that.carType,
								success() {
									if(that.carType=="出租车"){
										uni.redirectTo({
										url: '/pages/driver/taxiDriver',
									})
									}
									if(that.carType=="包车"){
										uni.redirectTo({
										url: '/pages/BCDriver/bcDriver',
									})
									}
									if(that.carType=="客车"){
										uni.redirectTo({
										url: '/pages/CTKYDriver/index',
									})
									}
								}
							})
						} else {
							uni.showToast({
								title: '请输入车牌号',
								icon: "none"
							})

						}
					}
				} else {
					uni.showToast({
						title: "请输入正确车牌号",
						icon: "none"
					})
				}
			},
		}
	}
</script>

<style>
	.myView {
		width: 100%;
		height: 100%;
	}

	.btn {
		border-radius: 10upx;
		margin-top: 119upx;
		margin-left: 53upx;
		margin-right: 53upx;
		color: #E9554E;
		font-size: 40upx;
		font-family: SourceHanSansSC-Regular;
		text-align: center;
		align-items: center;
		height: 104upx;
		background: #FFFFFF;
	}
</style>
