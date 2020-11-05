import $curry2 from './.internal/$curry2'
import prop from './prop'

/**
 * Retrieve the value at a given path.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop, R.nth
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 *      R.path(['a', 'b', 0], {a: {b: [1, 2, 3]}}); //=> 1
 *      R.path(['a', 'b', -2], {a: {b: [1, 2, 3]}}); //=> 2
 */
// path :: (String | Symbol | Number k) => [k] -> {k: v} -> v | undefined
const path = $curry2((path, object) => {
  let idx = -1
  let len = path.length
  while (++idx < len) {
    if (null == (object = prop(path[idx], object))) {
      return undefined
    }
  }
  return object
})

export default path
