<template>
	<view class="content" v-bind:style="{height:imgHeight+'px'}">
		<!-- 背景图 -->
		<image src="../../static/login/backgroudimg.png" style="width: 100%; position: absolute; bottom: 0; height: 100%;"></image>

		
		<image src="../../static/login/back.png" class="returnClass" @click="returnClick"></image>
		<view class="inputContent">
			<view class="inputItem phoneNum">
				<image src="../../static/login/phone.png" class="iconClass1"></image>
				<input type="number" placeholder="手机号码" maxlength="11" class="inputClass" data-key="phoneNumber" @input="inputChange1" />
			</view>
			<view class="inputItem Captcha">
				<image src="../../static/login/code.png" class="iconClass2"></image>
				<input type="number" placeholder="输入验证码" maxlength="6" class="inputClass" data-key="captchaCode" @input="inputChange2" />
			</view>
			
			<!-- 按钮颜色和发送验证码的样式 -->
			<view class="getCode style1" @click="getCodeClick" id="Code">{{textCode}}</view>
			<image src="../../static/login/btnLogin.png" class="btnLogin" ></image>
			
			<text class="fontStyle" @click="loginClick">确定</text>
		</view>
		
		<!-- logo -->
		<image src="../../static/login/logo.png" class="logoClass"></image>
	</view>
</template>

<script>
	import {
		mapState,
	    mapMutations  
	} from 'vuex';
	export default {
		data() {
			return {
				textCode:"获取验证码",
				phoneNumber:'',
				captchaCode:'',
				imgHeight:'',
				loginType:'',
			}
		},
		onLoad() {
			this.load();
		},
		methods: {
			...mapMutations(['login']),
			async load(){
				var that=this;
				uni.getSystemInfo({
				　　success: function(res) { // res - 各种参数
						that.imgHeight=res.windowHeight;
				       }
				});
			},
			judgeNum(val){  //只能输入数字
				var regPos = /^\d+(\.\d+)?$/; //非负浮点数
				    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
				    if(regPos.test(val) || regNeg.test(val)) {
				        return true;
				    } else {
				        return false;
				    }
			},
			inputChange1(e){
				var num=e.detail.value;
				if(this.judgeNum(num)){
					
				}else{
					uni.showToast({
						title : '请输入正确的手机号码',
						icon : 'none',
					})
				}
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			inputChange2(e){
				var num=e.detail.value;
				if(this.judgeNum(num)){
					
				}else{
					uni.showToast({
						title : '请输入正确的验证码',
						icon : 'none',
					})
				}
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			loginClick(){	 //登录按钮
				this.logining=true;
				//登录成功开启定时器。
				if(this.logining){
					getApp().globalData.constantly();
				}
				var that=this;
				const {phoneNumber, captchaCode} = this;		
				var phone=this.phoneNumber;
				var captcha=this.captchaCode;
				if(phone==null||phone==""){
					uni.showToast({
						title:"请输入手机号码",
						icon:"none"
					})
				}else{
					if(captcha==null||captcha==""){
						uni.showToast({
							title:"请输入验证码",
							icon:"none"
						})
					}else{
						uni.getStorage({
							key:'captchaCode',
							success(res) {
								if(captcha==res.data){
								var randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);	
									uni.setStorage({
										key:'userInfo',
										data:{
											phoneNumber:phone,
											nickName:"用户"+randomNum
										}
									})
									uni.getStorage({
										key:'userInfo',
										success:function(user){
											that.login(user.data);
										}
									})
									uni.login({
										success() {
											uni.showToast({
												title:"登录成功"
											})
										}
									})
									 uni.switchTab({
										url:'/pages/index/index',
									}) 
								}else{
									uni.showToast({
										title:"验证码错误",
										icon:"none"
									})
								}
							}
						})
					}
				}
				
			},
			getCodeClick(e){	//获取验证码
				var self=this;
				const {phoneNumber, captchaCode} = this;		
				if(self.judgeNum(self.phoneNumber)){
					var timer=null,second=60; //倒计时的时间
					if(self.textCode == "获取验证码"){
					  //获取6位随机数
					  var randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
					  //短信接口
					  uni.setStorage({
							key:'captchaCode',
							data:randomNum
					  })
						uni.request({
						   url: 'http://111.231.109.113:8000/api/MyTest/SendMessage',
						   data:{
							  phoneNumber:self.phoneNumber,
							  text:'动态验证码：'+randomNum+',如果不是本人请忽略此短信。'
						   },
						   method:"GET",
						   success: function (res) {
								console.log(res);
								if(res.data){
									timer=setInterval(function(){
									second--;
									if(second<=0){	
										self.textCode = "获取验证码";
										clearInterval(timer);
										second=60;	
									}
									else{			
										self.disabled = true;
										self.textCode = second+"秒后重发";
									}},1000)
								}else{
									uni.showToast({
										title : '手机号码有误',
										icon : 'none',
									})
								}
						   }
						})	
					}
				}else{
					uni.showToast({
						title : '请输入正确的手机号码',
						icon : 'none',
					})
				}
			},
			returnClick(){		//返回个人中心
				uni.switchTab({
					url:'/pages/GRZX/user'
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
		top: 80upx;
		left: 4.13%;
		position: absolute;
	}
	.logoClass{		//logo的样式
		width: 32.4%;
		height: 233upx;
		top: 147upx;
		left: 33.87%;
		position: absolute;
	}
	.iconClass1{   //手机图标
		width: 26upx;
		height: 36upx;
		top: 57upx;
		left:2%;
		position: absolute;
	}
	.iconClass2{	//验证码图标
		width: 31upx;
		height: 38upx;
		top: 54upx;
		left: 2%;
		position: absolute;
	}
	.inputContent{  //登录区域的样式
		width: 90.4%;
		height: 720upx;
		position: absolute;
		top:277upx;
		left: 4.8%;
		background-color: white;
		border-radius: 20upx;
	}
	.inputItem{		//输入区域的样式
		width: 87.6%;
		height: 140upx;
		border-bottom: 1upx solid #EAEAEA;
	}
	.phoneNum{
		position: absolute;
		top:130upx;
		left: 6.19%;
	}
	.Captcha{
		position: absolute;
		top:272upx;
		left: 6.19%;
	}
	.inputClass{	//输入框的位置
		position: absolute;
		left: 12%;
		top:51upx;
		font-size: 32upx;
		height: 30upx;
		line-height: 30upx;
		color: #999999;
	}
	.btnLogin{ //按钮
		position: absolute;
		top:421upx;
		width: 100%;
		height: 180upx;
	}
	.leftLine{
		border: 1upx solid #EAEAEA;
		height: 1upx;
		width: 22.48%;
		position: absolute;
		top:920upx;
		left: 11.73%;
	}
	.rightLine{
		border: 1upx solid #EAEAEA;
		height: 1upx;
		width: 22.48%;
		position: absolute;
		top: 920upx;
		left: 64.78%;
	}
	.getCode{  //获取验证码
		position: absolute;
		top:308upx;
		left: 64%;
		width:30%;
		font-size: 28upx;
		border-radius: 12upx;
		text-align: center;
		line-height: 64upx;
		height: 64upx;
	}
	.style1{	
		border:1px solid #ED1C24;
		color: #ED1C24;
	}	
	.fontStyle{		//确定字体样式
		position: absolute;
		top: 450upx;
		left: 5%;
		text-align: center;
		font-size: 36upx;
		color: #FFFFFF;
		width: 90%;
		height: 100upx;
		line-height: 100upx;
	}
</style>
