<template>
<div class="vote">
	<vote-before v-if="localVote.status == 0" 
	:group-index="groupIndex"></vote-before>
	<vote-during v-if="localVote.status == 1"
	:group-index="groupIndex"></vote-during>
	<vote-end v-if="localVote.status == 2"
	:group-index="groupIndex"></vote-end>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import VoteBefore from '@/components/VoteBefore'
import VoteDuring from '@/components/VoteDuring'
import VoteEnd from '@/components/VoteEnd'
export default {
	name: 'Vote',
	components: {VoteBefore, VoteDuring, VoteEnd},
	computed: {
		...mapState('activity', ['votes']),
		...mapGetters('activity', [ 'voteStatus' ]),
		localVote () {
			return this.votes[this.groupIndex]
		}
	},
	props: ['groupIndex'],
	watch: {
		async groupIndex() {
			await this.$store.dispatch('activity/getVotes')
		}
	},
	async created () {
		await this.$store.dispatch('activity/getActivity')
	}
}
</script>

<style lang="less">
@import '../styles/base';
@import '../styles/variables';
@import '../styles/extends';
// TODO 更好的更换背景图的方式
.vote {
	&:extend(.cover-background);
	background-image:url(@vote-img) !important;
	height: 100%;
	width: 100%;
}
.vote .blurred-bg {
	background-image:url(@vote-img-blurred) !important;
}
</style>
