import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index'
// console.log(router)
import VueSocketio from 'vue-socket.io'
import state from './state'
Vue.use(Vuex)

const store = new Vuex.Store({
	state,
	getters: {
		getCandidateByName: (state) => (name) => {
			return state.candidates.find(p => p.name == name) || null
		},
		getVoteNumByName: (state) => (name) => {
			const candidate = state.candidates.find(p => p.name == name) || []
			return candidate.voters.length
		}
	},
	mutations: {
		SOCKET_CONNECT: (state, status) => {
			state.connect = true
			console.log('socket connect built')
		},
		SOCKET_VOTED: (state, {candidate, voter}) => {
			console.log('voted')
			const record = state.candidates.find(p => p.name == candidate)
			record && record.voters.push(voter)
		},
		SOCKET_VOTE_BEGIN: () => {
			console.log('vote_begin')
			router.push('/vote/during')
		}
	},
	actions: {
		otherAction: (context, type) => {
			return true
		},
		socket_userMessage: (context, message) => {
			console.log('action', message)
			context.dispatch('newMessage', message)
			context.commit('NEW_MESSAGE_RECEIVED', message)
			if (message.is_important) {
				context.dispatch('alertImportantMessage', message)
			}
		}
	}
})

Vue.use(VueSocketio, 'http://localhost:3000', store)
export default store
