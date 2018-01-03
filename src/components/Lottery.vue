<template>
<div class="container">
	<glass>
		<span slot="header">中奖名单</span>
		<div class="side">
			<h4>特等奖：iPhone X</h4>
			<div class="grid">
				<avatar></avatar>
			</div>
			<h4>一等奖：iPhone 8</h4>
			<div class="grid">
				<avatar></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
			</div>
			<h4>二等奖：iPhone 7</h4>
			<div class="grid">
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
			</div>
			<h4>三等奖：iPad</h4>
			<div class="grid">
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
				<avatar :src="avatarImg" name="魏澍榕"></avatar>
			</div>
		</div>
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
import qrcode from '@/assets/qrcode.png'
import avatarImg from '@/assets/avatar.png'
export default {
	name: 'Lottery',
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
