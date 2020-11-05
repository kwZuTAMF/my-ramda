import type from '../type'

/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Array} refFrom Array containing the source references
 * @param {Array} refTo Array containing the copied source references
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @return {*} The copied value.
 */
const $clone = (value, from, to, deep) => {
  const copy = copiedValue => {
    let idx = -1
    let len = from.length
    while (++idx < len) {
      if (value === from[idx]) {
        return to[idx]
      }
    }

    from[idx] = value
    to[idx] = copiedValue
    for (let key in value) {
      copiedValue[key] = deep ? $clone(value[key], from, to, true) : value[key]
    }
    return copiedValue
  }
  switch (type(value)) {
    case 'Object':
      return copy({})
    case 'Array':
      return copy([])
    case 'Date':
      return new Date(value.valueOf())
    case 'RegExp':
      return new RegExp(value.source, value.flags)
    default:
      return value
  }
}
