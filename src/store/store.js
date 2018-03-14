import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import router from '@/router/index'
import {to} from '../utils'
import activity from './activity'
import userState from './user-state'
import VueResource from 'vue-resource'

Vue.use(VueResource)
// Vue.http.options.root = 'http://118.25.21.169:3000'
Vue.http.options.root = 'https://activity.toyourcity.com'

Vue.use(Vuex)

const usersResource = Vue.resource('users{/id}')
const store = new Vuex.Store({
	state,
	modules: { activity },
	mutations: {
		LOAD_USERS (state, users) {
			this.state.users = users
		},
		LOAD_ACTIVITY (state, activity) {
			activity.newUser = userState
			// 清空只有id的初始users
			activity.users = []
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

export default store
