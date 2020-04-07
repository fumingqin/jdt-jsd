<script>
	import {
		mapMutations
	} from 'vuex';
	export default {
		data:{
		},
		globalData:{
			globalInterval:0,
			uploadMyLocation:function(){
				uni.getLocation({
					type:'gcj02 ',
					success:function(res){
						uni.request({
							url:'',
							data:{
								Longitude:res.data.longitude,
								Latitude:res.data.Latitude,
								Time:new Date()
							}
						});
					}
				});
			}, 
			constantly:function(){
				let that = this;
				if(that.globalInterval == 0){ 
					that.globalInterval = setInterval(function(){
						console.log(new Date());
						/* that.uploadMyLocation(); */ 
					},10000);
				}
			},
		},
		
		methods: {
			...mapMutations(['login']),
		},
		onLaunch: function() {
			let that = this;
			let userInfo = uni.getStorageSync('userInfo') || '';
			
			if(userInfo.nickName){
				//如果有登录缓存则开启定时器。
				that.constantly();
			}
			
			if(userInfo.nickName){
				//更新登陆状态
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						console.log(res);
						this.login(res.data);
					}
				});
			}
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
