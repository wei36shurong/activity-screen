<template>
<div class="bar">
	<div class="bar-outter" :style="{height: `${height}px`}">
		<div class="bar-inner" 
		:style="{
			width: `${radio}%`,
			backgroundColor: `${color}` 
			}"
		>
		</div>
	</div>
	<div class="number" :style="numStyle">{{value}}{{unit}}</div>
</div>
</template>

<script>
// TODO 一次性加多分的动效
export default {
	name: 'Bar',
	props: {
		value: Number,
		unit: String,
		max: Number,
		numStyle: Object,
		color: {
			type: String,
			default: 'orange'
		},
		height: {
			default: 25,
			type: Number
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

.bar {
	width: 100%;
	display: flex;
	align-items: center;
	.bar-outter {
		position: relative;
		flex: 1;
		background-color: @glass-color;
		.bar-inner {
			position: absolute;
			height: 100%;
		}
	}
	.number {
		padding-left: 26px;
	}
}
</style>
