import $curry2 from './.internal/$curry2'
import $dispatchable from './.internal/$dispatchable'
import $xtakeWhile from './.internal/$xtakeWhile'

/**
 * Returns a new list containing the first `n` elements of a given list,
 * passing each value to the supplied predicate function, and terminating when
 * the predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * Dispatches to the `takeWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropWhile, R.transduce, R.addIndex
 * @example
 *
 *      const isNotFour = x => x !== 4;
 *
 *      R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
 *
 *      R.takeWhile(x => x !== 'd' , 'Ramda'); //=> 'Ram'
 */
// takeWhile :: (a -> Boolean) -> [a] -> [a]
const takeWhile = $curry2(
  $dispatchable(['takeWhile'], $xtakeWhile, (predicate, array) => {
    let idx = -1
    let len = array.length
    while (++idx < len && predicate(array[idx])) {}
    return array.slice(0, idx)
  })
)

export default takeWhile
