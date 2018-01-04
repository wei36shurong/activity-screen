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
</style>
