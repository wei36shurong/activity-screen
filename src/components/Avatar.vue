<template>
<div class="avatar" :style="{width: `${size}px`}">
	<img 
	v-if="src"
	class=""
	:src="src" 
	:alt="src" 
	:style="{
		height: `${size}px`,
		width: `${size}px`,
	}">
	<div v-if="!src"
	class="placeholder"
	:style="{
		height: `${size}px`,
		width: `${size}px`,
		backgroundColor: 'rbga(216,216,216,0.2)'
	}">
	</div>
	<div class="name" :class="" v:if="name"> {{name}} </div>
</div>
</template>

<script>
export default {
	name: 'Avatar',
	props: {
		src: String,
		name: String,
		size: Number
	}
}
</script>

<style lang="less" scoped>
@import '../styles/variables';

@xl-size: 120px;
@lg-size: 60px;
@md-size: 40px;
@sm-size: 30px;

.avatar {
	.placeholder {
		background-color: #d8d8d8;
		opacity: 0.2;
	}
	&.xl { width: @xl-size}
	&.lg { width: @lg-size}
	&, &.md { width: @md-size}
	&.sm { width: @sm-size}
	img, .placeholder { border-radius: 50%; }
	&.xl>img { height: @xl-size; width: @xl-size; }
	&.lg>img { height: @lg-size; width: @lg-size; }
	img, .placeholder, &.md>img, &.md>.placeholder { height: @md-size; width: @md-size; }
	&.sm>img { height: @sm-size; width: @sm-size; }
	&.xl>.name { margin-top: 20px; font-size: 24px;}
	&.lg>.name { margin-top: 10px; font-size: 18px;}
	.name, &.md>.name { margin-top: 4px; font-size: 12px;}
	&.sm>.name { margin-top: 4px; font-size: 12px;}
}

</style>
