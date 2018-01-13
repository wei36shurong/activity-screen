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
			<h3> {{votes[groupIndex].title}} </h3>
			<div class="grid">
				<avatar class="xl" 
				v-for="item in localCandidates"
				:key="item.title"
				:src="item.image_url" 
				:name="item.title"
				></avatar>
			</div>
		</div>
	</glass>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Glass from '@/components/Glass'
import Avatar from '@/components/Avatar'
import avatarImg from '@/assets/avatar.png'
import GlassButton from '@/components/GlassButton'
export default {
	name: 'VoteBefore',
	components: {Glass, Avatar, GlassButton},
	props: ['groupIndex'],
	data () {
		return {
			avatarImg
		}
	},
	computed: {
		...mapState('activity', ['votes']),
		...mapGetters('activity', [ 'candidates', 'userNum' ]),
		localCandidates () {
			return this.candidates(this.groupIndex)
		}
	},
	async created() {
		// await this.$store.dispatch('getActivity')
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
.main {
	.grid {
		display: grid;
		grid-template-columns: repeat(2,1fr);
		grid-column-gap: 10px;
	}
}
</style>