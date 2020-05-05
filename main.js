import Vue from 'vue'
import App from './App'
// import store from './common/login.js' //登录
import taxi from './common/Czc.js'    //司机端出租车
import CzcPrivate from './common/CzcPrivate.js'    //司机端出租车
import home from './common/Home.js'    //司机端全局
import order from './common/Order.js'    //司机端全局
import myTime from './common/myTime.js' //时间
import Ky from './common/Ky.js' //客运
import GrzxInter from './common/Grzx.js'    //司机端个人中心
import Bcsjd from 'common/Bcsjd.js' //包车司机端

Vue.config.productionTip = false
// Vue.prototype.$store=store;  //登录
Vue.prototype.$taxi=taxi;  //出租车
Vue.prototype.$CzcPrivate=CzcPrivate;  //专线车
Vue.prototype.$home=home;  //全局
Vue.prototype.$order=order;  //订单
Vue.prototype.$myTime=myTime;  //日期js
Vue.prototype.$Ky=Ky;  //客运
Vue.prototype.$Bcsjd=Bcsjd;  //个人中心
Vue.prototype.$GrzxInter=GrzxInter;  //个人中心


App.mpType = 'app'

const app = new Vue({ 
	taxi,	//司机端出租车配置及全局方法
	// store,	//登录
	home,
	order,
	GrzxInter,
	Bcsjd,
    ...App
	
})
app.$mount()
