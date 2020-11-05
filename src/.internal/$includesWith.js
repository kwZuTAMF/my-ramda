const $includesWith = (predicate, x, array) => {
  let idx = -1
  let len = array.length
  while (++idx < len && !predicate(x, array[idx])) {}
  return idx !== len
}

export default $includesWith
