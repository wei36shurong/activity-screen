<template>
<div class="container">
	<div>
		<glass>
			<span slot="header">中奖名单</span>
			<div class="side">
				<h4>{{draw.title}}</h4>
				<div class="grid">
					<avatar 
					v-for="winner in draw.winners" 
					:key="winner._id"
					:src="winner.info.avatarUrl" 
					:name="winner.info.name"
					></avatar>
				</div>
			</div>
		</glass>
	</div>
	<div>
		<glass>
			<span slot="header-left">投票</span>
			<span slot="header-right">109人参与</span>
			<div class="main">
				<div class="top">
					<h3> {{draws[currentPrize].title}}获奖者 </h3>
					<avatar class="lg"
					:src="winner.info.avatarUrl" 
					:name="winner.info.name" 
					></avatar>
					<glass-button @click.native="play();pause();confirm();"> 开始抽奖 </glass-button>
				</div>
				<div class="y-scroller" v-scroll="onScroll">
					<honeycomb :class="`row-${row}`" :colWidth="colWidth">
						<div v-for="(user, index) in users">
							<avatar class="sm"
							:class="{selected: index == winnerIndex}"
							:src="user.info.avatarUrl" 
							></avatar>
						</div>
					</honeycomb>
				</div>
			</div>
		</glass>
	</div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Glass from '@/components/Glass'
import Avatar from '@/components/Avatar'
import Honeycomb from '@/components/Honeycomb'
import GlassButton from '@/components/GlassButton'
import qrcode from '@/assets/qrcode.png'
import avatarImg from '@/assets/avatar.png'
import { getRandomInt } from '@/utils'
import types from '../store/mutation-types'
export default {
	name: 'Lottery',
	components: { Glass, Avatar, Honeycomb, GlassButton },
	data () {
		return {
			qrcode,
			avatarImg,
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
			: lastWinner || this.users[this.winnerIndex]
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
		// const width = this.$el.querySelector('.y-scroller').clientWidth
		// const viewCols = Math.round(width / this.colWidth)
		// only draw lottery from users in viewport
		// this.lotteryStartIndex = (this.threshhold - this.swapColumn) * this.row
		// this.lotteryEndIndex = this.lotteryStartIndex + viewCols * this.row
		// TODO 当用户数量太少并不需要滚动的情况
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
			// 当名额满时不再进行
			if (this.prizeWinners[this.currentPrize].length >= this.draws[this.currentPrize].num) return
			console.log('play')
			this.autoPlay = false
			this.scrollIntervalId = setInterval(() => {
				this.$el.querySelector('.y-scroller').scrollBy({
					left: 100,
					behavior: 'smooth'
				})
			}, 80)
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

<style lang="less" scoped>
.container {
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-template-rows: 1fr;
	grid-column-gap: 10px;
	height: 100%;
	width: 100%;
	& > div {
		position: relative;
		& > .glass {
			position: absolute;
			top:0;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}
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
		grid-row-gap: 10px;
		grid-auto-rows: minmax(auto, 100%);
		margin-bottom: 17px;
	}
}
.main {
	.top {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 25px;
		.avatar {
			margin-top: 30px;
		}
		.glass-button {
			position: absolute;
			right: 0;
			bottom: 0;
		}
	}
	.y-scroller {
		transition-timing-function: ease;
		overflow-x: scroll;
		overflow-y: hidden;
		margin: 0 -22.5px;
		padding: 0 22.5px;
	}
}
</style>
