import $isObject from './$isObject'

// https://tc39.es/ecma262/#sec-isregexp
// https://tc39.es/ecma262/#sec-object.prototype.tostring
const $isRegExp = value => {
  // If Type(argument) is not Object, return false.
  if (!$isObject(value)) {
    return false
  }
  // Let matcher be ? Get(argument, @@match).
  let matcher = value[Symbol.match]
  // If matcher is not undefined, return ! ToBoolean(matcher).
  // If argument has a [[RegExpMatcher]] internal slot, return true.
  // Return false.
  return matcher !== undefined
    ? !!matcher
    : Object.prototype.toString.call(value) === 'RegExp'
}

export default $isRegExp
