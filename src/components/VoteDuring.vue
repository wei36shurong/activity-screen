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
.vote-during {
	display: grid;
	grid-template-columns: 1480px;
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

.panel.main /deep/ .content { 
	padding: 72px 120px;
	background-color: #c5000bc0; 
	display: flex;
	.main {
		flex: 1;
	}
	.side {
		padding: 100px 0px;
		margin-left: 120px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
}

.main {
	display: grid;
	height: 100%;
}
.row {
	display: flex;
	align-items: center;
	.row-inner {
		flex: 1;
		display: flex;
		align-items: center;
		& > .right {
			flex: 1;
			height: 100%;
			margin-left: 50px;
			text-align: left;
			// TODO
			p {font-size: 22px; color: #fff4d4;}
			& > .bar-container {
				width: 100%;
				// padding-top: 28px;
				padding-bottom: 18px;
			}
		}
	}
}
</style>

<template>
<div class="container">
	<div class="vote-during">
		<div class="wrapper">
			<panel class="main" :bg="mainBg">
				<div class="main">
					<div class="row" v-for="(candidate, candidateIndex) in localCandidates">
						<div class="row-inner">
							<avatar class="lg" :src="candidate.image_url"></avatar>
							<div class="right">
								<div class="bar-container">
									<bar :height="40" unit="分" 
									:numStyle="{color: '#fff4d4', fontSize: '30px'}"
									:value="voteNum(groupIndex, candidateIndex)" 
									:max="800" />
									<!-- :max="userNum + candidate.bonus" /> -->
								</div>
								<p>{{candidate.title}}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="side" style="color:#fff4d4;width:10em;">
					<p style="font-size:40px;">
						<span style="color:#ffc107;">{{totalVoteNum}}/</span>{{userNum}}人
					</p>
					<p style="font-size:26px;margin-top: 22px;">已投票</p>
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
import Bar from '@/components/Bar'
import mainBg from '@/assets/vote-main-panel-bg-wide.png'

export default {
	name: 'VoteDuring',
	components: {Panel, Avatar, Bar},
	computed: {
		...mapState('activity', ['votes']),
		...mapGetters('activity', [ 'candidates', 'userNum', 'voteNum' ]),
		totalVoteNum () {
			let total = 0
			for (let i = 0; i < this.localCandidates.length; i++) {
				const votersCount = this.voteNum(this.groupIndex, i) - this.localCandidates[i].bonus
				total = total + votersCount
			}
			return total
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
