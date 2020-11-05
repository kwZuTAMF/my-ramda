import $isTransformer from './$isTransformer'

/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer [xf] to return a new transformer (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */
const $dispatches = (methods, xf, f) => (...args) => {
  if (!args.length) {
    return f()
  }
  let idx = -1
  let len = methods.length
  let obj = args.pop()
  if (Array.isArray(obj)) {
    return f(...args, obj)
  }
  while (++idx < len) {
    if (typeof obj[methods[idx]] === 'function') {
      return obj[methods[idx]](...args)
    }
  }
  if ($isTransformer(obj)) {
    return xf(...args)(obj)
  }
}

export default $dispatches
