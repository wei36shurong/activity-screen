/* 致后来读到这些代码的人：
	如果你发现这里有一些代码写得很烂，
	那不意味着我是一个糟糕的码农，
	实在是给我耕地的时间不多。
	你真诚的 魏澍榕 */

/* To Who reading these codes:
	if you find some of these codes sucks.
	it's not because I'm a bad coder.
	it's just I did not have enough time.
	Your sincerely, Shurong Wei */

import Vue from 'vue'
import Router from 'vue-router'

import Activity from '@/components/Activity'
import CheckIn from '@/components/CheckIn'
import Vote from '@/components/Vote'
import Lottery from '@/components/Lottery'

Vue.use(Router)

export default new Router({
	routes: [{
		props: true,
		path: '/:activityId',
		component: Activity,
		children: [
			{
				path: '/', redirect: 'check-in'
			}, {
				path: 'check-in',
				component: CheckIn
			}, {
				path: 'votes/:groupIndex',
				component: Vote,
				props: true
			}, {
				path: 'votes', redirect: '/votes/0'
			}, {
				path: 'lottery/:groupIndex',
				component: Lottery,
				props: true
			}
		]
	}]
})
