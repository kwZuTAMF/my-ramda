import $curry1 from './.internal/$curry1'
import $isArray from './.internal/$isArray'
import $isFunction from './.internal/$isFunction'
import $map from './.internal/$map'
import apply from './apply'
import curryN from './curryN'
import keys from './keys'
import values from './values'

// Use custom mapValues function to avoid issues with specs that include a "map" key and R.map
// delegating calls to .map
const mapValues = (f, obj) => {
  return $isArray(obj)
    ? $map(f, obj)
    : keys(obj).reduce((acc, key) => {
        acc[key] = f(obj[key])
        return acc
      }, {})
}

/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
 * @param {Object} spec an object recursively mapping properties to functions for
 *        producing the values for these properties.
 * @return {Function} A function that returns an object of the same structure
 * as `spec', with each property set to the value returned by calling its
 * associated function with the supplied arguments.
 * @see R.converge, R.juxt
 * @example
 *
 *      const getMetrics = R.applySpec({
 *        sum: R.add,
 *        nested: { mul: R.multiply }
 *      });
 *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
 * @symb R.applySpec({ x: f, y: { z: g } })(a, b) = { x: f(a, b), y: { z: g(a, b) } }
 */
const applySpec = $curry1(spec => {
  spec = mapValues(v => ($isFunction(v) ? v : applySpec(v)), spec)

  return curryN(Math.max(...$map(v => v.length, values(spec)), 0), (...args) =>
    mapValues(f => apply(f, args), spec)
  )
})

export default applySpec

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

  const $isArray = Array.isArray

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

  const keys = Object.keys
  const values = Object.values

  const apply = $curry2((f, args) => f(...args))

  const mapValues = (f, obj) => {
    return $isArray(obj)
      ? $map(f, obj)
      : keys(obj).reduce((acc, key) => {
          acc[key] = f(obj[key])
          return acc
        }, {})
  }

  const applySpec = $curry1(spec => {
    spec = mapValues(v => ($isFunction(v) ? v : applySpec(v)), spec)
    console.log('spec:', spec)

    return curryN(
      Math.max(...$map(v => v.length, values(spec)), 0),
      (...args) => mapValues(f => apply(f, args), spec)
    )
  })

  const getMetrics = applySpec({
    sum: $curry2((a, b) => a + b),
    nested: { mul: $curry2((a, b) => a * b) }
  })
  getMetrics(2, 4) // => { sum: 6, nested: { mul: 8 } }
}
