<template>
<glass>
	<span slot="header-left">{{voteGroup.title}}</span>
	<span slot="header-right">0/{{userNum}}已投票</span>
	<div class="main">
		<div class="row" v-for="(candidate, candidateIndex) in localCandidates">
			<div class="row-inner">
				<avatar class="lg" :src="candidate.image_url" :name="candidate.title"></avatar>
				<div class="bar-container">
					<bar :value="voteNums[candidateIndex]" :max="userNum + candidate.bonus"></bar>
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
		...mapState('activity', ['votes']),
		...mapGetters('activity', [ 'candidates', 'userNum', 'voteNum' ]),
		voteNums () {
			return [
				this.voteNum(this.groupIndex, 0),
				this.voteNum(this.groupIndex, 1)
			]
		},
		voteGroup () {
			return this.votes[this.localGroupIndex]
		},
		localCandidates () {
			return this.candidates(this.localGroupIndex)
		},
		localGroupIndex () {
			const length = this.votes.length
			return this.groupIndex >= length ? length - 1 : this.groupIndex
		}
	},
	props: ['groupIndex'],
	data () {
		return {
			avatarImg
		}
	},
	methods: {
		switchGroup(groupIndex) {
			console.log(groupIndex)
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
