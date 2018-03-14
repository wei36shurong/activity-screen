const config = {
	local: { apiRoot: 'http://localhost:3000' },
	test: { apiRoot: 'http://118.25.21.169:3000' },
	production: { apiRoot: 'https://activity.toyourcity.com' },
}
console.log(process.env.PACK_ENV)
export default config[process.env.PACK_ENV]
