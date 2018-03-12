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
.lottery {
	display: grid;
	// grid-template-columns: 380px 680px 380px;
	grid-template-columns: 380px 1080px;
	grid-template-rows: 550px;
	grid-column-gap: 20px;
	& > .wrapper {
		position: relative;
		& > .panel {
			position: absolute;
			top:0;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}
}

.panel /deep/ .content {
	padding: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

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

.prize-img-wrapper {
	height:220px;
	width:220px;
	margin-top:56px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	.prize-img {
		box-sizing: border-box;
		width: 100%;
		padding: 15px;
	}
}

.avatar.xl /deep/ img,
.avatar.xl /deep/ .placeholder {
	border: 15px solid #ffc107;
	box-shadow: 0 0 60px 0px #000000ad;
}


.wrapper.main {
	position: relative;
	.crown-wrapper {
		position:	relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		.crown {
			position: relative;
			top: 15px;
			z-index: 99;
		}
	}
}


</style>

<template>
<div class="container">
	<div class="lottery">
		<div class="wrapper left">
			<panel class="left" bgColor="#ff780099">
				<h3>{{draw.title}}</h3>
				<div class="prize-img-wrapper" 
				:style="{backgroundImage: `url(${prizeBg})`}">
					<img class="prize-img" :src="draw.image_url">
				</div>
				<h4 style="margin-top:40px;margin-bottom:12px;">{{draw.item_title}}</h4>
				<h4>名额：{{draw.num}}位</h4>
			</panel>
		</div>
		<div class="wrapper main">
			<panel class="main" :bg="mainBg" bgColor="#c5000bc0">
				<h3 style="margin-bottom:20px;" @click="drawAll"> {{draw.title}}获奖者 </h3>
				<div class="crown-wrapper">
					<img class="crown" src="../assets/crown.png" @click="play">
					<avatar class="xl" @click.native="pause"
					:src="winner.info.avatarUrl" 
					:name="winner.info.name || '虚席以待'" 
					></avatar>
				</div>
				<h4 style="margin-top:40px;" @click="confirm">
					<span style="color:#ffc107;">{{storedUsers.length}}人</span>参与本场抽奖
				</h4>
			</panel>
		</div>
	</div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Panel from '@/components/Panel'
import Avatar from '@/components/Avatar'
import Honeycomb from '@/components/Honeycomb'
import GlassButton from '@/components/GlassButton'
import PanelWinners from '@/components/PanelWinners'
import avatarImg from '@/assets/avatar.png'
import prizeBg from '@/assets/prize-bg.png'
import mainBg from '@/assets/lottery-main-panel-bg.png'
import { getRandomInt } from '@/utils'
import emptyUserState from '@/store/user-state'
// 当数据库更新winners为id后，刷新会导致组件渲染错误（只有id信息，没有对象）
export default {
	name: 'Lottery',
	components: { Panel, Avatar, Honeycomb, GlassButton, PanelWinners },
	data () {
		return {
			avatarImg,
			prizeBg,
			mainBg,
			users: [
				{
					_id: '',
					info: {
						avatar_url: '',
						name: ''
					}
				}
			],
			row: 6,
			colWidth: 40,
			threshhold: 8,
			swapColumn: 6,
			autoPlay: true,
			winnerIndex: 0,
			intervalId: '',
			lotteryStartIndex: 0,
			isPlaying: false,
			isWaiting: true, // 等待开始抽奖
			emptyUserState
		}
	},
	computed: {
		...mapState('activity', {
			storedUsers: 'users'
		}),
		...mapState('activity', ['draws']),
		...mapGetters('activity', ['prizeWinners']),
		// TODO 修改成从activity module里取
		winner() {
			const currentPrize = this.currentPrize || this.draws.length - 1
			const currentPrizeWinners = this.prizeWinners[currentPrize]
			const lastWinner = currentPrizeWinners[currentPrizeWinners.length - 1]
			// 随机到最后一个的情况, 防止出错
			const lastIndex = this.users.length - 1
			if (this.winnerIndex > lastIndex && lastIndex >= 0) this.winnerIndex = lastIndex
			if (this.isWaiting) return this.emptyUserState
			return this.isPlaying
			? this.users[this.winnerIndex]
			: this.users[this.winnerIndex] || lastWinner
		},
		draw() {
			return this.draws[this.currentPrize] || {
				title: '特等奖：iPhone X',
				image_url: '',
				num: 1,
				winners: []
			}
		},
		lotteryEndIndex() {
			const end = this.users.length - 1
			return end >= 0 ? end : 0
		}
	},
	props: ['currentPrize'],
	watch: {
		autoPlay(val) {
			clearTimeout(this.autoScrollIntervalId)
			if (val) {
				this.autoScroll()
			}
		},
		'$store.state.activity.loaded' (val) {
			if (!val) return
			this.init()
		}
	},
	created() {
		this.init()
	},
	methods: {
		init (val) {
			// 当活动数据加载完时
			this.users = this.storedUsers

			// 当有显示设置组别时, 不设置
			if (this.currentPrize) return

			// 当有显示设置组别时, 设置成最后一组
			const currentPrize = this.draws.length - 1
			this.$router.push({name: 'lottery', params: {currentPrize}})
		},
		playAll() {
			// TODO
		},
		pauseAll() {
			// TODO
		},
		drawAll() {
			let num = this.draws[this.currentPrize].num // 确定名额
			const interval = 500 // 配置间隔

			// 循环抽奖
			const id = setInterval(() => {
				this.play(); this.pause(); this.confirm()
				console.log(num)
				if (--num <= 0) clearInterval(id)
			}, interval)
		},
		play() {
			this.isWaiting = false
			// 不重复播放
			if (this.isPlaying) return
			this.isPlaying = true
			console.log('play')
			// 当名额满时跳到下一个
			if (this.prizeWinners[this.currentPrize].length >= this.draws[this.currentPrize].num && this.currentPrize > 0) {
				// 手动跳转
				return
				// 设置成最后一组
				const currentPrize = this.draws.length - 1
				this.$router.push({name: 'lottery', params: {currentPrize}})
			}
			// 当都抽完时不再进行
			if (this.currentPrize < 0) return
			console.log('play begin')
			this.playIntervalId = setInterval(() => {
				this.winnerIndex = getRandomInt(
					this.lotteryStartIndex,
					this.lotteryEndIndex
				)
			}, 50)
		},
		pause() {
			console.log('pause')
			clearTimeout(this.playIntervalId)
			clearTimeout(this.scrollIntervalId)
			this.isPlaying = false
		},
		confirm() {
			if (this.prizeWinners[this.currentPrize].length >= this.draws[this.currentPrize].num) return
			this.$store.dispatch('activity/addWinner', {
				level: this.currentPrize,
				winner: this.winner
			})
			this.users.splice(this.winnerIndex, 1)
			this.isWaiting = true
		}
	},
	sockets: {
		connect() { console.log('Lottery socket connected') },
		lotteryPlay() { this.play() },
		lotteryPause() { this.pause() },
		lotteryConfirm() { this.confirm() }
	}
}
</script>
