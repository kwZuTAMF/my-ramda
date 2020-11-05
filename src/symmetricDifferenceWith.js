import $curry3 from './.internal/$curry3'
import $map from './.internal/$map'
import differenceWith from './differenceWith'

/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both. Duplication is determined according to the value
 * returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifference, R.difference, R.differenceWith
 * @example
 *
 *      const eqA = R.eqBy(R.prop('a'));
 *      const l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
 *      const l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
 *      R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
 */
const symmetricDifferenceWith = $curry3((predicate, a, b) => [
  ...differenceWith(predicate, a, b),
  ...differenceWith(predicate, b, a)
])

export default symmetricDifferenceWith

{
  const $includesWith = (predicate, x, array) => {
    let idx = -1
    let len = array.length
    while (++idx < len && !predicate(x, array[idx])) {}
    return idx !== len
  }

  const differenceWith = (predicate, a, b) => {
    let res = []
    let idx = -1
    let len = a.length
    let elm
    while (++idx < len) {
      elm = a[idx]
      if (
        !$includesWith(predicate, elm, b) &&
        !$includesWith(predicate, elm, res)
      ) {
        res.push(elm)
      }
    }
    return res
  }

  const symmetricDifferenceWith = (predicate, a, b) => [
    ...differenceWith(predicate, a, b),
    ...differenceWith(predicate, b, a)
  ]

  const eqA = (x, y) => x.a === y.a
  const l1 = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]
  const l2 = [{ a: 3 }, { a: 4 }, { a: 5 }, { a: 6 }]
  symmetricDifferenceWith(eqA, l1, l2) //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
}
