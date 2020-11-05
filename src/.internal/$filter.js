const $filter = (predicate, coll) => {
  let to = 0
  let idx = -1
  let res = []
  let len = coll.length
  while (++idx < len) {
    if (predicate(coll[idx])) {
      res[to++] = coll[idx]
    }
  }
  return res
}

export default $filter
