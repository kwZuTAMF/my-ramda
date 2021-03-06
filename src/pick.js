import $curry2 from './.internal/$curry2'
import $has from './.internal/$has'

/**
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.omit, R.props
 * @example
 *
 *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
 */
const pick = $curry2((keys, source) => {
  let res = {}
  let idx = -1
  let len = keys.length
  let key
  while (++idx < len) {
    key = keys[idx]
    if ($has(source, key)) {
      res[key] = source[key]
    }
  }
  return res
})

export default pick
