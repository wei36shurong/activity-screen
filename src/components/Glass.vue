<template>
<div class="glass">
	<div class="box tinted">
		<div class="header blurred-bg">
			<span class="header-left"><slot name="header-left"></slot></span>
			<span class="header-right"><slot name="header-right"></slot></span>
			<slot name="header"></slot>
		</div>
		<div class="content blurred-bg" :style="{padding: `${padding}`}">
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
			msg: 'Welcome to Your Vue.js App'
		}
	}
}
</script>

<style lang="less" scoped>
@import '../styles/variables';

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
.blurred-bg {
	background-image:url(@blurred-img);
	background-repeat:no-repeat;
	background-size:cover;
	background-attachment: fixed;
	&.tinted{
		background-color: linear-gradient(0deg, rgba(255,255,255,.2),rgba(255,255,255,.2)),url(@blurred-img);
	}
	&.shaded{
		background-image: linear-gradient(0deg, rgba(0,0,0,.2),rgba(0,0,0,.2)),url(@blurred-img);
	}
}
.box {
	// box-shadow:0 20px 30px rgba(0,0,0,.6);
	// border:1px solid rgba(255,255,255,.3);
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
	background-image: linear-gradient(0deg, rgba(0,0,0,.2),rgba(0,0,0,.2)),url(@blurred-img);
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
