<template>
<div class="vote">
	<vote-before 
	v-if="voteStatus(groupIndex) == 0" 
	:group-index="groupIndex"></vote-before>
	<vote-during 
	v-if="voteStatus(groupIndex) == 1"
	:group-index="groupIndex"></vote-during>
	<vote-during 
	v-if="voteStatus(groupIndex) == 2"
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
		...mapGetters('activity', [ 'voteStatus' ])
	},
	props: ['groupIndex'],
	data () {
		return {
		}
	},
	async created () {
		await this.$store.dispatch('activity/getActivity')
	}
}
</script>

<style lang="less">
@import '../styles/base';
</style>
