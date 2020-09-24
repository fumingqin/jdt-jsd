//接口域名
const Url = 'http://36.250.234.10:60032';
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
	GetOrderListByDriverID: {
		value: Url + '/api/SendCar/GetOrderListByDriverID',
		name: '司机端-接客司机-根据司机ID获取订单列表',
		method: 'POST', //GET-POST
		pages: []
	},

}

// 接口声明区
export default {
	Interface,
}