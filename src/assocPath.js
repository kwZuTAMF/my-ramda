import $curry3 from './.internal/$curry3'
import $has from './.internal/$has'
import $isArray from './.internal/$isArray'
import $isInteger from './.internal/$isInteger'
import $isObject from './.internal/$isObject'
import assoc from './assoc'

/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> {a}
 * @param {Array} path the path to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except along the specified path.
 * @see R.dissocPath
 * @example
 *
 *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *
 *      // Any missing or non-object keys in path will be overridden
 *      R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 */
const assocPath = $curry3((path, value, object) => {
  if (!path.length) {
    return value
  }
  let idx = path[0]
  if (path.length > 1) {
    value = assocPath(
      path.slice(1),
      value,
      $isObject(object) && $has(idx, object)
        ? object[idx]
        : $isInteger(path[1])
        ? []
        : {}
    )
  }
  if ($isInteger(idx) && $isArray(object)) {
    let res = [...object]
    res[idx] = value
    return res
  } else {
    return assoc(idx, value, object)
  }
})

export default assocPath
