<template>
<div class="activity">
	<router-view/>
</div>
</template>

<script>
export default {
	name: 'Activity',
	props: ['activityId'],
	async created () {
		await this.$store.dispatch('activity/getActivity', this.activityId)
	}
}
</script>
