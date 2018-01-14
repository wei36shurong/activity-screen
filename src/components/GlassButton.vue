<template>
<button class="sm button glass-button blurred-bg">
	<slot></slot>
</button>
</template>

<script>
export default {
	name: 'GlassButton',
	props: {
	},
	data () {
		return {
		}
	}
}
</script>

<style lang="less" scoped>
@import '../styles/variables';
@import '../styles/extends';

.glass-button {
	box-sizing: border-box;
	color: white;
	border: 1px solid white;
}

</style>
