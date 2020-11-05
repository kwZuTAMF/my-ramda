import $curry2 from './.internal/$curry2'
import $checkForMethod from './.internal/$checkForMethod'

/**
 * Creates a new list with the separator interposed between elements.
 *
 * Dispatches to the `intersperse` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} separator The element to add to the list.
 * @param {Array} list The list to be interposed.
 * @return {Array} The new list.
 * @example
 *
 *      R.intersperse('a', ['b', 'n', 'n', 's']); //=> ['b', 'a', 'n', 'a', 'n', 'a', 's']
 */
const intersperse = $curry2(
  $checkForMethod('intersperse', (separator, array) => {
    let res = []
    let idx = 0
    let len = array.length
    if (len) {
      res[idx] = array[idx]
      while (++idx < len) {
        res.push(separator, array[idx])
      }
    }
    return res
  })
)

export default intersperse
