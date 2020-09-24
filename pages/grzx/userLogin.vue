<template>
	<view class="content" v-bind:style="{height:imgHeight+'px'}">
		<!-- 背景图 -->
		<image src="../../static/grzx/backgroudimg.png" style="width: 100%; position: absolute; bottom: 0; height: 100%;"></image>
		<image src="../../static/grzx/back.png" class="returnClass" @click="returnClick"></image>
		
		<view class="inputContent" :class="userType == '定制客运'?'inputHeight1':'inputHeight2'">
			<view class="inputItem1">
				<image src="../../static/grzx/usertype.png" class="iconClass3"></image>
				<view class="selectClass">
					<xfl-select  :list="list" :clearable="false" :showItemNum="4"  :listShow="false" :isCanInput="false" @change="selectClick"  
					:style_Container="'height: 50px;font-size: 16px;'" :placeholder = "'请选择用户类型'" :initValue="userType" :selectHideType="'hideAll'">
			        </xfl-select>
				</view>
			</view>
			<view class="inputItem phoneNum">
				<image src="../../static/grzx/phone.png" class="iconClass1"></image>
				<input :placeholder="userType == '定制客运'?'请输入账号':'请输入手机号'" maxlength="20" class="inputClass" v-model="phoneNumber"/>
			</view>
			<view class="inputItem Captcha">
				<image src="../../static/grzx/password.png" class="iconClass2"></image>
				<input type="password" placeholder="请输入密码" class="inputClass" v-model="password" />
			</view>
			<view class="inputItem2" v-if="userType == '定制客运'">
				<radio-group @change="radioChange">
				   <label class="radio"><radio value="邵武" checked="true" style="transform: scale(0.8)" color="#F96072"/>邵武</label>
				   <label class="radio"><radio value="泰宁" style="transform: scale(0.8)" color="#F96072"/>泰宁</label>         
				</radio-group>
			</view>
			<text class="fontStyle" :class="userType == '定制客运'?'fontTop1':'fontTop2'" @click="pwdClick">登录</text>
		</view>
		
		<!-- logo -->
		<image src="../../static/grzx/logo.png" class="logoClass"></image>
	</view>
</template>

<script>
	import xflSelect from '@/components/grzx/xfl-select/xfl-select.vue';
	export default {
		components: { xflSelect },  //注册为子组件
		data() {
			return {
				textCode:"获取验证码",
				phoneNumber:'',
				password:'',
				captchaCode:'',
				imgHeight:'',
				list: [       //下拉列表
					'定制客运',
				    '接客司机',
				],
				userType:'定制客运',	//用户类型
				address:'邵武',		//定制客运司机登录
			}
		},
		onLoad() {
			this.load();
		},
		methods: {
			//--------------加载数据-------------
			async load(){
				var that=this;
				uni.getSystemInfo({
				　　success: function(res) { // res - 各种参数
						that.imgHeight=res.windowHeight;
				       }
				});
			},
			//--------------密码登录-------------
			pwdClick(){
				if(this.phoneNumber == ""){
					uni.showToast({
						title: '请输入账号',
						icon:'none'
					});
				}else if(this.password == ""){
					uni.showToast({
						title: '请输入密码',
						icon:'none'
					});
				}else if(this.userType == "定制客运"){
					this.ky_login();
				}else if(this.userType == "接客司机"){
					this.jk_login();
				}
			},
			
			//----------------------------------定制客运登录----------------------------------
			ky_login(){
				uni.showLoading({
					title: '登录中...',
					mask: false
				});
				console.log(this.phoneNumber,'账号');
				console.log(this.address,'地区');
				uni.request({
					url: this.$GrzxInter.Interface.ky_login.value,
					method: this.$GrzxInter.Interface.ky_login.method,
					data: {
						User:this.phoneNumber,
						Passwod:'',
						Code:this.address,
					},
					success: res => {
						console.log(res,'res');
						if(res.statusCode == 200 && res.data.User != null){
							let data = res.data.User;
							uni.setStorageSync('userInfo',{
								AID:data.AID,
								coachCardNumber:data.CoachCardNumber,
								driverName:data.Name,
								phoneNumber:data.PhoneNumber,
								userID:data.UserID,
								code:this.address,
								userType:this.userType,
							})
							uni.showToast({
								title: '登录成功',
								icon:'none'
							});
							setTimeout(function(){
								uni.redirectTo({
									url:'/pages/CTKYDriver/selectOrder',
								})
							},500)
						}else{
							uni.showToast({
								title: res.data.Message,
								icon:'none'
							});
						}
					},
					fail: () => {
					},
					complete: () => {
						setTimeout(function(){
							uni.hideLoading();
						},2000)
					}
				});
			},
			
			//----------------------------------接客司机登录----------------------------------
			jk_login(){
				uni.showLoading({
					title: '登录中...',
					mask: false
				});
				uni.request({
					url: this.$GrzxInter.Interface.jk_login.value,
					method: this.$GrzxInter.Interface.jk_login.method,
					data: {
						phoneNumber:this.phoneNumber,
						passWord:this.password,
					},
					success: res => {
						console.log(res);
						uni.showToast({
							title: res.data.msg,
							icon:'none',
						});
						if(res.data.status){
							let data1 = res.data.data;
							uni.setStorageSync('userInfo',{
								AID : data1.AID,
								approvalStatus : data1.ApprovalStatus,
								companyID : data1.CompanyID,
								driveState : data1.driveState,
								idNumber : data1.IDNumber,
								licenseNumber : data1.LicenseNumber,
								driverName : data1.Name,
								phoneNumber : data1.Phone,
								sex : data1.Sex,
								userType:this.userType,
							})
							setTimeout(function(){
								uni.switchTab({
									url:'/pages/index/index',
								})
							},500)
						}
					},
					fail: () => {
					},
					complete: () => {
						setTimeout(function(){
							uni.hideLoading();
						},2000)
					}
				});
			},
			
			//--------------获取用户信息-------------
			getuserInfo(e){
				var that=this;
				uni.request({
					url:that.$GrzxInter.Interface.GetDetailInfo_Driver.value,
					data:{
						phoneNumber:e
					},
					method:that.$GrzxInter.Interface.GetDetailInfo_Driver.method,
					success(res) {
						uni.hideLoading();
						if(res.data.data.userauditState=='1'||res.data.data.userauditState==1){
							uni.setStorageSync('userInfo',res.data.data)
							uni.showToast({
								title:"登录成功",
								icon:"success"
							})
							uni.removeStorageSync('captchaCode'); //清除验证码的缓存
							setTimeout(function(){
								uni.switchTab({  //返回首页
									url:'/pages/index/index',
								}) 
							},500);
						}else if(res.data.data.userauditState=='0'||res.data.data.userauditState==0){
							uni.showToast({
								title:'您的信息正在审核中',
								icon:'none'
							})
						}else if(res.data.data.userauditState=='2'||res.data.data.userauditState==2){
							uni.showToast({
								title:'您的信息审核不通过，请重新注册',
								icon:'none'
							})
						}
					}
				})
			},
			//--------------获取车辆信息-------------
			getvehicleInfo(id){
				uni.request({
					url:'',
					data:{
						driverId:id,
					},
					method:'POST',
					success(res) {
						console.log(res,'vehicleInfo')
						uni.setStorageSync('vehicleInfo',{
							vehicleType: '',
							vehicleNumber: '',
						})
					}
				})
			},
			//--------------获取验证码-------------
			getCodeClick(e){
				var self=this;
				const {phoneNumber, captchaCode} = this;		
				if(self.judgeNum(self.phoneNumber)){
					var timer=null,second=59; //倒计时的时间
					if(self.textCode == "获取验证码"){
					  self.textCode = second+"秒后重发";
					  if(self.textCode == "59秒后重发"){
						  timer=setInterval(function(){
						  second--;
						  if(second<=0){	
						  	self.textCode = "获取验证码";
						  	clearInterval(timer);
						  	second=59;	
						  }
						  else{			
						  	self.textCode = second+"秒后重发";
						  }},1000)
						 uni.request({
							url:self.$GrzxInter.Interface.getLoginCode.value,
						    data:{
								phoneNumber:self.phoneNumber,
							},
							method:self.$GrzxInter.Interface.getLoginCode.method,
							success:(res)=>{
						 		console.log(res.data.data);
								uni.setStorage({
									key:'captchaCode',
									data:{
										code:res.data.data,
										phone:self.phoneNumber,
									}
								})
								setTimeout(function(){
									uni.removeStorage({
										key:'captchaCode',
									})
								},300000);
						    }
						 }) 
					  }
					}
				}else{
					uni.showToast({
						title : '请输入正确的手机号码',
						icon : 'none',
					})
				}
			},
			
			//--------------返回上一页-------------
			returnClick(){		
				uni.navigateBack();
			},
			
			//--------------下拉选择-------------
			selectClick(e){
				console.log(e.newVal)
				this.userType=e.newVal;
			},
			
			//--------------单选按钮点击事件-------------
			radioChange(e){
				this.address = e.detail.value;
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
	.logoClass{		//logo的样式
		width: 34.4%;
		height: 250upx;
		top: 200upx;
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
		position: absolute;
		top:324upx;
		left: 4.8%;
		background-color: white;
		border-radius: 50upx;
	}
	.inputHeight1{
		height: 820upx;
	}
	.inputHeight2{
		height: 750upx;
	}
	.inputItem{		//输入区域的样式
		width: 87.6%;
		height: 140upx;
		border-bottom: 1upx solid #EAEAEA;
	}
	.phoneNum{
		position: absolute;
		top:270upx;
		left: 6.19%;
	}
	.Captcha{
		position: absolute;
		top:410upx;
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
		top:640upx;
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
		left: 5%;
		text-align: center;
		font-size: 36upx;
		color: #FFFFFF;
		width: 90%;
		height: 100upx;
		line-height: 100upx;
		background: linear-gradient(270deg, #FA7465, #F95C75);
		box-shadow: 0px 7px 38px 8px rgba(216, 48, 75, 0.15);
		border-radius: 12px;
	}
	.fontTop1{
		top: 670upx;
	}
	.fontTop2{
		top: 600upx;
	}
	
	.inputItem1{ //下拉框样式
		position: absolute;
		top:130upx;
		left: 6.19%;
		width: 87.6%;
		height: 140upx;
		border-bottom: 1upx solid #EAEAEA;
	}
	.selectClass{
		position: absolute;
		top:30upx;
		left: 8.19%;
		width: 93.6%;
	}
	.iconClass3{   //用户类型图标
		width: 33upx;
		height: 36upx;
		top: 57upx;
		left:2%;
		position: absolute;
	}
	.inputItem2{
		width: 90%;
		position: absolute;
		top:580upx;
		left: 6.19%;
		.radio{
			margin-left: 18%;
		}
	}
</style>
