import $curry2 from './.internal/$curry2'
import $dispatchable from './.internal/$dispatchable'
import $xfindIndex from './.internal/$xfindIndex'

/**
 * Returns the index of the first element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
 *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
 */
const findIndex = $curry2(
  $dispatchable([], $xfindIndex, (predicate, list) => {
    let idx = -1
    let len = list.length
    while (++idx < len && !predicate(list[idx])) {}
    return idx === len ? -1 : idx
  })
)
