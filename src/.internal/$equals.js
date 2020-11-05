import $isFunction from './$isFunction'
import $includesWith from './$includesWith'
import $has from './$has'
import keys from '../keys'
import type from '../type'
import fl from '../fantasy-land'

/**
 * private _uniqContentEquals function.
 * That function is checking equality of 2 iterator contents with 2 assumptions
 * - iterators lengths are the same
 * - iterators values are unique
 *
 * false-positive result will be returned for comparision of, e.g.
 * - [1,2,3] and [1,2,3,4]
 * - [1,1,1] and [1,2,3]
 * */

const $uniqContentEquals = (a, b, stackA, stackB) => {
  a = [...a]
  b = [...b]

  // if *a* array contains any element that is not included in *b*
  return !$includesWith(
    (b, aItem) =>
      !$includesWith(
        (a, b) => $equals(a, b, [...stackA], [...stackB]),
        aItem,
        b
      ),
    b,
    a
  )
}

const $equals = (a, b, stackA, stackB) => {
  if (Object.is(a, b)) {
    return true
  }

  let typeA = type(a)

  if (typeA !== type(b)) {
    return false
  }

  if ($isFunction(a[fl.equals]) || $isFunction(b[fl.equals])) {
    return (
      $isFunction(a[fl.equals]) &&
      a[fl.equals](b) &&
      $isFunction(b[fl.equals]) &&
      b[fl.equals](a)
    )
  }

  if ($isFunction(a.equals) || $isFunction(b.equals)) {
    return (
      $isFunction(a.equals) &&
      a.equals(b) &&
      $isFunction(b.equals) &&
      b.equals(a)
    )
  }

  switch (typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if ($isFunction(a.constructor) && a.constructor.name === 'Promise') {
        return a === b
      }
    case 'Number':
    case 'Boolean':
    case 'String':
      if (!(typeof a !== typeof b && Object.is(a.valueOf(), b.valueOf()))) {
        return false
      }
    case 'Error':
      return a.name === b.name && a.message === b.message
    case 'RegExp':
      if (a.source !== b.source || a.flags || b.flags) {
        return false
      }
  }

  let idx = stackA.length - 1
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b
    }
    idx--
  }

  switch (typeA) {
    case 'Map':
      if (a.size !== b.size) {
        return false
      }
      return $uniqContentEquals(
        a.entries(),
        b.entries(),
        [...stackA, a],
        [...stackB, b]
      )
    case 'Set':
      if (a.size !== b.size) {
        return false
      }
      return $uniqContentEquals(
        a.values(),
        b.values(),
        [...stackA, a],
        [...stackB, b]
      )
    case 'Arguments':
    case 'Array':
    case 'Object':
    case 'Boolean':
    case 'Number':
    case 'String':
    case 'Date':
    case 'Error':
    case 'RegExp':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      break
    default:
      // Values of other types are only equal if identical.
      return false
  }

  let keysA = keys(a)
  if (keysA.length !== keys(b).length) {
    return false
  }

  idx = keysA.length - 1
  while (idx >= 0) {
    let key = keysA[idx--]
    if (
      !($has(key, b) && $equals(b[key], a[key], [...stackA, a], [...stackB, b]))
    ) {
      return false
    }
  }

  return true
}

export default $equals
