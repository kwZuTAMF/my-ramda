import $curry1 from './.internal/$curry1'
import mean from './mean'

/**
 * Returns the median of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.mean
 * @example
 *
 *      R.median([2, 9, 7]); //=> 7
 *      R.median([7, 2, 10, 9]); //=> 8
 *      R.median([]); //=> NaN
 */
const median = $curry1(array => {
  let len = array.length
  let width = 2 - (len % 2)
  let idx = (len - width) / 2
  return len
    ? mean(
        [...array]
          .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
          .slice(idx, idx + width)
      )
    : NaN
})

export default median
