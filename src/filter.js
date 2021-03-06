import $curry2 from './.internal/$curry2'
import $dispatchable from './.internal/$dispatchable'
import $filter from './.internal/$filter'
import $reduce from './.internal/$reduce'
import $xfilter from './.internal/$xfilter'
import keys from './keys'
import type from './type'

/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array} Filterable
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      const isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
const filter = $curry2(
  $dispatchable(['filter'], $xfilter, (predicate, filterable) =>
    type(filterable) === 'Object'
      ? $reduce(
          (acc, key) => {
            if (predicate(filterable[key])) {
              acc[key] = filterable[key]
            }
            return acc
          },
          {},
          keys(filterable)
        )
      : $filter(predicate, filterable)
  )
)

export default filter
