import $curry2 from './.internal/$curry2'
import curryN from './curryN'

/**
 * Returns a function of arity `n` from a (manually) curried function.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Function
 * @sig Number -> (a -> b) -> (a -> c)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to uncurry.
 * @return {Function} A new function.
 * @see R.curry
 * @example
 *
 *      const addFour = a => b => c => d => a + b + c + d;
 *
 *      const uncurriedAddFour = R.uncurryN(4, addFour);
 *      uncurriedAddFour(1, 2, 3, 4); //=> 10
 */
const uncurryN = $curry2((depth, f) =>
  curryN(depth, (...args) => {
    let idx = 0
    let val = f
    let cnt = 0
    let end
    while (++cnt <= depth && typeof val === 'function') {
      end = cnt === depth ? args.length : idx + val.length
      val = val(...args.slice(idx, end))
      idx = end
    }
    return val
  })
)

export default uncurryN

{
  const _ = Symbol.for('@@functional/placeholder')

  const $arity = (n, f) => {
    if (n >>> 0 !== n) {
      throw new RangeError(`'n' must be an integer between 0 and 2^32-1.`)
    }
    return new Proxy(f, {
      get(target, key) {
        return key === 'length' ? n : Reflect.get(target, key)
      }
    })
  }

  const $curry1 = f =>
    function $curried1(a) {
      return arguments.length && a !== _ ? f(a) : $curried1
    }

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

  const $curryN = (n, f, xs = []) => (...ys) => {
    for (
      var i = 0, j = 0, k = n, x = xs.length, y = ys.length;
      i < x || j < y;
      i++
    ) {
      _ === (xs[i] = i < x && (xs[i] !== _ || j >= y) ? xs[i] : ys[j++]) || k--
    }
    return k ? $arity(k, $curryN(n, f, xs)) : f(...xs)
  }

  const curryN = $curry2((n, f) => {
    if (n === 1) {
      return $curry1(f)
    } else if (n === 2) {
      return $curry2(f)
    } else if (n === 3) {
      return $curry3(f)
    } else if (n === 4) {
      return $curry4(f)
    } else {
      return $arity(n, $curryN(n, f))
    }
  })

  const curry = $curry1(f => curryN(f.length, f))

  const uncurryN = $curry2((depth, f) =>
    curryN(depth, (...args) => {
      let idx = 0
      let val = f
      let cnt = 0
      let end
      while (++cnt <= depth && typeof val === 'function') {
        end = cnt === depth ? args.length : idx + val.length
        val = val(...args.slice(idx, end))
        idx = end
      }
      return val
    })
  )

  const addFour = a => b => c => d => a + b + c + d

  const uncurriedAddFour = uncurryN(4, addFour)
  uncurriedAddFour(1, 2, 3, 4) //=> 10
}
