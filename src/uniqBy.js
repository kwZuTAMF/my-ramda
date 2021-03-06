import $curry2 from './.internal/$curry2'

/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. [`R.equals`](#equals) is used for comparison.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> b) -> [a] -> [a]
 * @param {Function} fn A function used to produce a value to use during comparisons.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 */
const uniqBy = $curry2((mapper, array) => {
  let res = []
  let idx = -1
  let len = array.length
  let set = []
  let item
  let mapped
  while (++idx < len) {
    item = array[idx]
    mapped = mapper(item)
    if (!set.includes(mapped)) {
      set.push(mapped)
      res.push(item)
    }
  }
  return res
})

export default uniqBy
