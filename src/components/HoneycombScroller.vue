<template>
	<div class="honeycomb-scroller" v-scroll="onScroll">
		<honeycomb :class="`row-${row}`" :colWidth="colWidth">
			<div v-for="(user, index) in users">
				<avatar class="sm"
				:src="user.info.avatarUrl" 
				></avatar>
			</div>
		</honeycomb>
	</div>
</template>

<script>
import Glass from '@/components/Glass'
import Avatar from '@/components/Avatar'
import Honeycomb from '@/components/Honeycomb'
export default {
	name: 'HoneycombScroller',
	components: { Glass, Avatar, Honeycomb },
	data () {
		return {
			users: [
				{
					_id: '',
					info: {
						avatar_url: '',
						name: ''
					}
				}
			],
			colWidth: 40,
			threshhold: 8,
			swapColumn: 6,
			autoPlay: true,
			intervalId: ''
			// lotteryStartIndex: 0
		}
	},
	props: {
		row: {
			type: Number,
			default: 6
		}
	},
	async created () {
	},
	mounted () {
		this.autoScroll()
		// only draw lottery from users in viewport
		// const width = this.$el.querySelector('.y-scroller').clientWidth
		// const viewCols = Math.round(width / this.colWidth)
		// this.lotteryStartIndex = (this.threshhold - this.swapColumn) * this.row
		// this.lotteryEndIndex = this.lotteryStartIndex + viewCols * this.row
		// TODO 当用户数量太少并不需要滚动的情况
	},
	watch: {
		autoPlay(val) {
			clearTimeout(this.autoScrollIntervalId)
			if (val) this.autoScroll()
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
		}
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
