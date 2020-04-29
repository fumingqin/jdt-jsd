/* 接口参数区 */
// 示例

//接口域名
const Url = 'http://111.231.109.113:8002';

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
}


// 接口声明区
export default {
	Interface,
}
