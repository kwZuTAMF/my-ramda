import $curry2 from './.internal/$curry2'
import $map from './.internal/$map'
import curryN from './curryN'

/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. The arity of the new function is the same as the arity of
 * the longest branching function. When invoked, this new function is applied
 * to some arguments, and each branching function is applied to those same
 * arguments. The results of each branching function are passed as arguments
 * to the converging function to produce the return value.
 *
 * @func
 * @memberOf R
 * @since v0.4.2
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [((a, b, ...) -> x1), ((a, b, ...) -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} after A function. `after` will be invoked with the return values of
 *        `fn1` and `fn2` as its arguments.
 * @param {Array} functions A list of functions.
 * @return {Function} A new function.
 * @see R.useWith
 * @example
 *
 *      const average = R.converge(R.divide, [R.sum, R.length])
 *      average([1, 2, 3, 4, 5, 6, 7]) //=> 4
 *
 *      const strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
 *      strangeConcat("Yodel") //=> "YODELyodel"
 *
 * @symb R.converge(f, [g, h])(a, b) = f(g(a, b), h(a, b))
 */
const converge = $curry2((after, fns) =>
  curryN(Math.max(...$map(fn => fn.length, fns), 0), (...args) =>
    after(...$map(fn => fn(...args), fns))
  )
)

export default converge

{
  const _ = Symbol.for('@@functional/placeholder')

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

  const average = converge((a, b) => a / b, [
    xs => xs.reduce((a, b) => a + b, 0),
    x => x.length
  ])
  console.log(
    average([1, 2, 3, 4, 5, 6, 7]) //=> 4
  )

  const strangeConcat = converge((a, b) => a + b, [
    x => x.toUpperCase(),
    x => x.toLowerCase()
  ])
  console.log(
    strangeConcat('Yodel') //=> "YODELyodel"
  )
}
