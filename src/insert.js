import $curry3 from './.internal/$curry3'

/**
 * Inserts the supplied element into the list, at the specified `index`. _Note that

 * this is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} index The position to insert the element
 * @param {*} elt The element to insert into the Array
 * @param {Array} list The list to insert into
 * @return {Array} A new Array with `elt` inserted at `index`.
 * @example
 *
 *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
 */
const insert = $curry3((index, value, array) => {
  // let len = array.length
  // index += index < 0 && len
  // if (index < 0 || index > len) {
  //   return array
  // }
  let res = array.slice()
  res.splice(index, 0, value)
  return res
})

export default insert
