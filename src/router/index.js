import Vue from 'vue'
import Router from 'vue-router'

import CheckIn from '@/components/CheckIn'
import Vote from '@/components/Vote'
import VoteBefore from '@/components/VoteBefore'
import VoteDuring from '@/components/VoteDuring'
import Lottery from '@/components/Lottery'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/check-in',
			component: CheckIn
		},
		{
			path: '/vote',
			component: Vote,
			children: [
				{ path: '', redirect: 'before' },
				{ path: 'before', component: VoteBefore },
				{ path: 'during', component: VoteDuring }
			]
		},
		{
			path: '/lottery',
			component: Lottery
		}
	]
})
