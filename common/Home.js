//司机端全局参数定义

//接口域名
const Url = 'http://111.231.109.113:8002';

//接口对象
const Interface = {
	
	addVehiclePosition : {
		value: Url + '/api/zhcx/addVehiclePosition',
		name:'司机端定时实时上报',
		pages:[]
	},
}

const dateFormat = {
	dateformat : 'Y-m-d H:i:s'
}

// 接口声明区
export default {
	Interface,
	dateFormat
}