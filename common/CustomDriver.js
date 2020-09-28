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
	ComPleteOrder:{
		Url    :Url + '/api/SendCar/ComPleteOrder',
		method :method,
		name   :'确认订单完成'
	},
	PullOut:{
		Url    :Url + '/api/SendCar/PullOut',
		method :method,
		name   :'发车'
	},
	SendMessageBoforeGet:{
		Url    :'https://appdl.xmjdt.cn:18443' + '/api/SendCar/SendMessageBoforeGet',
		method :'GET',
		name   :'司机拉起导航时发送短信告知乘客，司机即将前往接送'
	},
}


// 接口声明区
export default {
	Interface
}