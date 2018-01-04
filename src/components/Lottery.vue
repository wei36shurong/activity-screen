<template>
<div class="container">
	<div>
		<glass>
			<span slot="header">中奖名单</span>
			<div class="side">
				<h4>特等奖：iPhone X</h4>
				<div class="grid">
					<avatar 
					v-for="winner in prizeWinners.grandPrize" 
					:src="avatarImg" 
					:name="winner.name"
					></avatar>
				</div>
				<h4>一等奖：iPhone 8</h4>
				<div class="grid">
					<avatar 
					v-for="winner in prizeWinners.firstPrize" 
					:src="avatarImg" 
					:name="winner.name"
					></avatar>
				</div>
				<h4>二等奖：iPhone 7</h4>
				<div class="grid">
					<avatar 
					v-for="winner in prizeWinners.secondPrize" 
					:src="avatarImg" 
					:name="winner.name"
					></avatar>
				</div>
				<h4>三等奖：iPad</h4>
				<div class="grid">
					<avatar 
					v-for="winner in prizeWinners.thirdPrize" 
					:src="avatarImg" 
					:name="winner.name"
					></avatar>
				</div>
			</div>
		</glass>
	</div>
	<div>
		<glass>
			<span slot="header-left">投票</span>
			<span slot="header-right">109人参与</span>
			<div class="main">
				<div class="top">
					<h3> 一等奖获得者 </h3>
					<avatar :src="avatarImg" name="天尧妈妈" class="lg"></avatar>
				</div>
				<div class="y-scroller">
					<honeycomb class="row-9">
						<div v-for="(user, index) in users">
							<avatar class="sm"
							:src="avatarImg" 
							></avatar>
						</div>
					</honeycomb>
				</div>
			</div>
		</glass>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Glass from '@/components/Glass'
import Avatar from '@/components/Avatar'
import Honeycomb from '@/components/Honeycomb'
import qrcode from '@/assets/qrcode.png'
import avatarImg from '@/assets/avatar.png'
export default {
	name: 'Lottery',
	components: {Glass, Avatar, Honeycomb},
	computed: {
		...mapState([ 'prizeWinners', 'users' ])
	},
	data () {
		return {
			qrcode,
			avatarImg
		}
	}
}
</script>

<style lang="less" scoped>
.container {
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-template-rows: 1fr;
	grid-column-gap: 10px;
	height: 100%;
	width: 100%;
	& > div {
		position: relative;
		& > .glass {
			position: absolute;
			top:0;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}
}
.side {
	h4 {
		text-align: left;
		margin-bottom: 14px;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(5,1fr);
		grid-column-gap: 35px;
		grid-row-gap: 10px;
		grid-auto-rows: minmax(auto, 100%);
		margin-bottom: 17px;
	}
}
.main {
	.top {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 25px;
		.avatar {
			margin-top: 30px;
		}
	}
	.y-scroller {
		overflow-x: scroll;
		overflow-y: hidden;
		margin: 0 -22.5px;
		padding: 0 22.5px;
	}
}
</style>
