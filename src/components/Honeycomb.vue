<template>
<div class="honeycomb" 
	:style="style"
	>
	<slot></slot>
</div>
</template>

<script>
export default {
	name: 'Honeycomb',
	props: {
		rows: {
			type: Number,
			defautl: 6
		}
	},
	data () {
		return {
			style: {
				gridTemplateRows: `repeat(${this.rows}, 30px)`
			}
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

.create-offset-odd-rows-once-for-one-row-type(@n, @row: 1) when (@row =< @n) {
	.create-offset-odd-rows-once-for-one-row-type(@n, @row + 2);
	.honeycomb.row-@{n} > div:nth-child(@{row}) {
		&:extend(.offset-row);
	}
}

.create-grid-template-rows(@rows) {
	grid-template-rows: repeat(@rows, 30px);
}
.create-grid-templates-rows(@n, @row: 1) when (@row =< @n) {
	.create-grid-templates-rows(@n, (@row + 1));
	.honeycomb.row-@{row} {
		.create-grid-template-rows(@row);
	}
}

.create-grid-templates-rows(12);
.create-offset-odd-rows(12);
.honeycomb {
	display: grid;
	grid-row-gap: 5px;
	grid-auto-flow: column;
	grid-auto-columns: 20px;
	& > div { grid-column-end: span 2; }
}
</style>
