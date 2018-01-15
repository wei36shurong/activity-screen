import state from './activity-state'
import Vue from 'vue'
import VueResource from 'vue-resource'
// import types from './mutation-types'
import {to} from '../utils'

Vue.use(VueResource)
const activitiesResource = Vue.resource('activities{/id}')
const activityUsersResource = Vue.resource('activities{/id}/users')
const activityVotesResource = Vue.resource('activities{/id}/votes')

export default {
	namespaced: true,
	state,
	getters: {
		voteStatus: state => groupIndex => {
			const length = state.votes.length
			groupIndex = groupIndex >= length ? length - 1 : groupIndex
			return state.votes[groupIndex].status
		},
		voteNum: state => (groupIndex, candidateIndex) => {
			const option = state.votes[groupIndex].options[candidateIndex]
			const length = option.voters ? option.voters.length : 0
			const votersCount = option.voters_count
			return votersCount || length + option.bonus
		},
		candidates: state => groupIndex => state.votes[groupIndex].options,
		userNum: state => state.users.length,
		prizeWinners: state => state.draws.map(item => item.winners)
	},
	mutations: {
		LOAD_VOTES (state, votes) {
			state.votes = votes
		},
		LOAD_USERS (state, users) {
			state.users = users
		},
		ADD_USER (state, user) {
			state.users.unshift(user)
			state.newUser = {...user}
		},
		ADD_WINNER (state, {level, user}) {
			state.draws[level].winners.push(user)
		},
		ADD_VOTER (state, {vote_index, option_index, voters_count}) {
			Vue.set(state.votes[vote_index].options[option_index], 'voters_count', voters_count)
		},
		SET_VOTE_STATUS (state, {vote_index, status}) {
			Vue.set(state.votes[vote_index], 'status', status)
		}
	},
	actions: {
		getVotes: ({commit, state}) => {
			return new Promise(async (resolve, reject) => {
				const id = state._id
				const {body: votes} = await activityVotesResource.get({id})
				commit('LOAD_VOTES', votes)
				resolve()
			})
		},
		getUsers: ({commit, state}) => {
			return new Promise(async (resolve, reject) => {
				const id = state._id
				const [err, {body: users}] = await to(activityUsersResource.get({id}))
				if (err) return
				commit('LOAD_USERS', users)
				resolve()
			})
		},
		getActivity: ({dispatch, commit, state}) => {
			return new Promise(async (resolve, reject) => {
				const id = state._id
				const {body: activity} = await activitiesResource.get({id})
				commit('LOAD_ACTIVITY', activity, { root: true })
				// await dispatch('getUsers')
				resolve()
			})
		}
	}
}
