/* 接口参数区 */
// 示例

//接口域名
const Url = 'https://zntc.145u.net:9099';
const Url1 = 'https://zntc.145u.net:9099';//此字段无用
const Interface={
	Register_Driver:{
		value:Url+'/api/person/Register_Driver',
		name:'用户注册',
		method:'POST',
		pages: [],
	},
	LoginByPassWord_Driver:{
		value:Url+'/api/person/LoginByPassWord_Driver',
		name:'手机号＋密码登录',
		method:'POST',
		pages: [],
	},
	GetDetailInfo_Driver:{
		value:Url+'/api/person/GetDetailInfo_Driver',
		name:'通过手机号去获取司机详细信息(包含照片) ',
		method:'POST',
		pages: [],
	},
	getLoginCode:{
		value:Url+'/api/person/getLoginCode',
		name:'获取手机验证码',
		method:'POST',
		pages: [],
	},
	SearchVersion:{
		value:Url+'/api/person/SearchVersion',
		name:'获取版本号',
		method:'POST',
		pages: [],
	}, 
	
	complaintText:{
		value:Url+'/api/person/UpdateComplaint_BeComplainant',
		name:'提交',
		method:'POST',
		pages: ['pages/grzx/gz_complaintText'],
	}, 
	
	complaintList:{
		value:Url+'/api/person/SearchComplaint_BeComplainant',
		name:'投诉列表内容',
		method:'POST',
		pages: ['pages/grzx/gz_complaintList'],
	}, 
	SearchCustomerService:{
		value:Url+'/api/person/SearchCustomerService',
		name:'获取QQ客服或电话客服',
		method:'POST',
		pages: ['pages/grzx/gz_complaintList'],
	}
}


// 接口声明区
export default {
	Interface,
}
