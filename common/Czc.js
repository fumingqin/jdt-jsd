/* 接口参数区 */
// 示例

const GaoDeWebKey = [
	"2348ba1d476b5e44917533b65583f969", 
	"1df2cef2c0e71acc0ed1e90d5bf6431a"
]

//接口域名
const Url = 'http://111.231.109.113:8002';

const InterfaceAddress = [
	//根据起终点经纬度获取线路规划
	//使用页面 - /CZC/CallAndDrive - 
	'http://111.231.109.113:8002/api/zhcx/getPlanningLineByLonLat' ,
	//获取所有车辆定位数据
	'http://111.231.109.113:8002/api/zhcx/getAllVehiclePosition',
	//根据经纬度获取附近一定范围的经纬度
	'http://111.231.109.113:8002/api/zhcx/getLonLatRangeVehiclePosition',
]
const delayTime = {
	getOrderDelay : {
		name:'司机端-出租车-可接订单',
		interface:'GetCanReceiptExpressOrder_Driver',
		page:[
			'/driver/taxiDriver'
		], 
		time:5000 
	}
}
	



//接口对象
const Interface = {
	GetCanReceiptExpressOrder_Driver : {
		value: Url + '/api/taxi/GetCanReceiptExpressOrder_Driver',
		name:'司机端-出租车-获取可接订单',
		method:'POST',//GET-POST
		pages:[]
	},
	ReceiptExpressOrder_Driver : {
		value: Url + '/api/taxi/ReceiptExpressOrder_Driver',
		name:'司机端-出租车-接单',
		method:'POST',//GET-POST
		pages:[]
	},
	CancelExpressOrderByOrderNum_Driver : {
		value: Url + '/api/taxi/CancelExpressOrderByOrderNum_Driver',
		name:'司机端-出租车-取消订单',
		method:'POST',//GET-POST
		pages:[]
	},
	RefuseExpressOrderByOrderNumDriverID_Driver : {
		value: Url + '/api/taxi/RefuseExpressOrderByOrderNumDriverID_Driver',
		name:'司机端-出租车-拒接订单',
		method:'POST',//GET-POST
		pages:[]
	},
	SearchExpressOrderByOrderNum_Driver:{
		value:Url + '/api/taxi/SearchExpressOrderByOrderNum_Passenger',
		name:'旅客端-等车时候根据订单号查询出租车快车订单',
		method:'POST',
		page:[""]
	},
}

// 接口声明区
export default {
	GaoDeWebKey,
	InterfaceAddress,
	Interface,
	delayTime
}