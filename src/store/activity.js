import state from './activity-state'
import types from './mutation-types'
import rootState from './state'
import Vue from 'vue'
import VueResource from 'vue-resource'
import {to} from '../utils'

Vue.use(VueResource)
const activitiesResource = Vue.resource('activities{/id}')

export default {
	namespaced: true,
	state,
	getters: {
		prizeWinners: state => state.draws.map(item => item.winners)
	},
	mutations: {
		[types.ADD_WINNER] (state, {level, user}) {
			state.draws[level].winners.push(user)
		},
		[types.LOAD_ACTIVITY] (state, activity) {
			state.activity = activity
		}
	},
	actions: {
		getActivity: ({commit}) => {
			return new Promise(async (resolve, reject) => {
				const id = rootState.activityId
				const [err, {body: activity}] = await to(activitiesResource.get({id}))
				if (err) return
				commit(types.LOAD_ACTIVITY, activity)
				resolve()
			})
		}
	}
}
