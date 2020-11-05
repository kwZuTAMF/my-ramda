import $curry1 from './.internal/$curry1'
import converge from './converge'

/**
 * juxt applies a list of functions to a list of values.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Function
 * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
 * @param {Array} fns An array of functions
 * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
 * @see R.applySpec
 * @example
 *
 *      const getRange = R.juxt([Math.min, Math.max]);
 *      getRange(3, 4, 9, -3); //=> [-3, 9]
 * @symb R.juxt([f, g, h])(a, b) = [f(a, b), g(a, b), h(a, b)]
 */
const juxt = $curry1(fns => converge((...args) => args, fns))

export default juxt

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
    return k > 0 ? $arity(k, $curryN(n, f, xs)) : f(...xs)
  }

  const curryN = $curry2((n, f) => {
    if (n === 1) {
      return $curry1(f)
    // } else if (n === 2) {
    //   return $curry2(f)
    // } else if (n === 3) {
    //   return $curry3(f)
    // } else if (n === 4) {
    //   return $curry4(f)
    } else {
      return $arity(n, $curryN(n, f))
    }
  })

  const curry = $curry1(f => curryN(f.length, f))

  const $map = (mapper, functor) => {
    let idx = -1
    let len = functor.length
    let res = []
    while (++idx < len) {
      res[idx] = mapper(functor[idx])
    }
    return res
  }

  const converge = $curry2((after, fns) =>
    curryN(Math.max(...$map(fn => fn.length, fns), 0), (...args) =>
      after(...$map(fn => fn(...args), fns))
    )
  )

  const juxt = $curry1(fns => converge((...args) => args, fns))

  const getRange = juxt([Math.min, Math.max])
  // debugger
  getRange(3, 4, 9, -3) //=> [-3, 9]
}
