import $curry2 from './.internal/$curry2'
import $isArray from './.internal/$isArray'
import $isFunction from './.internal/$isFunction'
import fl from './fantasy-land'
import raise from './raise'

/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 * Can also concatenate two members of a [fantasy-land
 * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} firstList The first list
 * @param {Array|String} secondList The second list
 * @return {Array|String} A list consisting of the elements of `firstList` followed by the elements of
 * `secondList`.
 *
 * @example
 *
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat([], []); //=> []
 */
const concat = $curry2((a, b) => {
  if ($isArray(a)) {
    if ($isArray(b)) {
      return a.concat(b)
    }
    raise(TypeError, `${b} is not an array`)
  }
  if (typeof a === 'string') {
    if (typeof b === 'string') {
      return a + b
    }
    raise(TypeError, `${b} is not a string`)
  }
  if (a && $isFunction(a[fl.concat])) {
    return a[fl.concat](b)
  }
  if (a && $isFunction(a.concat)) {
    return a.concat(b)
  }
  raise(TypeError, `${b} is not an array`)
})

export default concat
