import $curry2 from './.internal/$curry2'
import $map from './.internal/$map'
import $reduce from './.internal/$reduce'
import ap from './ap'
import curryN from './curryN'

/**
 * "lifts" a function to be the specified arity, so that it may "map over" that
 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig Number -> (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.lift, R.ap
 * @example
 *
 *      const madd3 = R.liftN(3, (...args) => R.sum(args));
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 */
const liftN = $curry2((n, f) =>
  curryN(n, (...args) =>
    $reduce(ap, $map(curryN(n, f), args[0]), args.slice(1))
  )
)

export default liftN

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

  const $isFunction = x => typeof x === 'function'

  const $map = (mapper, functor) => {
    let idx = -1
    let len = functor.length
    let res = []
    while (++idx < len) {
      res[idx] = mapper(functor[idx])
    }
    return res
  }

  const ap = (f, x) =>
    $isFunction(f.ap)
      ? f.ap(x)
      : $isFunction(f)
      ? x => f(x)(x(x))
      : f.reduce((acc, f) => [...acc, ...$map(f, x)], [])

  // ap([R.multiply(2), R.add(3)], [1, 2, 3]) //=> [2, 4, 6, 4, 5, 6]
  ap([b => 2 * b, b => 3 + b], [1, 2, 3])
  //  [2, 4, 6, 4, 5, 6]

  // ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad'])
  //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
  ap([b => 'tasty ' + b, x => x.toUpperCase()], ['pizza', 'salad'])
  // ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]

  // const liftN = $curry2((n, f) =>
  //   curryN(n, (...args) =>
  //     args.slice(1).reduce(ap, $map(curryN(n, f), args[0]))
  //   )
  // )

  const liftN = $curry2((n, f) => {
    let lifted = curryN(n, f)
    return curryN(n, (...args) => {
      return args.slice(1).reduce(ap, $map(lifted, args[0]))
    })
  })

  const sum = xs => xs.reduce((a, b) => a + b, 0)

  const madd3 = liftN(3, (...args) => sum(args))
  madd3([1, 2, 3], [1, 2, 3], [1]) //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
}
