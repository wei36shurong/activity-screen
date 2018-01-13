const mutationTypes = [
	'activity/ADD_ACTIVITY_USER',
	'LOAD_ACTIVITY_USERS',
	'LOAD_ACTIVITY',
	'LOAD_USERS',
	'ADD_WINNER'
]
const mutationTypesLiteral = {}
for (let key of mutationTypes) {
	mutationTypesLiteral[key] = key
}

export default mutationTypesLiteral
