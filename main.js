import Vue from 'vue'
import App from './App'
import store from './common/login.js' //登录
import taxi from './common/Czc.js'    //司机端出租车
import CzcPrivate from './common/CzcPrivate.js'    //司机端出租车
import home from './common/Home.js'    //司机端全局
import order from './common/Order.js'    //司机端全局
Vue.config.productionTip = false
Vue.prototype.$store=store;  //登录
Vue.prototype.$taxi=taxi;  //出租车
Vue.prototype.$CzcPrivate=CzcPrivate;  //专线车
Vue.prototype.$home=home;  //全局
Vue.prototype.$order=order;  //全局

App.mpType = 'app'

const app = new Vue({ 
	taxi,	//司机端出租车配置及全局方法
	store,	//登录
	home,
	order,
    ...App
})
app.$mount()
