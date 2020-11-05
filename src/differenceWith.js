import $curry3 from './.internal/$curry3'
import $includesWith from './.internal/$includesWith'

/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.difference, R.symmetricDifference, R.symmetricDifferenceWith
 * @example
 *
 *      const cmp = (x, y) => x.a === y.a;
 *      const l1 = [{a: 1}, {a: 2}, {a: 3}];
 *      const l2 = [{a: 3}, {a: 4}];
 *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
 */
const differenceWith = $curry3((predicate, a, b) => {
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
})

export default differenceWith

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

  const cmp = (x, y) => x.a === y.a
  const l1 = [{ a: 1 }, { a: 2 }, { a: 3 }]
  const l2 = [{ a: 3 }, { a: 4 }]
  differenceWith(cmp, l1, l2) //=> [{a: 1}, {a: 2}]
}
