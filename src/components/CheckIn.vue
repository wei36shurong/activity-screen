<template>
<div class="container">
	<glass>
		<span slot="header">签到进场</span>
		<img style="height:200px;width:200px;" src="../assets/qrcode.png"></img>
		<p style="font-size:24px;"> 微信扫一扫签到 </p>
	</glass>
	<glass>
		<span slot="header-left">抽奖</span>
		<span slot="header-right">109人参与</span>
		<avatar class="lg" :src="avatarImg"></avatar>
	</glass>
</div>
</template>

<script>
import Glass from '@/components/Glass'
import Avatar from '@/components/Avatar'
import qrcode from '@/assets/qrcode.png'
import avatarImg from '@/assets/avatar.png'
export default {
	name: 'CheckIn',
	components: {Glass, Avatar},
	data () {
		return {
			qrcode,
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
</style>
