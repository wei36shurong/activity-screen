<style lang='less' scoped>
@import '../styles/base';
@import '../styles/extends';
.container {
	margin-top: 238px;
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
h3 {
	color: #fff4d4;
	margin-top: 50px;
	margin-bottom: 25px;
}
.check-in {
	display: grid;
	grid-template-columns: 380px 1080px;
	// grid-auto-rows: 550px;
	grid-template-rows: 550px;
	grid-column-gap: 20px;
	.wrapper {
		position: relative;
		.panel {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}
}
.panel.side /deep/ .content { background-color: #ff780099; }
.panel.main /deep/ .content { background-color: #c5000bc0; }

@thick-text-color: #ffd797;
.main /deep/ .name {
	color: @thick-text-color;
}
</style>

<template>
<div class="container">
	<div class="check-in">
		<div class="wrapper">
			<panel class="side ">
				<img style='height:200px;width:200px;margin-top:140px;' src='../assets/qrcode.png'></img>
				<p style='font-size:22px;color:#fff4d4;margin-top:40px;'> 微信扫一扫签到 </p>
			</panel>
		</div>
		<div class="wrapper">
			<panel class="main" :bg="mainBg">
			<!-- <panel class="main" style="background-image:url(../assets/check-in-main-panel-bg.png)"> -->
				<h3 @click="checkIn">热烈欢迎</h3>
				<avatar class='lg'
				:src='newUser.info.avatarUrl' 
				:name='newUser.info.nickName' 
				></avatar>
				<p style="margin-top:20px;font-size:20px;color:#ffc107;">
					已有<span style="color:#ffd797;">{{users.length}}</span>人签到入场
				</p>
				<honeycomb-scroller style="margin-top:15px;" 
				:row="3" 
				:colWidth='40' 
				:users="users" />
			</panel>
		</div>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Panel from '@/components/Panel'
import Avatar from '@/components/Avatar'
import qrcode from '@/assets/qrcode.png'
import mainBg from '@/assets/check-in-main-panel-bg.png'
import avatarImg from '@/assets/avatar.png'
import Honeycomb from '@/components/Honeycomb'
import HoneycombScroller from '@/components/HoneycombScroller'
import userState from '@/store/user-state-example'

export default {
	name: 'CheckIn',
	components: {Panel, Avatar, Honeycomb, HoneycombScroller},
	data () {
		return {
			qrcode,
			avatarImg,
			mainBg
		}
	},
	computed: {
		...mapState('activity', ['users', 'newUser'])
		// ...mapState([ 'newUser' ])
		// newUser () {
		// 	const emptyUser = { info: { avatarUrl: '', nickName: '' } }
		// 	return this.users[0] || emptyUser
		// }
	},
	async created () {
		await this.$store.dispatch('activity/getActivity')
	},
	methods: {
		checkIn () {
			console.log('check in')
			this.$store.commit('activity/ADD_USER', userState)
		}
	}
}
</script>
