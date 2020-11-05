import $curry2 from './.internal/$curry2'
import $dispatchable from './.internal/$dispatchable'
import $xany from './.internal/$xany'

/**
 * Returns `true` if at least one of the elements of the list match the predicate,
 * `false` otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
 *         otherwise.
 * @see R.all, R.none, R.transduce
 * @example
 *
 *      const lessThan0 = R.flip(R.lt)(0);
 *      const lessThan2 = R.flip(R.lt)(2);
 *      R.any(lessThan0)([1, 2]); //=> false
 *      R.any(lessThan2)([1, 2]); //=> true
 */
const any = $curry2(
  $dispatchable(['any'], $xany, (predicate, array) => {
    let idx = -1
    let len = array.length
    while (++idx < len && !predicate(array[idx])) {}
    return idx !== len
  })
)

export default any
