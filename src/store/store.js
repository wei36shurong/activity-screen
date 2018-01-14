import Vue from 'vue'
import Vuex from 'vuex'
import VueSocketio from 'vue-socket.io'
import state from './state'
import VueResource from 'vue-resource'
import router from '@/router/index'
import {to} from '../utils'
// import types from './mutation-types'
import activity from './activity'

Vue.use(VueResource)
// Vue.http.options.root = 'http://118.25.21.169:3000'
Vue.http.options.root = 'https://activity.toyourcity.com'

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
		LOAD_USERS (state, users) {
			this.state.users = users
		},
		LOAD_ACTIVITY (state, activity) {
			state.activity = activity
		},
		// emitted by socket
		SOCKET_CONNECT (state, status) {
			console.log('socket connect built')
			state.connect = true
		},
		SOCKET_ROUTER (state, {path}) {
			console.log('socket router:', path)
			router.push(path)
		},
		SOCKET_VOTED (state, {candidate, voter}) {
			const record = state.candidates.find(p => p.name == candidate)
			record && record.voters.push(voter)
		}
	},
	actions: {
		getAllUsers: ({commit}) => {
			return new Promise(async (resolve, reject) => {
				const [err, {body: users}] = await to(usersResource.get())
				if (err) return
				commit('LOAD_USERS', users)
				resolve()
			})
		},
		// emitted by socket
		socket_mutation ({commit}, {mutation, payload}) {
			commit(mutation, payload)
		}
	}
})

// https
// Vue.use(VueSocketio, 'https://activity.toyourcity.com', store)
// Vue.use(VueSocketio, 'http://localhost:3000', store)
// 用这个的话要用http访问
Vue.use(VueSocketio, 'http://118.25.21.169:3000', store)
export default store
