import Vue from 'vue'
import App from './App'
import store from './common/login.js' //登录

Vue.config.productionTip = false
Vue.prototype.$store=store;  //登录

App.mpType = 'app'

const app = new Vue({
	store,	//登录
    ...App
})
app.$mount()
