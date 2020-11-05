import $curry3 from './.internal/$curry3'

/**
 * Removes the sub-list of `list` starting at index `start` and containing
 * `count` elements. _Note that this is not destructive_: it returns a copy of
 * the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} start The position to start removing elements
 * @param {Number} count The number of elements to remove
 * @param {Array} list The list to remove from
 * @return {Array} A new Array with `count` elements from `start` removed.
 * @see R.without
 * @example
 *
 *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
 */
const remove = $curry3((start, count, array) => {
  // let len = array.length
  // start += start < 0 && len
  // if (start <= 0 || start >= len || count <= 0 || count >= len) {
  //   return array
  // }
  let result = [...array]
  result.splice(start, count)
  return result
})

export default remove
