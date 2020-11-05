import $curry2 from './.internal/$curry2'
import equals from './equals'

const contains = $curry2((value, source) => {
  let idx = -1
  let len = source.length
  while (++idx < len && !equals(source[idx], value)) {}
  return idx !== len
})

export default contains
