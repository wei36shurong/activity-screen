<template>
<div class="glass">
	<div class="box tinted">
		<div class="header blurred-bg" v-if="hasHeader">
			<span class="header-left"><slot name="header-left"></slot></span>
			<span class="header-right"><slot name="header-right"></slot></span>
			<slot name="header"></slot>
		</div>
		<div class="content blurred-bg shaded" 
		:class="{'without-header': !hasHeader}"
		:style="{padding: `${padding}`}"
		>
			<slot></slot>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'Glass',
	props: {
		bg: String,
		padding: String
	},
	data () {
		return {
			hasHeader: true
		}
	},
	mounted () {
		const hasHeader = this.$slots.header
		const hasHeaderLeft = this.$slots['header-left']
		const hasHeaderRight = this.$slots['header-right']
		this.hasHeader = hasHeader || hasHeaderLeft || hasHeaderRight
	}
}
</script>

<style lang="less" scoped>
@import '../styles/variables';
@import '../styles/extends';

@radius: 25px;
.glass, .box {
	width:100%;
	height:100%;
}
.box {
	display: flex;
	flex-direction: column;
	& > .content {
		flex: 1;
		overflow: scroll;
	}
}
.box {
	color: white;
	text-align: center;
	box-sizing:border-box;
	text-shadow:0px 0px 20px black;
	transition: box-shadow .3s ease;
	&:active{
		cursor:move;
		box-shadow:0 20px 50px rgba(0,0,0,.9);
	}
}
.content {
	padding: 22.5px;
	border-bottom-left-radius: @radius;
	border-bottom-right-radius: @radius;
	&.without-header {
		border-top-left-radius: @radius;
		border-top-right-radius: @radius;
	}
}
.header {
	border-top-left-radius: @radius;
	border-top-right-radius: @radius;
	padding:17.5px 22.5px;
	overflow:hidden;
}
.header-left { float: left; }
.header-right { float: right; }
</style>
