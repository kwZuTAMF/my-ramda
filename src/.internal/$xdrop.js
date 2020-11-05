import $curry2 from './$curry2'

const $xdrop = $curry2((n, xf) => {
  let left = n
  return {
    '@@transducer/init': xf['@@transducer/init'],
    '@@transducer/result': xf['@@transducer/result'],
    '@@transducer/step': (result, input) => {
      if (left > 0) {
        left--
        return result
      }
      return xf['@@transducer/step'](result, input)
    }
  }
})

export default $xdrop
