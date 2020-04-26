//司机端全局参数定义
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//接口域名
const Url = 'http://111.231.109.113:8002';

//接口对象
const Interface = {
	
	addVehiclePosition : {
		value: Url + '/api/zhcx/addVehiclePosition',
		name:'司机端定时实时上报位置',
		method:'GET',//GET-POST
		pages:[]
	},
	DriverVehicleBinding_Check:{
		value:Url + '/api/person/DriverVehicleBinding_Check',
		name:'司机端-全局-上班',
		method:'POST',
		pages:[]
	},
	GooffWork_Driver:{
		value:Url + '/api/person/GooffWork_Driver',
		name:'司机端-全局-下班',
		method:'POST',
		pages:[]
	},
	addDriverOneTouchAlarm:{
		value:Url + '/api/taxi/addDriverOneTouchAlarm',
		name:'司机端-出租车-一键报警',
		method:'POST',
		page:[]
	}
}

const dateFormat = {
	dateformat : 'Y-m-d H:i:s'
}

const EARTH_RADIUS = 6378137;

function mathLonLatToDistance(startLon,startLat,endLon,endLat){
	var radStartLon = Rad(startLon);
	var radStartLat = Rad(startLat);
	var radEndLon = Rad(endLon);
	var radEndLat = Rad(endLat);
	var a = radStartLat - radEndLat;
	var b = radEndLon - radEndLat; 
	return  2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radStartLat) * Math.cos(radEndLat) * Math.pow(Math.sin(b / 2), 2))) * EARTH_RADIUS;
}
function Rad(lonLat){
	return lonLat * Math.PI / 180
}



// 接口声明区
export default {
	Interface,
	dateFormat
	
}