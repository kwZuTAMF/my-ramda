import $curry2 from './.internal/$curry2'

/**
 * Splits a collection into slices of the specified length.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @sig Number -> String -> [String]
 * @param {Number} n
 * @param {Array} list
 * @return {Array}
 * @example
 *
 *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
 *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
 */
const splitEvery = $curry2((n, xs) => {
  if (n <= 0) {
    throw new Error('First argument to splitEvery must be a positive integer')
  }
  let res = []
  let idx = 0
  let len = xs.length
  while (idx < len) {
    res.push(xs.slice(idx, (idx += n)))
  }
  return res
})

export default splitEvery
