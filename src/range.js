import $curry2 from './.internal/$curry2'

/**
 * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> Number -> [Number]
 * @param {Number} from The first number in the list.
 * @param {Number} to One more than the last number in the list.
 * @return {Array} The list of numbers in the set `[a, b)`.
 * @example
 *
 *      R.range(1, 5);    //=> [1, 2, 3, 4]
 *      R.range(50, 53);  //=> [50, 51, 52]
 */
const range = $curry2((from, to) => {
  if (typeof from !== 'number' || typeof to !== 'number') {
    throw new TypeError('Both arguments to range must be numbers')
  }
  let idx = 0
  let res = []
  while (from < to) {
    res[idx++] = from++
  }
  return res
})

export default range
