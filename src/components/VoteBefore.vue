<style lang="less" scoped>
.container {
	padding-top: 238px;
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.vote-before {
	display: grid;
	grid-template-columns: 380px 1080px;
	grid-template-rows: 550px;
	grid-column-gap: 20px;
	.wrapper {
		position: relative;
		.panel {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}
}
h3 {
	color: #fff4d4;
	margin-top: 50px;
	margin-bottom: 25px;
}
.panel.side /deep/ .content { background-color: #ff780099; }
.panel.main /deep/ .content { background-color: #c5000bc0; }

@dilute-text-color: #fff4d4;
@thick-text-color: #ffd797;

h3, h4, span, p {
	color: @dilute-text-color;
}
h3 { font-size: 26px;}
h4 { font-size: 20px;}

.panel.main /deep/ .content .grid {
	display: flex;
	.avatar { flex: 1}
}
</style>

<template>
<div class="container">
	<div class="vote-before">
		<div class="wrapper">
			<panel class="side">
				<img style='height:200px;width:200px;margin-top:140px;' :src='config.qrCode_url'></img>
				<p style='font-size:22px;color:#fff4d4;margin-top:40px;'> 微信扫一扫签到 </p>
			</panel>
		</div>
		<div class="wrapper">
			<panel class="main" :bg="mainBg">
				<h3 style="margin-top:60px;margin-bottom:70px;"> {{votes[groupIndex].title}} </h3>
				<div class="grid">
					<avatar class="xl" 
					v-for="item in localCandidates"
					:key="item.title"
					:src="item.image_url" 
					:name="item.title"
					></avatar>
				</div>
			</panel>
		</div>
	</div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Panel from '@/components/Panel'
import Avatar from '@/components/Avatar'
import avatarImg from '@/assets/avatar.png'
import mainBg from '@/assets/vote-main-panel-bg.png'
export default {
	name: 'VoteBefore',
	components: {Panel, Avatar},
	props: ['groupIndex'],
	data () {
		return {
			avatarImg,
			mainBg
		}
	},
	computed: {
		...mapState('activity', ['votes', 'config']),
		...mapGetters('activity', [ 'candidates', 'userNum' ]),
		localCandidates () {
			return this.candidates(this.groupIndex)
		}
	}
}
</script>
