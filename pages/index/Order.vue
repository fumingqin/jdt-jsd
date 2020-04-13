<template>
	<view>
		<view style="margin:0 30rpx;">
			<view style="position: fixed;top: 0;left: 30rpx;right: 30rpx;z-index: 9999;background-color: #F6F8FE;">
				<view class="tab">
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==0?'tabactive':''" @click="tabclick(0)">全部</view>
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==1?'tabactive':''" @click="tabclick(1)">进行中</view>
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==2?'tabactive':''" @click="tabclick(2)">已完成</view>
					<view style="height: 55rpx;font-weight: 600;color: #2C2D2;" :class="current==3?'tabactive':''" @click="tabclick(3)">已取消</view>
				</view>
			</view>
			<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==0">
				<!-- 客车开始 -->
				<view style="margin-top: 20rpx;" v-for="(item,index) in orderArr" :key="index" v-if="carTypeid==2">
					<view class="booktime" v-if="item.ordertype==1">
						预订日期：{{item.date}}
					</view>
					<view class="order">
						<view style="padding: 35rpx 30rpx;">
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view style="display: flex;align-items: center;">
									<image src="../../static/index/CPDG.png" style="width: 50rpx;" mode="widthFix"></image>
									<view class="ordertitle">{{item.carType}}</view>
								</view>
								<view class="orderstatus" v-if="item.status==1">未发车</view>
								<view class="orderstatus" v-if="item.status==2">进行中</view>
								<view class="orderstatus" v-if="item.status==3">已完成</view>
								<view class="orderstatus" v-if="item.status==4">已取消</view>
							</view>
							<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
								<view>出发时间：{{item.startTime}}</view>
								<view>出发地：{{item.startPoint}}</view>
								<view>目的地：{{item.endPoint}}</view>
								<view style="display: flex;">
									<view>
										已检：{{item.checkedNum}}
									</view>
									<view style="padding-left: 40rpx;">
										未检：{{item.nocheckedNum}}
									</view>
								</view>
							</view>
							<view class="btnarea">
								<view v-if="item.status==2">
									<button>检票</button>
								</view>
								<view>
									<button>详情</button>
								</view>
								<view v-if="item.status==1">
									<button style="background-color: #FC4646;color: #FFF;">购票</button>
								</view>
								<view v-if="item.status==1">
									<button style="background-color: #FC4646;color: #FFF;">发车</button>
								</view>
							</view>
							<view>

							</view>
						</view>
					</view>
				</view>
				<!-- 客车结束 -->
				<!-- 出租车开始 -->
				<view v-if="carTypeid==1">
					<view style="margin-top: 20rpx;" v-for="(item,index) in orderArr1" :key="index">
						<view class="booktime" v-if="item.ordertype==1">
							预订日期：{{item.date}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/Car1.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.carType}}</view>
									</view>
									<view class="orderstatus" v-if="item.status==1">未发车</view>
									<view class="orderstatus" v-if="item.status==2">进行中</view>
									<view class="orderstatus" v-if="item.status==3">已完成</view>
									<view class="orderstatus" v-if="item.status==4">已取消</view>
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{item.userType}}
										</view>
										<view style="padding-left: 40rpx;">
											￥{{item.price}}
										</view>
									</view>
									<view>出发时间：{{item.startTime}}</view>
									<view>上车点：{{item.startPoint}}</view>
									<view>目的地：{{item.endPoint}}</view>

								</view>
								<view class="btnarea">
									<view v-if="item.status==1">
										<button style="width: auto;">联系乘客</button>
									</view>
									<view>
										<button style="width: auto;">取消</button>
									</view>
									<view>
										<button style="width: auto;">详情</button>
									</view>
									<view v-if="item.status==3">
										<button style="background-color: #FC4646;color: #FFF;width: auto;">到达</button>
									</view>
									<view v-if="item.status==1">
										<button style="background-color: #FC4646;color: #FFF;width: auto;">上车</button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 出租车结束 -->
				<!-- 包车开始 -->
				<view v-if="carTypeid==3">
					<view style="margin-top: 20rpx;position: relative;" v-for="(item,index) in orderArr2" :key="index">
						<view class="booktime" v-if="item.ordertype==1">
							预订日期：{{item.date}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/BCFW.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.carType}}</view>
									</view>
									<view class="orderstatus" v-if="item.status==1">未发车</view>
									<view class="orderstatus" v-if="item.status==2">进行中</view>
									<view class="orderstatus" v-if="item.status==3">已完成</view>
									<view class="orderstatus" v-if="item.status==4">已取消</view>
									<view class="orderstatus" v-if="item.status==5">返程中</view>
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{item.userType}}
										</view>
										<view style="padding-left: 40rpx;">
											￥{{item.price}}
										</view>
									</view>
									<view>出发时间：{{item.startTime}}</view>
									<view>上车点：{{item.startPoint}}</view>
									<view>目的地：{{item.endPoint}}</view>
									<view>包车天数：{{item.charterDays}}天</view>
								</view>
								<view class="btnarea" style="justify-content: space-between;">
									<view v-if="item.status==1" @click="show(item)" style="color: #999;">
										...
									</view>
									<view v-if="item.status==1">
										<button style="width: auto;">联系乘客</button>
									</view>
									<view v-if="item.status==1">
										<button style="width: auto;">更换目的地</button>
									</view>
									<view v-if="item.status==1">
										<button style="background-color: #FC4646;color: #FFF;width: auto;">返程</button>
									</view>
								</view>
							</view>
						</view>
						<view class="one" v-if="item.IsShow">
							详情
							<view class="one0">
							</view>
						</view>
					</view>
				</view>
				<!-- 包车结束 -->
			</view>
			<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==1">
				<!-- 客车开始 -->
				<view style="margin-top: 20rpx;" v-for="(item,index) in orderArr" :key="index" v-if="carTypeid==2">
					<view class="booktime" v-if="item.ordertype==1">
						预订日期：{{item.date}}
					</view>
					<view class="order">
						<view style="padding: 35rpx 30rpx;">
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view style="display: flex;align-items: center;">
									<image src="../../static/index/CPDG.png" style="width: 50rpx;" mode="widthFix"></image>
									<view class="ordertitle">{{item.carType}}</view>
								</view>
								<view class="orderstatus">进行中</view>
							</view>
							<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
								<view>出发时间：{{item.startTime}}</view>
								<view>出发地：{{item.startPoint}}</view>
								<view>目的地：{{item.endPoint}}</view>
								<view style="display: flex;">
									<view>
										已检：{{item.checkedNum}}
									</view>
									<view style="padding-left: 40rpx;">
										未检：{{item.nocheckedNum}}
									</view>
								</view>
							</view>
							<view class="btnarea">
								<view v-if="item.status==2">
									<button>检票</button>
								</view>
								<view>
									<button>详情</button>
								</view>
								<view v-if="item.status==1">
									<button style="background-color: #FC4646;color: #FFF;">购票</button>
								</view>
								<view v-if="item.status==1">
									<button style="background-color: #FC4646;color: #FFF;">发车</button>
								</view>
							</view>
							<view>

							</view>
						</view>
					</view>
				</view>
				<!-- 客车结束 -->
				<!-- 出租车开始 -->
				<view v-if="carTypeid==1">
					<view style="margin-top: 20rpx;" v-for="(item,index) in orderArr1" :key="index">
						<view class="booktime" v-if="item.ordertype==1">
							预订日期：{{item.date}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/Car1.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.carType}}</view>
									</view>
									<view class="orderstatus">进行中</view>
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{item.userType}}
										</view>
										<view style="padding-left: 40rpx;">
											￥{{item.price}}
										</view>
									</view>
									<view>出发时间：{{item.startTime}}</view>
									<view>上车点：{{item.startPoint}}</view>
									<view>目的地：{{item.endPoint}}</view>

								</view>
								<view class="btnarea">
									<view v-if="item.status==1">
										<button style="width: auto;">联系乘客</button>
									</view>
									<view>
										<button style="width: auto;">取消</button>
									</view>
									<view>
										<button style="width: auto;">详情</button>
									</view>
									<view v-if="item.status==3">
										<button style="background-color: #FC4646;color: #FFF;width: auto;">到达</button>
									</view>
									<view v-if="item.status==1">
										<button style="background-color: #FC4646;color: #FFF;width: auto;">上车</button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 出租车结束 -->
				<!-- 包车开始 -->
				<view v-if="carTypeid==3">
					<view style="margin-top: 20rpx;position: relative;" v-for="(item,index) in orderArr2" :key="index">
						<view class="booktime" v-if="item.ordertype==1">
							预订日期：{{item.date}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/BCFW.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.carType}}</view>
									</view>
									<view class="orderstatus" v-if="item.status==2">进行中</view>
									<view class="orderstatus" v-if="item.status==5">返程中</view>
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{item.userType}}
										</view>
										<view style="padding-left: 40rpx;">
											￥{{item.price}}
										</view>
									</view>
									<view>出发时间：{{item.startTime}}</view>
									<view>上车点：{{item.startPoint}}</view>
									<view>目的地：{{item.endPoint}}</view>
									<view>包车天数：{{item.charterDays}}天</view>
								</view>
								<view class="btnarea" style="justify-content: space-between;">
									<view v-if="item.status==1" @click="show(item)" style="color: #999;">
										...
									</view>
									<view v-if="item.status==1">
										<button style="width: auto;">联系乘客</button>
									</view>
									<view v-if="item.status==1">
										<button style="width: auto;">更换目的地</button>
									</view>
									<view v-if="item.status==1">
										<button style="background-color: #FC4646;color: #FFF;width: auto;">返程</button>
									</view>
								</view>
							</view>
						</view>
						<view class="one" v-if="item.IsShow">
							详情
							<view class="one0">
							</view>
						</view>
					</view>
				</view>
				<!-- 包车结束 -->
			</view>
			<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==2">
				<!-- 客车开始 -->
				<view style="margin-top: 20rpx;" v-for="(item,index) in orderArr" :key="index" v-if="carTypeid==2">
					<view class="booktime" v-if="item.ordertype==1">
						预订日期：{{item.date}}
					</view>
					<view class="order">
						<view style="padding: 35rpx 30rpx;">
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view style="display: flex;align-items: center;">
									<image src="../../static/index/CPDG.png" style="width: 50rpx;" mode="widthFix"></image>
									<view class="ordertitle">{{item.carType}}</view>
								</view>
								<view class="orderstatus">已完成</view>
							</view>
							<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
								<view>出发时间：{{item.startTime}}</view>
								<view>出发地：{{item.startPoint}}</view>
								<view>目的地：{{item.endPoint}}</view>
								<view style="display: flex;">
									<view>
										已检：{{item.checkedNum}}
									</view>
									<view style="padding-left: 40rpx;">
										未检：{{item.nocheckedNum}}
									</view>
								</view>
							</view>
							<view class="btnarea">
								<view v-if="item.status==2">
									<button>检票</button>
								</view>
								<view>
									<button>详情</button>
								</view>
								<view v-if="item.status==1">
									<button style="background-color: #FC4646;color: #FFF;">购票</button>
								</view>
								<view v-if="item.status==1">
									<button style="background-color: #FC4646;color: #FFF;">发车</button>
								</view>
							</view>
							<view>

							</view>
						</view>
					</view>
				</view>
				<!-- 客车结束 -->
				<!-- 出租车开始 -->
				<view v-if="carTypeid==1">
					<view style="margin-top: 20rpx;" v-for="(item,index) in orderArr1" :key="index">
						<view class="booktime" v-if="item.ordertype==1">
							预订日期：{{item.date}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/Car1.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.carType}}</view>
									</view>
									<view class="orderstatus">已完成</view>
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{item.userType}}
										</view>
										<view style="padding-left: 40rpx;">
											￥{{item.price}}
										</view>
									</view>
									<view>出发时间：{{item.startTime}}</view>
									<view>上车点：{{item.startPoint}}</view>
									<view>目的地：{{item.endPoint}}</view>

								</view>
								<view class="btnarea">
									<view v-if="item.status==1">
										<button style="width: auto;">联系乘客</button>
									</view>
									<view>
										<button style="width: auto;">详情</button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 出租车结束 -->
				<!-- 包车开始 -->
				<view v-if="carTypeid==3">
					<view style="margin-top: 20rpx;" v-for="(item,index) in orderArr2" :key="index">
						<view class="booktime" v-if="item.ordertype==1">
							预订日期：{{item.date}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/BCFW.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.carType}}</view>
									</view>
									<view class="orderstatus">已完成</view>
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{item.userType}}
										</view>
										<view style="padding-left: 40rpx;">
											￥{{item.price}}
										</view>
									</view>
									<view>出发时间：{{item.startTime}}</view>
									<view>上车点：{{item.startPoint}}</view>
									<view>目的地：{{item.endPoint}}</view>
									<view>包车天数：{{item.charterDays}}天</view>
								</view>
								<view class="btnarea">
									<view v-if="item.status==1">
										<button style="width: auto;">联系乘客</button>
									</view>
									<view>
										<button style="width: auto;">详情</button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 包车结束 -->
			</view>
			<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==3">
				<!-- 客车开始 -->
				<view style="margin-top: 20rpx;" v-for="(item,index) in orderArr" :key="index" v-if="carTypeid==2">
					<view class="booktime" v-if="item.ordertype==1">
						预订日期：{{item.date}}
					</view>
					<view class="order">
						<view style="padding: 35rpx 30rpx;">
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view style="display: flex;align-items: center;">
									<image src="../../static/index/CPDG.png" style="width: 50rpx;" mode="widthFix"></image>
									<view class="ordertitle">{{item.carType}}</view>
								</view>
								<view class="orderstatus">已取消</view>
							</view>
							<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
								<view>出发时间：{{item.startTime}}</view>
								<view>出发地：{{item.startPoint}}</view>
								<view>目的地：{{item.endPoint}}</view>
								<view style="display: flex;">
									<view>
										已检：{{item.checkedNum}}
									</view>
									<view style="padding-left: 40rpx;">
										未检：{{item.nocheckedNum}}
									</view>
								</view>
							</view>
							<view class="btnarea">
								<view>
									<button>详情</button>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 客车结束 -->
				<!-- 出租车开始 -->
				<view v-if="carTypeid==1">
					<view style="margin-top: 20rpx;" v-for="(item,index) in orderArr1" :key="index">
						<view class="booktime" v-if="item.ordertype==1">
							预订日期：{{item.date}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/Car1.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.carType}}</view>
									</view>
									<view class="orderstatus">已取消</view>
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{item.userType}}
										</view>
										<view style="padding-left: 40rpx;">
											￥{{item.price}}
										</view>
									</view>
									<view>出发时间：{{item.startTime}}</view>
									<view>上车点：{{item.startPoint}}</view>
									<view>目的地：{{item.endPoint}}</view>

								</view>
								<view class="btnarea">
									<view>
										<button style="width: auto;">详情</button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 出租车结束 -->
				<!-- 包车开始 -->
				<view v-if="carTypeid==3">
					<view style="margin-top: 20rpx;" v-for="(item,index) in orderArr2" :key="index">
						<view class="booktime" v-if="item.ordertype==1">
							预订日期：{{item.date}}
						</view>
						<view class="order">
							<view style="padding: 35rpx 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view style="display: flex;align-items: center;">
										<image src="../../static/index/BCFW.png" style="width: 50rpx;" mode="widthFix"></image>
										<view class="ordertitle">{{item.carType}}</view>
									</view>
									<view class="orderstatus">已取消</view>
								</view>
								<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
									<view style="display: flex;justify-content: space-between;">
										<view>
											客户类型：{{item.userType}}
										</view>
										<view style="padding-left: 40rpx;">
											￥{{item.price}}
										</view>
									</view>
									<view>出发时间：{{item.startTime}}</view>
									<view>上车点：{{item.startPoint}}</view>
									<view>目的地：{{item.endPoint}}</view>
									<view>包车天数：{{item.charterDays}}天</view>
								</view>
								<view class="btnarea">
									<view v-if="item.status==1">
										<button style="width: auto;">联系乘客</button>
									</view>
									<view>
										<button style="width: auto;">详情</button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 包车结束 -->
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carTypeid: 0,
				current: 0,
				orderArr: [{ //客车
						carType: '客车-传统',
						status: 1,
						date: '04-08',
						ordertype: 0,
						startTime: '2020-03-08 20:00 ',
						startPoint: '泉州客运中心',
						endPoint: '晋江国际机场',
						checkedNum: '10人',
						nocheckedNum: '20人'
					},
					{
						carType: '客车-定制',
						status: 2,
						date: '04-08',
						ordertype: 1,
						startTime: '2020-03-08 20:00 ',
						startPoint: '泉州客运中心',
						endPoint: '晋江国际机场',
						checkedNum: '10人',
						nocheckedNum: '20人'
					},
					{
						carType: '客车-传统',
						status: 3,
						date: '04-08',
						ordertype: 1,
						startTime: '2020-03-08 20:00 ',
						startPoint: '泉州客运中心',
						endPoint: '晋江国际机场',
						checkedNum: '10人',
						nocheckedNum: '20人'
					},
					{
						carType: '客车-定制',
						status: 4,
						date: '04-08',
						ordertype: 0,
						startTime: '2020-03-08 20:00 ',
						startPoint: '泉州客运中心',
						endPoint: '晋江国际机场',
						checkedNum: '10人',
						nocheckedNum: '20人'
					}
				],
				orderArr1: [{ //出租车
						carType: '出租车',
						status: 1,
						date: '04-08',
						ordertype: 0,
						startTime: '2020-03-08 20:00 ',
						startPoint: '泉州客运中心',
						endPoint: '晋江国际机场',
						userType: '普通',
						price: '50.5',
					},
					{
						carType: '出租车',
						status: 2,
						date: '04-08',
						ordertype: 1,
						startTime: '2020-03-08 20:00 ',
						startPoint: '泉州客运中心',
						endPoint: '晋江国际机场',
						userType: '会员',
						price: '666.5',
					},
					{
						carType: '出租车',
						status: 3,
						date: '04-10',
						ordertype: 1,
						startTime: '2020-03-08 20:00 ',
						startPoint: '泉州客运中心',
						endPoint: '晋江国际机场',
						userType: '普通',
						price: '50.5',
					},
					{
						carType: '出租车',
						status: 4,
						date: '04-08',
						ordertype: 0,
						startTime: '2020-03-08 20:00 ',
						startPoint: '泉州客运中心',
						endPoint: '晋江国际机场',
						userType: '会员',
						price: '55.5',
					}
				],

				orderArr2: [{ //包车
						carType: '包车-定制',
						status: 1,
						date: '04-08',
						ordertype: 0,
						startTime: '2020-03-08 20:00 ',
						startPoint: '泉州客运中心',
						endPoint: '晋江国际机场',
						userType: '普通',
						price: '50.5',
						charterDays: 1,
						IsShow: false
					},
					{
						carType: '包车-专线',
						status: 2,
						date: '04-08',
						ordertype: 1,
						startTime: '2020-03-08 20:00 ',
						startPoint: '泉州客运中心',
						endPoint: '晋江国际机场',
						userType: '会员',
						price: '666.5',
						charterDays: 1.5,
						IsShow: false
					},
					{
						carType: '包车-定制',
						status: 3,
						date: '04-10',
						ordertype: 1,
						startTime: '2020-03-08 20:00 ',
						startPoint: '泉州客运中心',
						endPoint: '晋江国际机场',
						userType: '普通',
						price: '50.5',
						charterDays: 2,
						IsShow: false
					},
					{
						carType: '包车-定制',
						status: 4,
						date: '04-08',
						ordertype: 0,
						startTime: '2020-03-08 20:00 ',
						startPoint: '泉州客运中心',
						endPoint: '晋江国际机场',
						userType: '会员',
						price: '55.5',
						charterDays: 3,
						IsShow: false
					}
				]


			}
		},
		onShow() {
			var that = this;
			uni.getStorage({
				key: "CarType",
				success(res) {
					if (res.data == "出租车") {
						that.carTypeid = 1;
					}
					if (res.data == "客车") {
						that.carTypeid = 2;
					}
					if (res.data == "包车") {
						that.carTypeid = 3;
					}
					if (res.data == "旅游") {
						that.carTypeid = 4;
					}
				}
			})
		},
		methods: {
			tabclick: function(e) {
				this.current = e;
			},
			show: function(el) {
				el.IsShow = !el.IsShow
			}
		}
	}
</script>

<style>
	page {
		background-color: #F6F8FE;
	}

	.tab {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		padding: 0 20rpx 20rpx 20rpx;
	}

	.tabactive {
		border-bottom: solid 1px #FC4646;
		color: #FC4646;
	}

	.booktime {
		width: 220rpx;
		background-color: #06B4FD;
		color: #FFF;
		font-size: 24rpx;
		height: 48rpx;
		border-radius: 24rpx;
		text-align: center;
		line-height: 48rpx;
	}

	.order {
		background-color: #FFF;
		margin-top: 20rpx;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		border-radius: 20rpx;
	}

	.ordertitle {
		font-size: 36rpx;
		padding-left: 5rpx;
		font-family: Source Han Sans SC;
		font-weight: bold;
		color: rgba(44, 45, 45, 1);
		line-height: 42rpx;
	}

	.orderstatus {
		font-size: 30rpx;
		font-family: Source Han Sans SC;
		font-weight: 300;
		color: rgba(51, 51, 51, 1);
		line-height: 50rpx;
	}

	.btnarea {
		display: flex;
		justify-content: flex-end;
		padding-top: 40rpx;
		flex-wrap: nowrap
	}

	.btnarea uni-view {
		padding-left: 20rpx;
	}

	.btnarea button {
		background-color: #FFF;
		font-size: 32rpx;
		color: #333333;
		width: 140rpx;
	}

	.one {
		width: 150rpx;
		height: 80rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		/*相对位置*/
		position: absolute;
		bottom: -95rpx;
		z-index: 555;
		text-align: center;
		font-size: 32rpx;
		color: #333333;
		line-height: 80rpx;
	}

	.one0 {
		width: 0;
		height: 0;
		border: 20rpx solid white;
		border-top: none;
		border-right-color: transparent;
		border-left-color: transparent;
		/*绝对位置*/
		position: absolute;
		top: -20rpx;
		left: 40rpx;
	}
</style>
