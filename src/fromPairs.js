import $curry1 from './.internal/$curry1'

/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [[k,v]] -> {k: v}
 * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
 * @return {Object} The object made by pairing up `keys` and `values`.
 * @see R.toPairs, R.pair
 * @example
 *
 *      R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
 */
const fromPairs = $curry1(pairs => {
  let res = {}
  let idx = -1
  let len = pairs.length
  while (++idx < len) {
    res[pairs[idx][0]] = pairs[idx][1]
  }
  return res
})

export default fromPairs
