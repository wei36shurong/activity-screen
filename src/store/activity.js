import state from './activity-state'
import Vue from 'vue'
import VueResource from 'vue-resource'
// import types from './mutation-types'
import {to} from '../utils'

Vue.use(VueResource)
const activitiesResource = Vue.resource('activities{/id}')
const activityUsersResource = Vue.resource('activities{/id}/users')
const activityVotesResource = Vue.resource('activities{/id}/votes')
const activityWinnersResource = Vue.resource(`activities/${state._id}/draws{/level}/winners`)

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
			const voteNum = votersCount || (length + option.bonus)
			return voteNum
		},
		voteWinner: (state, getters) => groupIndex => {
			return state.votes[groupIndex].options.reduce((winner, option) => {
				const currentCount = (option.voters_count || option.voters.length) + option.bonus
				const winnerCount = (winner.voters_count || winner.voters.length) + winner.bonus
				return currentCount > winnerCount ? option : winner
			})
		},
		candidates: state => groupIndex => state.votes[groupIndex].options,
		userNum: state => state.users.length,
		prizeWinners: state => state.draws.map(item => item.winners)
	},
	mutations: {
		// this.commit 的会跑在记录里，socket的不行
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
		ADD_WINNER (state, {level, winner}) {
			state.draws[level].winners.push(winner)
		},
		ADD_VOTER (state, {vote_index, option_index, voters_count, bonus}) {
			console.log('bonus', bonus)
			Vue.set(state.votes[vote_index].options[option_index], 'voters_count', voters_count)
			Vue.set(state.votes[vote_index].options[option_index], 'bonus', bonus)
		},
		SET_VOTE_STATUS (state, {vote_index, status}) {
			Vue.set(state.votes[vote_index], 'status', status)
		}
	},
	actions: {
		addWinner: ({commit, state}, {level, winner}) => {
			return new Promise(async (resolve, reject) => {
				commit('ADD_WINNER', {level, winner})
				await activityWinnersResource.save({level}, {userId: winner._id})
				resolve()
			})
		},
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
				await dispatch('getUsers')
				resolve()
			})
		}
	}
}
