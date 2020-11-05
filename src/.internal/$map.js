const $map = (mapper, functor) => {
  let idx = -1
  let len = functor.length
  let res = []
  while (++idx < len) {
    res[idx] = mapper(functor[idx])
  }
  return res
}

export default $map
