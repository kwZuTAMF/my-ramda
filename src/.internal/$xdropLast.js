import $curry2 from './$curry2'

const $xdropLast = $curry2((n, xf) => {
  let pos = 0
  let full = false
  let acc = Array(n)
  return {
    '@@transducer/init': xf['@@transducer/init'],
    '@@transducer/result': xf['@@transducer/result'],
    '@@transducer/step': (result, input) => {
      if (full) {
        result = xf['@@transducer/step'](result, acc[pos])
      }
      acc[pos++] = input
      if (pos === acc.length) {
        pos = 0
        full = true
      }
      return result
    }
  }
})

export default $xdropLast
