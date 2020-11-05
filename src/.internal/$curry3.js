import _ from '../_'
import $curry1 from './$curry1'
import $curry2 from './$curry2'

const $curry3 = f =>
  function $curried3(a, b, c) {
    let n = arguments.length
    if (n > 2) {
      if (a === _) {
        if (b === _) {
          if (c === _) {
            return $curried3
          } else {
            return $curry2((a, b) => f(a, b, c))
          }
        } else if (c === _) {
          return $curry2((a, c) => f(a, b, c))
        } else {
          return $curry1(a => f(a, b, c))
        }
      } else if (b === _) {
        if (c === _) {
          return $curry2((b, c) => f(a, b, c))
        } else {
          return $curry1(b => f(a, b, c))
        }
      } else if (c === _) {
        return $curry1(c => f(a, b, c))
      } else {
        return f(a, b, c)
      }
    } else if (n == 2) {
      if (a === _) {
        if (b === _) {
          return $curried3
        } else {
          return $curry2((a, c) => f(a, b, c))
        }
      } else if (b === _) {
        return $curry2((b, c) => f(a, b, c))
      } else {
        return $curry1(c => f(a, b, c))
      }
    } else if (n == 1) {
      if (a === _) {
        return $curried3
      } else {
        return $curry2((b, c) => f(a, b, c))
      }
    } else {
      return $curried3
    }
  }

export default $curry3
