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
.vote-end {
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

.main /deep/ h4,
.main /deep/ p,
.main /deep/ span,
.main /deep/ .name {
	color: @thick-text-color;
}
.panel.main /deep/ .content { background-color: #c5000bc0; }

.avatar.xl /deep/ img {
	border: 15px solid #ffc107;
	box-shadow: 0 0 60px 0px #000000ad;
}

.wrapper {
	position: relative;
	.crown {
		position: absolute;
		z-index: 99;
		top: 113px;
		left: 490px;
	}
}

</style>

<template>
<div class="container">
	<div class="vote-end">
		<div class="wrapper">
			<panel class="side">
				<img style='height:200px;width:200px;margin-top:140px;' :src='config.qrCode_url'></img>
				<p style='font-size:22px;color:#fff4d4;margin-top:40px;'> 微信扫一扫签到 </p>
			</panel>
		</div>
		<div class="wrapper">
			<panel class="main" :bg="mainBg">
				<h3 style="margin-top:60px;margin-bottom:70px;"> {{votes[groupIndex].title}} </h3>
				<img class="crown" src="../assets/crown.png">
				<avatar class="xl"
				:src="winner.image_url" 
				:name="winner.title" 
				></avatar>
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
import Bar from '@/components/Bar'
import mainBg from '@/assets/vote-main-panel-bg-wide.png'

// TODO 决赛样式

export default {
	name: 'VoteEnd',
	components: {Panel, Avatar, Bar},
	computed: {
		...mapState('activity', ['votes', 'config']),
		...mapGetters('activity', [ 'candidates', 'userNum', 'voteNum', 'voteWinner' ]),
		totalVoteNum () {
			let total = 0
			for (let i = 0; i < this.localCandidates.length; i++) {
				total = this.voteNum(this.groupIndex, 0)
			}
			return total
		},
		winner () {
			return this.voteWinner(this.groupIndex)
		},
		voteGroup () {
			return this.votes[this.localGroupIndex]
		},
		localCandidates () {
			return this.candidates(this.localGroupIndex)
		},
		localGroupIndex () {
			const length = this.votes.length
			return this.groupIndex >= length ? length - 1 : this.groupIndex
		}
	},
	props: ['groupIndex'],
	data () {
		return {
			avatarImg,
			mainBg
		}
	},
	methods: {
		switchGroup(groupIndex) {
			console.log(groupIndex)
		}
	}
}
</script>
