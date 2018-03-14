import Vue from 'vue'
import Router from 'vue-router'

import Activity from '@/components/Activity'
import CheckIn from '@/components/CheckIn'
import Vote from '@/components/Vote'
import Lottery from '@/components/Lottery'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		redirect: 'activities/5aa69a7d430eb81bfe578b7f/check-in'
	}, {
		props: true,
		path: '/activities/:activityId',
		component: Activity,
		children: [{
			path: '/',
			redirect: 'check-in'
		}, {
			path: 'check-in',
			component: CheckIn
		}, {
			path: 'votes/:groupIndex',
			component: Vote,
			props: true
		}, {
			path: 'votes', redirect: 'votes/0'
		}, {
			name: 'lottery',
			path: 'lottery/:currentPrize?',
			component: Lottery,
			props: true
		}]
	}]
})
