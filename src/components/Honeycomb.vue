<template>
<div class="honeycomb" :style="{gridAutoColumns: `${colWidth/2}px`}">
	<slot></slot>
</div>
</template>

<script>
export default {
	name: 'Honeycomb',
	props: {
		colWidth: {
			// colWidth = avtar width + col gap
			type: Number,
			default: 40
		}
	}
}
</script>

<style lang="less" scoped>
@import '../styles/variables';

.offset-row {
	grid-column: span 3;
	position: relative;
	left: 12.5px;
}
.create-offset-odd-rows(@n, @row: 3) when (@row =< @n) {
	.create-offset-odd-rows(@n, @row + 1);
	.create-offset-odd-rows-once-for-one-row-type(@row);
}

// 偶数行突出的话@row: 1开始
.create-offset-odd-rows-once-for-one-row-type(@n, @row: 2) when (@row =< @n) {
	.create-offset-odd-rows-once-for-one-row-type(@n, @row + 2);
	.honeycomb.row-@{n} > div:nth-child(@{row}) {
		&:extend(.offset-row);
	}
}

.create-grid-templates-rows(@n, @row: 1) when (@row =< @n) {
	.create-grid-templates-rows(@n, (@row + 1));
	.honeycomb.row-@{row} {
		.create-grid-template-rows(@row);
	}
}
.create-grid-template-rows(@rows) {
	grid-template-rows: repeat(@rows, 50px); // row height
}

.create-grid-templates-rows(12);
.create-offset-odd-rows(12);
.honeycomb {
	display: grid;
	grid-row-gap: 15px;
	grid-auto-flow: column;
	& > div { grid-column-end: span 2; }
}
.honeycomb {
	padding: 25px;
}
// TODO auto resizing according to avatar size
</style>
