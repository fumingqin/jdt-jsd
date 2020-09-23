//接口域名
const Url = 'http://36.250.234.10:60032';
const method = 'POST'
//接口对象
const Interface = {
	
	GetOrderByDriverID:{
		Url    :Url + '/api/SendCar/GetOrderByDriverID',
		method :method,
		name   :'根据司机ID获取接客订单'
	},
	GetOrderByAID:{
		Url    :Url + '/api/SendCar/GetOrderByAID',
		method :method,
		name   :'根据订单ID获取订单'
	},
	GetOrderByOrderID:{
		Url    :Url + '/api/SendCar/GetOrderByOrderID',
		method :method,
		name   :'根据订单ID获取任务单'
	},
	ConfirmBoard:{
		Url    :Url + '/api/SendCar/ConfirmBoard',
		method :method,
		name   :'根据任务单AID确认乘客上车'
	},
}


// 接口声明区
export default {
	Interface
}