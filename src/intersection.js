import $curry2 from './.internal/$curry2'

/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The list of elements found in both `list1` and `list2`.
 * @see R.innerJoin
 * @example
 *
 *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
 */
const intersection = $curry2((a, b) => a.filter(v => b.includes(v)))

export default intersection

{
  const intersection = (a, b) => a.filter(v => b.includes(v))
  intersection([1, 2, 3, 4], [7, 6, 5, 4, 3]) //=> [3, 4]

  const start = performance.now()
  for (let i = 0; i < 1e5; i++) {
    intersection([1, 2, 3, 4], [7, 6, 5, 4, 3])
  }
  console.log(performance.now() - start)
}
