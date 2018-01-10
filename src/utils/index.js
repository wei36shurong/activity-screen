export function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export function to(promise) {
	return promise.then(data => {
		return [null, data]
	}).catch(err => [err])
}
