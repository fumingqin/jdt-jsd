import Vue from 'vue'
import App from './App'
import store from './common/login.js' //登录
import taxi from './common/Czc.js'    //司机端出租车
Vue.config.productionTip = false
Vue.prototype.$store=store;  //登录
Vue.prototype.$taxi=taxi;  //登录

App.mpType = 'app'

const app = new Vue({ 
	taxi,	//司机端出租车配置及全局方法
	store,	//登录
    ...App
})
app.$mount()
