import $arity from './.internal/$arity'
import $curry2 from './.internal/$curry2'

/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided initially followed by the arguments provided to `g`.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partialRight, R.curry
 * @example
 *
 *      const multiply2 = (a, b) => a * b;
 *      const double = R.partial(multiply2, [2]);
 *      double(2); //=> 4
 *
 *      const greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      const sayHello = R.partial(greet, ['Hello']);
 *      const sayHelloToMs = R.partial(sayHello, ['Ms.']);
 *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partial(f, [a, b])(c, d) = f(a, b, c, d)
 */
const partial = $curry2((f, ...preset) =>
  $arity(Math.max(f.length - preset.length, 0), (...rest) =>
    f(...preset, ...rest)
  )
)

export default partial
