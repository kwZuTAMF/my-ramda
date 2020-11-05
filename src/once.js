import $arity from './.internal/$arity'
import $curry1 from './.internal/$curry1'

/**
 * Accepts a function `fn` and returns a function that guards invocation of
 * `fn` such that `fn` can only ever be called once, no matter how many times
 * the returned function is invoked. The first value calculated is returned in
 * subsequent invocations.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a... -> b) -> (a... -> b)
 * @param {Function} fn The function to wrap in a call-only-once wrapper.
 * @return {Function} The wrapped function.
 * @example
 *
 *      const addOneOnce = R.once(x => x + 1);
 *      addOneOnce(10); //=> 11
 *      addOneOnce(addOneOnce(50)); //=> 11
 */
const once = $curry1(f => {
  let called = false
  let result
  return $arity(f.length, (...args) => {
    if (called) {
      return result
    }
    called = true
    result = f(...args)
    return result
  })
})

export default once
