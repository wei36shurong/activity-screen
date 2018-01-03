<template>
<glass>
	<span slot="header-left">A组选手投票</span>
	<span slot="header-right">580/600已投票</span>
	<div class="main">
		<!-- <div class="row">
			<div class="row-inner">
				<avatar class="lg" :src="avatarImg" name="hello"></avatar>
				<div class="bar-container">
					<bar :value="300" :max="600"></bar>
				</div>
			</div>
		</div> -->
		<div class="row" v-for="candidate in candidates">
			<div class="row-inner">
				<avatar class="lg" :src="avatarImg" :name="candidate.name"></avatar>
				<div class="bar-container">
					<bar :value="getVoteNumByName(candidate.name)" :max="totalVotes"></bar>
				</div>
			</div>
		</div>
	</div>
</glass>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Glass from '@/components/Glass'
import Avatar from '@/components/Avatar'
import avatarImg from '@/assets/avatar.png'
import Bar from '@/components/Bar'
export default {
	name: 'VoteDuring',
	components: {Glass, Avatar, Bar},
	computed: {
		...mapState([ 'candidates', 'totalVotes' ]),
		...mapGetters([ 'getVoteNumByName' ])
	},
	data () {
		return {
			avatarImg
		}
	}
}
</script>

<style lang="less" scoped>
.main {
	display: grid;
	height: 100%;
}
.row {
	display: flex;
	align-items: center;
	.row-inner {
		flex: 1;
		display: flex;
		align-items: center;
		& > .bar-container {
			flex: 1;
			display: flex;
			height: 60px;
			align-items: center;
			margin-left: 50px;
		}
	}
}
</style>
