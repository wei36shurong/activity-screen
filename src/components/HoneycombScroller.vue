<template>
	<div class="honeycomb-scroller y-scroller" v-scroll="onScroll">
		<honeycomb :class="`row-${row}`" :colWidth="colWidth">
			<div v-for="(user, index) in users">
				<avatar class="md"
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
			colWidth: 65,
			threshhold: 2,
			swapColumn: 6,
			currentAutoPlay: true,
			intervalId: ''
			// lotteryStartIndex: 0
		}
	},
	props: {
		users: {
			type: Array,
			default: [{
				_id: '',
				info: {
					avatar_url: '',
					name: ''
				}
			}]
		},
		row: {
			type: Number,
			default: 6
		},
		autoPlay: {
			type: Boolean,
			default: true
		}
	},
	async created () {
	},
	mounted () {
		if (this.autoPlay) this.autoScroll()
		// only draw lottery from users in viewport
		// const width = this.$el.querySelector('.y-scroller').clientWidth
		// const viewCols = Math.round(width / this.colWidth)
		// this.lotteryStartIndex = (this.threshhold - this.swapColumn) * this.row
		// this.lotteryEndIndex = this.lotteryStartIndex + viewCols * this.row
		// TODO 当用户数量太少并不需要滚动的情况
	},
	watch: {
		currentAutoPlay(val) {
			clearTimeout(this.autoScrollIntervalId)
			if (val) this.autoScroll()
		}
	},
	methods: {
		autoScroll() {
			// const scroller = this.$el.querySelector('.y-scroller')
			const scroller = this.$el
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
.y-scroller {
	transition-timing-function: ease;
	overflow-x: scroll;
	overflow-y: hidden;
	margin: 0 -22.5px;
	padding: 0 22.5px;
	&::-webkit-scrollbar {
		display: none;
	}
}
</style>
