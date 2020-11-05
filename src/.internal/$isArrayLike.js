import $isLength from './$isLength'

// https://tc39.es/ecma262/#sec-lengthofarraylike
// https://tc39.es/ecma262/#sec-createlistfromarraylike
const $isArrayLike = x => !!x && typeof x === 'object' && $isLength(x.length)

export default $isArrayLike
