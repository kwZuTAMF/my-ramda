import $isArray from './$isArray'
import $isFunction from './$isFunction'

/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */
const $checkForMethod = (method, f) => (...args) => {
  if (!args.length) {
    return f()
  }
  let obj = args.pop()
  return $isArray(obj) || $isFunction(obj[method])
    ? f(...args, obj)
    : obj[method](...args)
}

export default $checkForMethod
