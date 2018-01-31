<style lang="less" scoped>
.panel-winners .grid{
	display: grid;
	grid-template-rows: 46px;
	grid-row-gap: 12px;
	width: 100%;
	.row {
		display: flex;
		align-items: center;
		justify-items: center;
		.name {
			font-size: 20px;
			padding-left: 22px;
			flex: 1;
			text-align: left;
			vertical-align: middle;
		}
	}
}
.panel-winners /deep/ .content { background-color: #ff780099; }
</style>
<template>
<panel class="panel-winners">
	<h3 style="margin-bottom: 22px;">中奖名单</h3>
	<div class="grid">
		<div class="row" v-for="winner in winners" >
			<avatar 
			bgColor="#ff780099"
			:size="44"
			:key="winner._id"
			:src="winner.info.avatarUrl" 
			></avatar>
			<span class="name">{{winner.info.name}}</span>
		</div>
	</div>
</panel>
</template>

<script>
import Panel from '@/components/Panel'
import Avatar from '@/components/Avatar'
export default {
	components: { Panel, Avatar },
	name: 'PanelWinner',
	props: {
		winners: Array
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
.panel, .box {
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
	// text-shadow: 0px 0px 20px black;
	transition: box-shadow .3s ease;
	&:active{
		cursor:move;
		box-shadow:0 20px 50px rgba(0,0,0,.9);
	}
}
.content {
	border-bottom-left-radius: @radius;
	border-bottom-right-radius: @radius;
	// TODO
	box-shadow: 0 0 12px rgba(0,0,0,.1);
	&.without-header {
		border-top-left-radius: @radius;
		border-top-right-radius: @radius;
	}
	background-repeat: no-repeat;
	background-size: contain;
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
