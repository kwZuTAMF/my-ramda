import $curry2 from './$curry2'

const $xfind = $curry2((f, xf) => {
  let last
  return {
    '@@transducer/init': xf['@@transducer/init'],
    '@@transducer/result': result => {
      return xf['@@transducer/result'](xf['@@transducer/step'](result, last))
    },
    '@@transducer/step': (result, input) => {
      if (f(input)) {
        last = input
      }
      return result
    }
  }
})

export default $xfind
