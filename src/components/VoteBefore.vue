<template>
<div class="container">
	<glass>
		<span slot="header">扫码投票</span>
		<img style="height:200px;width:200px;" src="../assets/qrcode.png"></img>
		<p style="font-size:24px;"> 微信扫一扫投票 </p>
	</glass>
	<glass>
		<span slot="header-left">投票</span>
		<span slot="header-right">109人参与</span>
		<div class="main">
			<avatar class="xl" :src="avatarImg" name="魏澍榕"></avatar>
			<avatar class="xl" :src="avatarImg" name="李雨桐"></avatar>
		</div>
	</glass>
</div>
</template>

<script>
import Glass from '@/components/Glass'
import Avatar from '@/components/Avatar'
import avatarImg from '@/assets/avatar.png'
export default {
	name: 'Vote',
	components: {Glass, Avatar},
	data () {
		return {
			avatarImg
		}
	}
}
</script>

<style lang="less">
@import '../styles/base';
.container {
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-column-gap: 10px;
}
.side {
	h4 {
		text-align: left;
		margin-bottom: 14px;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(5,1fr);
		grid-column-gap: 35px;
		margin-bottom: 17px;
	}
}
.main .grid {
	display: grid;
	grid-template-columns: repeat(5,1fr);
	grid-column-gap: 10px;
}
</style>