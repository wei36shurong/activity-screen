<template>
<div class="vote">
	<vote-before v-if="localVote.status == 0" 
	:group-index="groupIndex"></vote-before>
	<vote-during v-if="localVote.status == 1"
	:group-index="groupIndex"></vote-during>
	<vote-during v-if="localVote.status == 2"
	:group-index="groupIndex"></vote-during>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import VoteBefore from '@/components/VoteBefore'
import VoteDuring from '@/components/VoteDuring'
export default {
	name: 'Vote',
	components: {VoteBefore, VoteDuring},
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
	}
}
</script>

<style lang="less">
@import '../styles/base';
</style>
