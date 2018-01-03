<template>
<div class="bar">
	<div class="bar-outter">
		<div class="bar-inner" 
		:style="{
			width: `${radio}%`,
			backgroundColor: `${color}` 
			}"
		>
		</div>
	</div>
	<div class="number">{{value}}</div>
</div>
</template>

<script>
export default {
	name: 'Bar',
	props: {
		value: Number,
		max: Number,
		color: {
			type: String,
			default: 'orange'
		}
	},
	computed: {
		radio() {
			return (this.value / this.max) * 100
		}
	}
}
</script>

<style lang="less" scoped>
@import '../styles/variables';
@height: 25px;

.bar {
	width: 100%;
	display: flex;
	align-items: center;
	.bar-outter {
		position: relative;
		flex: 1;
		height: @height;
		background-color: @glass-color;
		.bar-inner {
			position: absolute;
			height: @height;
		}
	}
	.number {
		padding-left: 26px;
	}
}
</style>
