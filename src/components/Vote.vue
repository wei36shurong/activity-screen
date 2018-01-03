<template>
	<router-view></router-view>
</template>

<script>
import Glass from '@/components/Glass'
import Avatar from '@/components/Avatar'
import qrcode from '@/assets/qrcode.png'
import avatarImg from '@/assets/avatar.png'
export default {
	name: 'Vote',
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
