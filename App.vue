<script>
	import homeJS from 'common/Home.js';
	import utils from '@/components/shoyu-date/utils.filter.js';

	export default {
		data: {},
		globalData: {
			globalInterval: 0,
			orderNumber:'0',
			vehicleNumber:'',
			driverID:0,
			uploadMyLocation: function() {
				let that = this;
				uni.getLocation({
					type: 'gcj02 ',
					success: function(res) {
					
						uni.request({
							url: homeJS.Interface.addVehiclePosition.value, 
							method:homeJS.Interface.addVehiclePosition.method,
							data: {
								orderNumber:that.orderNumber,
								driverID:that.driverID,
								vehicleNumber:that.vehicleNumber,//车牌号
								lon: res.longitude,
								lat: res.latitude,
								speed:res.speed,
								reportTime: utils.timeTodate(homeJS.dateFormat.dateformat, new Date().getTime())
							},
							success:function(res){
								//console.log(res);
							},
							fail:function(res){
								// console.log(res);
							}
						});
					}
				});
			},
			constantly: function() {
				let that = this;
				if (that.globalInterval == 0) {
					that.globalInterval = setInterval(function() {
					    that.uploadMyLocation();
					}, 10000);
				}
			},
			closeUpload:function(){
				let that = this;
				clearInterval(that.globalInterval);
				that.globalInterval = 0; 
			}

		},

		methods: {

		},
		onLaunch: function() {
			// let that = this;
			// let userInfo = uni.getStorageSync('userInfo') || '';
			// if (userInfo.driverId) {
			// 	//如果有登录缓存则开启定时器。
			// 	/* that.constantly(); */
			// }

			// if (userInfo.driverId) {
			// 	//更新登陆状态
			// 	uni.getStorage({
			// 		key: 'userInfo',
			// 		success: (res) => {
			// 			// console.log(res);
			// 			//this.login(res.data);
			// 		}
			// 	});
			// }
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
