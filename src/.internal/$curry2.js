import _ from '../_'
import $curry1 from './$curry1'

const $curry2 = f =>
  function $curried2(a, b) {
    let n = arguments.length
    if (n > 1) {
      if (a === _) {
        if (b === _) {
          return $curried2
        } else {
          return $curry1(a => f(a, b))
        }
      } else if (b === _) {
        return $curry1(b => f(a, b))
      } else {
        return f(a, b)
      }
    } else if (n == 1) {
      if (a === _) {
        return $curried2
      } else {
        return $curry1(b => f(a, b))
      }
    } else {
      return $curried2
    }
  }

export default $curry2
