import Vue from 'vue'
import Vuex from 'vuex'
import VueSocketio from 'vue-socket.io'
import state from './state'
import VueResource from 'vue-resource'
import router from '@/router/index'
import {to} from '../utils'
import types from './mutation-types'
import activity from './activity'

Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:3000'

const usersResource = Vue.resource('users{/id}')

Vue.use(Vuex)

const store = new Vuex.Store({
	state,
	modules: { activity },
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
		[types.LOAD_USERS] (state, users) {
			this.state.users = users
		},
		// emitted by socket
		SOCKET_CONNECT: (state, status) => {
			state.connect = true
			console.log('socket connect built')
		},
		SOCKET_ROUTER: (state, {path}) => {
			console.log('socket router:', path)
			router.push(path)
		},
		SOCKET_VOTED: (state, {candidate, voter}) => {
			console.log('voted')
			const record = state.candidates.find(p => p.name == candidate)
			record && record.voters.push(voter)
		}
	},
	actions: {
		getAllUsers: ({commit}) => {
			return new Promise(async (resolve, reject) => {
				const [err, {body: users}] = await to(usersResource.get())
				if (err) return
				commit(types.LOAD_USERS, users)
				resolve()
			})
		},
		// emitted by socket
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
