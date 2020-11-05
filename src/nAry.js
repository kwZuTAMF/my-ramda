import $curry2 from './.internal/$curry2'

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly `n` parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} n The desired arity of the new function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity `n`.
 * @see R.binary, R.unary
 * @example
 *
 *      const takesTwoArgs = (a, b) => [a, b];
 *
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      const takesOneArg = R.nAry(1, takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only `n` arguments are passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.nAry(0, f)(a, b) = f()
 * @symb R.nAry(1, f)(a, b) = f(a)
 * @symb R.nAry(2, f)(a, b) = f(a, b)
 */
const nAry = $curry2((n, f) => {
  switch (n) {
    case 0: return () => f()
    case 1: return ($0) => f($0)
    case 2: return ($0, $1) => f($0, $1)
    case 3: return ($0, $1, $2) => f($0, $1, $2)
    case 4: return ($0, $1, $2, $3) => f($0, $1, $2, $3)
    case 5: return ($0, $1, $2, $3, $4) => f($0, $1, $2, $3, $4)
    case 6: return ($0, $1, $2, $3, $4, $5) => f($0, $1, $2, $3, $4, $5)
    case 7: return ($0, $1, $2, $3, $4, $5, $6) => f($0, $1, $2, $3, $4, $5, $6)
    case 8: return ($0, $1, $2, $3, $4, $5, $6, $7) => f($0, $1, $2, $3, $4, $5, $6, $7)
    case 9: return ($0, $1, $2, $3, $4, $5, $6, $7, $8) => f($0, $1, $2, $3, $4, $5, $6, $7, $8)
    case 10: return ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) => f($0, $1, $2, $3, $4, $5, $6, $7, $8, $9)
    default: throw new Error('First argument to nAry must be a non-negative integer no greater than ten')
  }
})

export default nAry
