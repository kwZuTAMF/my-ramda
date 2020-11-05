import $curry2 from './.internal/$curry2'
import $isFunction from './.internal/$isFunction'
import curryN from './curryN'
import raise from './raise'

/**
 * Turns a named method with a specified arity into a function that can be
 * called directly supplied with arguments and a target object.
 *
 * The returned function is curried and accepts `arity + 1` parameters where
 * the final parameter is the target object.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
 * @param {Number} arity Number of arguments the returned function should take
 *        before the target object.
 * @param {String} method Name of any of the target object's methods to call.
 * @return {Function} A new curried function.
 * @see R.construct
 * @example
 *
 *      const sliceFrom = R.invoker(1, 'slice');
 *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 *      const sliceFrom6 = R.invoker(2, 'slice')(6);
 *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 *
 *      const dog = {
 *        speak: async () => 'Woof!'
 *      };
 *      const speak = R.invoker(0, 'speak');
 *      speak(dog).then(console.log) //~> 'Woof!'
 *
 * @symb R.invoker(0, 'method')(o) = o['method']()
 * @symb R.invoker(1, 'method')(a, o) = o['method'](a)
 * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)
 */
const invoker = $curry2((arity, method) =>
  curryN(arity + 1, (...args) => {
    let target = args[arity]
    if (target != null && $isFunction(target[method])) {
      return target[method](args.slice(0, arity))
    }
    raise(TypeError, `${target} does not have a method named "${method}"`)
  })
)

export default invoker

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

  const $curryN = (n, f, xs = []) => (...ys) => {
    for (
      var i = 0, j = 0, k = n, x = xs.length, y = ys.length, a = [];
      i < x || j < y;
      i++
    ) {
      _ === (a[i] = i < x && (xs[i] !== _ || j >= y) ? xs[i] : ys[j++]) || k--
    }
    return k > 0 ? $arity(k, $curryN(n, f, a)) : f(...a)
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

  const invoker = $curry2((arity, method) =>
    curryN(arity + 1, (...args) => {
      let target = args[arity]
      if (target != null && $isFunction(target[method])) {
        return target[method](args.slice(0, arity))
      }
      raise(TypeError, `${target} does not have a method named "${method}"`)
    })
  )

  let join = invoker(1, 'join')

  const spacer = join(' ')
  console.log(spacer(['a', 2, 3.4])) //=> 'a 2 3.4'
  console.log(join('|', [1, 2, 3])) //=> '1|2|3'
}
