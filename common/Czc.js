/* 接口参数区 */
// 示例

//接口域名
const Url = 'http://zntc.145u.net';
//const Url = 'http://111.231.109.113:8002';

const InterfaceAddress = [
	//根据起终点经纬度获取线路规划
	//使用页面 - /CZC/CallAndDrive - 
	'http://zntc.145u.net/api/zhcx/getPlanningLineByLonLat',
	//获取所有车辆定位数据
	'http://zntc.145u.net/api/zhcx/getAllVehiclePosition',
	//根据经纬度获取附近一定范围的经纬度
	'http://zntc.145u.net/api/zhcx/getLonLatRangeVehiclePosition',
]
const delayTime = {
	getOrderDelay: {
		name: '司机端-出租车-可接订单',
		interface: 'GetCanReceiptExpressOrder_Driver',
		page: [
			'/driver/taxiDriver'
		],
		time: 5000
	}
}




//接口对象
const Interface = {
	GetCanReceiptExpressOrder_Driver: {
		value: Url + '/api/taxi/GetCanReceiptExpressOrder_Driver',
		name: '司机端-出租车-获取可接订单',
		method: 'POST', //GET-POST
		pages: []
	},
	ReceiptExpressOrder_Driver: {
		value: Url + '/api/taxi/ReceiptExpressOrder_Driver',
		name: '司机端-出租车-接单',
		method: 'POST', //GET-POST
		pages: []
	},
	CancelExpressOrderByOrderNum_Driver: {
		value: Url + '/api/taxi/CancelExpressOrderByOrderNum_Driver',
		name: '司机端-出租车-取消订单',
		method: 'POST', //GET-POST
		pages: []
	},
	RefuseExpressOrderByOrderNumDriverID_Driver: {
		value: Url + '/api/taxi/RefuseExpressOrderByOrderNumDriverID_Driver',
		name: '司机端-出租车-拒接订单',
		method: 'POST', //GET-POST
		pages: []
	},
	InputAmountExpressOrder_Driver: {
		value: Url + '/api/taxi/InputAmountExpressOrder_Driver',
		name: '司机端-出租车-订单支付',
		method: 'POST', //GET-POST
		pages: []
	},
	GetExpressOrderByOrderNumber_Driver:{
		value:Url + '/api/taxi/GetExpressOrderByOrderNumber_Driver',
		name:'司机端-出租车-根据司机Id和订单Id获取订单详情',
		method:'POST',
		page:["/dirver/confirmgetonCar"]
	},
	RunExpressOrder_Driver:{
		value:Url + '/api/taxi/RunExpressOrder_Driver',
		name:'司机端-出租车-长按确认乘客上车',
		method:'POST',
		page:[""]
	},
	FinishExpressOrder_Driver:{
		value:Url + '/api/taxi/FinishExpressOrder_Driver',
		name:'司机端-出租车-长按到达目的地',
		method:'POST',
		page:[""]
	},
	SetoutExpressOrder_Driver:{
		value:Url + '/api/taxi/SetoutExpressOrder_Driver',
		name:'司机端-出租车-长按发车',
		method:'POST',
		page:[]
	},
	GetExpressOrderCountByDriverID_Driver:{
		value:Url + '/api/taxi/GetExpressOrderCountByDriverID_Driver',
		name:'司机端-出租车-统计接单量',
		method:'POST',
		page:[]
	}
}

export default {
	InterfaceAddress,
	Interface,
	delayTime
}
