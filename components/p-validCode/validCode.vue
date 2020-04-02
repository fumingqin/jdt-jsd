<!-- 
自定义验证码输入、密码输入使用
 
使用方法：
maxlength：输入最大长度
isPwd：是否是密码模式
@finish：回调函数
 <validcode :maxlength="4" :isPwd="false" @finish="finish"></validcode>
 -->
<template>
	<view class="code-area">
		<view class="flex-box">
			<input
			    :value="val"
				type="text"
				focus="true"
				:maxlength="maxlength"
				class="hide-input"
				@input="getVal"
				@change="change"
			/>
			<block v-if="maxlength >0" v-for="(items,index) in maxlength" :key=index>			
				<view v-bind:class="['item', { active: codeIndex == index+1 }]">
					<view class="line"></view>
					<block v-if="isPwd && codeArr.length >= index+1">
						<!-- <text class="dot">.</text> -->
					</block>
					<block v-else>	{{ codeArr[index] ? codeArr[index] : ''}}</block>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		//最大长度 值为4或者6
		maxlength: {
			type: Number,
			default: 7
		},
		//是否是密码
		isPwd: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			codeIndex: 1, //下标
			codeArr: [],
			val:'',//输入框的值
		};
	},
	methods: {
		change(){
			if (this.codeIndex > Number(this.maxlength)) {
				//输入完成
				this.$emit('finish',this.codeArr.join(''));
			}
		},
		//取值
		getVal(e) {
			uni.hideKeyboard();
			console.log(e.detail)
			let { value } = e.detail;
			console.log(typeof value)
			this.val=value;
			// console.log('验证码:', value);
			let arr = value.split('');
			this.codeIndex = arr.length + 1;
			this.codeArr = arr;
			// console.log(this.codeIndex, this.pwdArr);
			// if (this.codeIndex > Number(this.maxlength)) {
			// 	//输入完成
			// 	this.$emit('finish',this.codeArr.join(''));
			// }
		},
		//清除验证码或者密码
		clear(){
			this.codeIndex=1;
			this.codeArr=[];
			this.val="";
		}
	}
};
</script>

<style lang="scss">
.code-area {
	text-align: center;
	.flex-box {
		display: flex;
		flex-wrap: nowrap;
		position: relative;
		justify-content: center;
	}
	.item {
		position: relative;
		width: 100upx;
		height: 108upx;
		margin-right: 18upx;
		font-size: 30upx;
		font-weight: bold;
		color: #333333;
		line-height: 108upx;
		box-sizing: border-box;
		border: 2upx solid #cccccc;
		background: #FFFFFF;
		border-radius: 12upx;
	}
	.item:last-child {
		margin-right: 0;
	}
	.active {
		border-color: #ff4b4b;
	}
	.active .line {
		display: block;
	}
	.line {
		display: none;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 2upx;
		height: 40upx;
		background: #ff4b4b;
		animation: twinkling 1s infinite ease;
	}
	.hide-input {
		position: absolute;
		top: 0;
		left: -100%;
		width: 200%;
		height: 100%;
		text-align: left;
		z-index: 9;
		opacity: 1;
	}
	@keyframes twinkling {
		0% {
			opacity: 0.2;
		}
		50% {
			opacity: 0.5;
		}
		100% {
			opacity: 0.2;
		}
	}
	.dot{
		font-size: 80upx;
		line-height: 40upx;
	}
}
</style>
