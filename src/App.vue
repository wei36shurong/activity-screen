<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
import store from '@/store/store'
export default {
	name: 'app',
	store
}
</script>

<style lang="less">
@import './styles/base';
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100%;
	width: 100%;
	position: relative;
}
</style>
