import Vue from 'vue'
import Router from 'vue-router'

import CheckIn from '@/components/CheckIn'
import Vote from '@/components/Vote'
import Lottery from '@/components/Lottery'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/check-in',
			component: CheckIn
		}, {
			path: '/votes/:groupIndex',
			component: Vote,
			props: true
		}, {
			path: '/votes', redirect: '/votes/0'
		}, {
			path: '/lottery',
			component: Lottery
		}
	]
})
