nfo
<style lang='less' scoped>
@import '../styles/base';
@import '../styles/extends';
.container {
	padding-top: 238px;
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.check-in {
	display: grid;
	grid-template-columns: 380px 1080px;
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
				<img style='height:200px;width:200px;margin-top:140px;' :src='config.qrCode_url'></img>
				<p style='font-size:22px;color:#fff4d4;margin-top:40px;'> 微信扫一扫签到 </p>
			</panel>
		</div>
		<div class="wrapper">
			<panel class="main" :bg="mainBg">
				<h3 style="margin-top:50px;margin-bottom:30px;" @click="checkIn">热烈欢迎</h3>
				<avatar class='lg'
				:src='newUser.info.avatarUrl' 
				:name="newUser.info.name || ''" 
				></avatar>
				<p style="margin-top:20px;font-size:20px;color:#ffc107;">
					已有<span style="color:#ffd797;">{{users.length}}</span>人签到入场
				</p>
				<honeycomb-scroller style="margin-top:15px;" 
				:row="3" 
				:newUser="newUser"
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
import mainBg from '@/assets/check-in-main-panel-bg.png'
import avatarImg from '@/assets/avatar.png'
import Honeycomb from '@/components/Honeycomb'
import HoneycombScroller from '@/components/HoneycombScroller'
import userState from '@/store/user-state-example'
import {getRandomInt} from '@/utils'

export default {
	name: 'CheckIn',
	components: {Panel, Avatar, Honeycomb, HoneycombScroller},
	data () {
		return {
			avatarImg,
			mainBg
		}
	},
	computed: {
		...mapState('activity', ['users', 'newUser', 'config'])
	},
	methods: {
		checkIn () {
			userState._id = getRandomInt(0, 1000)
			this.$store.commit('activity/ADD_USER', userState)
		}
	}
}
</script>
