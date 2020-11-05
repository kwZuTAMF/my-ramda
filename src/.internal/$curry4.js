import _ from '../_'
import $curry1 from './$curry1'
import $curry2 from './$curry2'
import $curry3 from './$curry3'

const $curry4 = f =>
  function $curried4(a, b, c, d) {
    let n = arguments.length
    if (n > 3) {
      if (a === _) {
        if (b === _) {
          if (c === _) {
            if (d === _) {
              return $curried4
            } else {
              return $curry3((a, b, c) => f(a, b, c, d))
            }
          } else if (d === _) {
            return $curry3((a, b, d) => f(a, b, c, d))
          } else {
            return $curry2((a, b) => f(a, b, c, d))
          }
        } else if (c === _) {
          if (d === _) {
            return $curry3((a, c, d) => f(a, b, c, d))
          } else {
            return $curry2((a, c) => f(a, b, c, d))
          }
        } else if (d === _) {
          return $curry2((a, d) => f(a, b, c, d))
        } else {
          return $curry1(a => f(a, b, c, d))
        }
      } else if (b === _) {
        if (c === _) {
          if (d === _) {
            return $curry3((b, c, d) => f(a, b, c, d))
          } else {
            return $curry2((b, c) => f(a, b, c, d))
          }
        } else if (d === _) {
          return $curry2((b, d) => f(a, b, c, d))
        } else {
          return $curry1(b => f(a, b, c, d))
        }
      } else if (c === _) {
        if (d === _) {
          return $curry2((c, d) => f(a, b, c, d))
        } else {
          return $curry1(c => f(a, b, c, d))
        }
      } else if (d === _) {
        return $curry1(d => f(a, b, c, d))
      } else {
        return f(a, b, c, d)
      }
    } else if (n == 3) {
      if (a === _) {
        if (b === _) {
          if (c === _) {
            return $curried4
          } else {
            return $curry3((a, b, d) => f(a, b, c, d))
          }
        } else if (c === _) {
          return $curry3((a, c, d) => f(a, b, c, d))
        } else {
          return $curry2((a, d) => f(a, b, c, d))
        }
      } else if (b === _) {
        if (c === _) {
          return $curry3((b, c, d) => f(a, b, c, d))
        } else {
          return $curry2((b, d) => f(a, b, c, d))
        }
      } else if (c === _) {
        return $curry2((c, d) => f(a, b, c, d))
      } else {
        return $curry1(d => f(a, b, c, d))
      }
    } else if (n == 2) {
      if (a === _) {
        if (b === _) {
          return $curried4
        } else {
          return $curry3((a, c, d) => f(a, b, c, d))
        }
      } else if (b === _) {
        return $curry3((b, c, d) => f(a, b, c, d))
      } else {
        return $curry2((c, d) => f(a, b, c, d))
      }
    } else if (n == 1) {
      if (a === _) {
        return $curried4
      } else {
        return $curry3((b, c, d) => f(a, b, c, d))
      }
    } else {
      return $curried4
    }
  }

export default $curry4
