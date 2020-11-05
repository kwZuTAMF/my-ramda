const $flattenIntoArray = (target, source, start, depth, mapper) => {
  let idx = -1
  let len = source.length
  let elm
  while (++idx < len) {
    elm = typeof mapper === 'function' ? mapper(source[idx]) : source[idx]
    if (depth > 0 && Array.isArray(elm)) {
      start = $flattenIntoArray(target, elm, start, depth - 1)
    } else {
      target[start++] = elm
    }
  }
  return start
}

export default $flattenIntoArray
