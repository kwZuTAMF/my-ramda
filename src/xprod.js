import $curry2 from './.internal/$curry2'

/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The list made by combining each possible pair from
 *         `as` and `bs` into pairs (`[a, b]`).
 * @example
 *
 *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 * @symb R.xprod([a, b], [c, d]) = [[a, c], [a, d], [b, c], [b, d]]
 */
const xprod = $curry2((a, b) => {
  let i = -1
  let j
  let m = a.length
  let n = b.length
  let result = []
  for (; ++i < m; ) {
    for (j = -1; ++j < n; ) {
      result.push([a[i], b[j]])
    }
  }
  return result
})

export default xprod
