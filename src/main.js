// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueScroll from 'vue-scroll'
import App from './App'
import router from './router'
import store from '@/store/store'
import VueSocketio from 'vue-socket.io'
import config from '@/config'

console.log('config', config)
console.log('apiRoot', config.apiRoot)
Vue.use(VueSocketio, config.apiRoot, store)

Vue.use(VueScroll)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})
