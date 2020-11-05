import $curry2 from './.internal/$curry2'
import $dispatchable from './.internal/$dispatchable'
import $xfind from './.internal/$xfind'

/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */
const find = $curry2(
  $dispatchable(['find'], $xfind, (predicate, list) => {
    let idx = -1
    let len = list.length
    while (++idx < len) {
      if (predicate(list[idx])) {
        return list[idx]
      }
    }
  })
)

export default find
