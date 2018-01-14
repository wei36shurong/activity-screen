<template>
<div class='container'>
	<glass>
		<span slot='header'>签到进场</span>
		<img style='height:200px;width:200px;' src='../assets/qrcode.png'></img>
		<p style='font-size:24px;'> 微信扫一扫签到 </p>
	</glass>
	<glass>
		<span slot='header-left'>抽奖</span>
		<span slot='header-right'>109人参与</span>
		<avatar class='lg'
		:src='newUser.info.avatarUrl' 
		:name='newUser.info.nickName' 
		></avatar>
		<honeycomb class='row-12' :colWidth='40'>
			<div v-for='(user, index) in users'>
				<avatar class='sm'
				:src='user.info.avatarUrl' 
				></avatar>
			</div>
		</honeycomb>
	</glass>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Glass from '@/components/Glass'
import Avatar from '@/components/Avatar'
import qrcode from '@/assets/qrcode.png'
import avatarImg from '@/assets/avatar.png'
import Honeycomb from '@/components/Honeycomb'

export default {
	name: 'CheckIn',
	components: {Glass, Avatar, Honeycomb},
	data () {
		return {
			qrcode,
			avatarImg
		}
	},
	computed: {
		...mapState('activity', [ 'users' ]),
		newUser () {
			const emptyUser = {
				info: { avatarUrl: '', nickName: '' }
			}
			return this.users[0] || emptyUser
		}
	},
	async created () {
		await this.$store.dispatch('activity/getActivity')
		await this.$store.dispatch('activity/getUsers')
	}
}
</script>

<style lang='less'>
@import '../styles/base';
.container {
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-column-gap: 10px;
}
</style>
