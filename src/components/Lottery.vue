<style lang="less" scoped>
.container {
	margin-top: 238px;
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.lottery {
	display: grid;
	grid-template-columns: 380px 680px 380px;
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
.panel.main /deep/ .content { background-color: #c5000bc0; }
.panel.left /deep/ .content { background-color: #ff780099; }
.panel.right /deep/ .content { background-color: #ff780099; }

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

.avatar.xl /deep/ img {
	border: 15px solid #ffc107;
	box-shadow: 0 0 60px 0px #000000ad;
}
// TODO
.wrapper.main {
	position: relative;
	.crown {
		position: absolute;
		z-index: 99;
		top: 96px;
		left: 288px;
	}
}

.wrapper.right .grid{
	display: grid;
	grid-template-rows: 46px;
	grid-row-gap: 12px;
	width: 100%;
	.row {
		display: flex;
		align-items: center;
		justify-items: center;
		.name {
			font-size: 20px;
			padding-left: 22px;
			flex: 1;
			text-align: left;
			vertical-align: middle;
		}
	}
}

</style>

<template>
<div class="container">
	<div class="lottery">
		<div class="wrapper left">
			<panel class="left">
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
			<panel class="main" :bg="mainBg">
				<h3 style="margin-bottom:74px;"> {{draw.title}}获奖者 </h3>
				<img class="crown" src="../assets/crown.png" @click="play">
				<avatar class="xl" @click.native="pause"
				:src="winner.info.avatarUrl" 
				:name="winner.info.name" 
				></avatar>
				<h4 style="margin-top:46px;" @click="confirm">
					<span style="color:#ffc107;">{{storedUsers.length}}人</span>参与本场抽奖
				</h4>
			</panel>
		</div>
		<div class="wrapper right">
			<panel class="right">
				<h3 style="margin-bottom: 22px;">中奖名单</h3>
				<div class="grid">
					<div class="row" v-for="winner in draw.winners" >
						<avatar 
						:size="44"
						:key="winner._id"
						:src="winner.info.avatarUrl" 
						></avatar>
						<span class="name">{{winner.info.name}}</span>
					</div>
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
import Honeycomb from '@/components/Honeycomb'
import GlassButton from '@/components/GlassButton'
import qrcode from '@/assets/qrcode.png'
import avatarImg from '@/assets/avatar.png'
import prizeBg from '@/assets/prize-bg.png'
import mainBg from '@/assets/lottery-main-panel-bg.png'
import { getRandomInt } from '@/utils'
import types from '../store/mutation-types'
export default {
	name: 'Lottery',
	components: { Panel, Avatar, Honeycomb, GlassButton },
	data () {
		return {
			qrcode,
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
			currentPrize: 3
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
			const currentPrizeWinners = this.prizeWinners[this.currentPrize]
			const lastWinner = currentPrizeWinners[currentPrizeWinners.length - 1]
			// 随机到最后一个的情况, 防止出错
			const lastIndex = this.users.length - 1
			if (this.winnerIndex > lastIndex) this.winnerIndex = lastIndex
			return this.isPlaying
			? this.users[this.winnerIndex]
			: this.users[this.winnerIndex] || lastWinner
		},
		draw() {
			return this.draws[this.currentPrize]
		},
		lotteryEndIndex() { return this.users.length - 1 }
	},
	async created () {
		// TODO delele
		await this.$store.dispatch('activity/getActivity')
		await this.$store.dispatch('activity/getUsers')

		this.users = this.storedUsers

		// init curretn prize level to last draw
		this.currentPrize = this.draws.length - 1
	},
	mounted () {
		this.autoScroll()
	},
	watch: {
		autoPlay(val) {
			clearTimeout(this.autoScrollIntervalId)
			if (val) {
				this.autoScroll()
			}
		}
	},
	methods: {
		autoScroll() {
			const scroller = this.$el.querySelector('.y-scroller')
			if (!scroller) return
			this.autoScrollIntervalId = setInterval(() => {
				scroller.scrollBy({
					left: 1,
					behavior: 'smooth'
				})
			}, 50)
		},
		onScroll(event, {scrollLeft}) {
			const currentCol = scrollLeft / this.colWidth
			if (currentCol < this.threshhold) return
			let users = this.users
			const swapNum = this.row * this.swapColumn
			const swap = users.slice(0, swapNum)
			users.splice(0, swapNum)
			users.splice(users.length - 1, 0, ...swap)
			this.users = users
			event.target.scrollLeft = (this.threshhold - this.swapColumn) * this.colWidth
		},
		play() {
			console.log('play')
			if (this.isPlaying) return
			// 当名额满时不再进行
			if (this.prizeWinners[this.currentPrize].length >= this.draws[this.currentPrize].num) return
			this.playIntervalId = setInterval(() => {
				this.winnerIndex = getRandomInt(
					this.lotteryStartIndex,
					this.lotteryEndIndex
				)
			}, 200)
			this.isPlaying = true
		},
		pause() {
			console.log('pause')
			clearTimeout(this.playIntervalId)
			clearTimeout(this.scrollIntervalId)
			this.isPlaying = false
		},
		confirm() {
			if (this.prizeWinners[this.currentPrize].length >= this.draws[this.currentPrize].num) return
			this.$store.commit(`activity/${types.ADD_WINNER}`, {
				level: this.currentPrize,
				user: this.winner
			})
			this.users.splice(this.winnerIndex, 1)
			// 当名额满时跳到下一个
			if (this.prizeWinners[this.currentPrize].length >= this.draws[this.currentPrize].num && this.currentPrize > 0) this.currentPrize--
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
