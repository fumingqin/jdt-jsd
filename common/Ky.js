//定制班车接口
const Url = 'https://zntc.145u.net:9099';
//接口对象
const Interface = {
	GetCoachIDByVheicleNumberDriverPhone : {
		value: Url + '/api/Customized/GetCoachIDByVheicleNumberDriverPhone',
		name: '司机端-定制班车-获取司机coachid',
		method: 'POST', //GET-POST
		pages: []
	},
	GetRunScheduleInfoByVheicleNumberDriverPhone : {
		value: Url + '/api/Customized/GetRunScheduleInfoByVheicleNumberDriverPhone',
		name: '司机端-定制班车-获取车辆班次信息',
		method: 'POST', //GET-POST
		pages: []
	},
	CheckTicket_ByTicketID : {
		value: Url + '/api/Customized/CheckTicket_ByTicketID',
		name: '司机端-定制班车-检票',
		method: 'POST', //GET-POST
		pages: []
	}
}

export default {
	Interface,
}