/* 接口参数区 */
// 示例

//接口域名
const Url = 'http://111.231.109.113:8004';

const InterfaceAddress = [
	//根据起终点经纬度获取线路规划
	//使用页面 - /CZC/CallAndDrive - 
	'http://111.231.109.113:8002/api/zhcx/getPlanningLineByLonLat',
	//获取所有车辆定位数据
	'http://111.231.109.113:8002/api/zhcx/getAllVehiclePosition',
	//根据经纬度获取附近一定范围的经纬度
	'http://111.231.109.113:8002/api/zhcx/getLonLatRangeVehiclePosition',
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
	GetCanReceiptSpecialLineOrder_Driver: {
		value: Url + '/api/SpecialLine/GetCanReceiptSpecialLineOrder_Driver',
		name: '司机端-专线车-获取可接订单',
		method: 'POST', //GET-POST
		pages: []
	},
	ReceiptSpecialLineOrder_Driver: {
		value: Url + '/api/SpecialLine/ReceiptSpecialLineOrder_Driver',
		name: '司机端-专线车-接单',
		method: 'POST', //GET-POST
		pages: []
	},
	CancelSpecialLineOrderByOrderNum_Driver: {
		value: Url + '/api/SpecialLine/CancelSpecialLineOrderByOrderNum_Driver',
		name: '司机端-专线车-取消订单',
		method: 'POST', //GET-POST
		pages: []
	},
	RefuseSpecialLineOrderByOrderNumDriverID_Driver: {
		value: Url + '/api/SpecialLine/RefuseSpecialLineOrderByOrderNumDriverID_Driver',
		name: '司机端-专线车-拒接订单',
		method: 'POST', //GET-POST
		pages: []
	},
	/* InputAmountExpressOrder_Driver: {
		value: Url + '/api/SpecialLine/InputAmountExpressOrder_Driver',
		name: '司机端-专线车-司机填入价格',
		method: 'POST', //GET-POST
		pages: []
	}, */
	GetSpecialLineOrderByOrderNumber_Driver:{
		value:Url + '/api/SpecialLine/GetSpecialLineOrderByOrderNumber_Driver',
		name:'司机端-专线车-根据司机Id和订单Id获取订单详情',
		method:'POST',
		page:["/dirver/confirmgetonCar"]
	},
	RunSpecialLineOrder_Driver:{
		value:Url + '/api/SpecialLine/RunSpecialLineOrder_Driver',
		name:'司机端-专线车-长按确认乘客上车',
		method:'POST',
		page:[""]
	},
	FinishSpecialLineOrder_Driver:{
		value:Url + '/api/SpecialLine/FinishSpecialLineOrder_Driver',
		name:'司机端-专线车-长按到达目的地',
		method:'POST',
		page:[""]
	},
	SetoutSpecialLineOrder_Driver:{
		value:Url + '/api/SpecialLine/SetoutSpecialLineOrder_Driver',
		name:'司机端-专线车-长按发车',
		method:'POST',
		page:[]
	},
	GetSpecialOrderCountByDriverID_Driver:{
		value:Url + '/api/SpecialLine/GetSpecialOrderCountByDriverID_Driver',
		name:'司机端-专线车-统计接单量',
		method:'POST',
		page:[]
	}
}

// 接口声明区
export default {
	InterfaceAddress,
	Interface,
	delayTime
}
