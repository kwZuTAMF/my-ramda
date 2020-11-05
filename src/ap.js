import $curry2 from './.internal/$curry2'
import $isFunction from './.internal/$isFunction'
import $map from './.internal/$map'
import $reduce from './.internal/$reduce'
import fl from './fantasy-land'

/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the second argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig [a -> b] -> [a] -> [b]
 * @sig Apply f => f (a -> b) -> f a -> f b
 * @sig (r -> a -> b) -> (r -> a) -> (r -> b)
 * @param {*} applyF
 * @param {*} applyX
 * @return {*}
 * @example
 *
 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
 *
 *      // R.ap can also be used as S combinator
 *      // when only two functions are passed
 *      R.ap(R.concat, R.toUpper)('Ramda') //=> 'RamdaRAMDA'
 * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
 */
const ap = $curry2((f, x) =>
  $isFunction(x[fl.ap])
    ? x[fl.ap](f)
    : $isFunction(f.ap)
    ? f.ap(x)
    : $isFunction(f)
    ? x => f(x)(x(x))
    : $reduce((acc, f) => [...acc, ...$map(f, x)], [], f)
)

export default ap

{
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
}
