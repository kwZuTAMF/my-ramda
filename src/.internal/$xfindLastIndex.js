import $curry2 from './$curry2'

const $xfind = $curry2((f, xf) => {
  let index = -1
  let lastIndex = -1
  return {
    '@@transducer/init': xf['@@transducer/init'],
    '@@transducer/result': result => {
      return xf['@@transducer/result'](
        xf['@@transducer/step'](result, lastIndex)
      )
    },
    '@@transducer/step': (result, input) => {
      ++index
      if (f(input)) {
        lastIndex = index
      }
      return result
    }
  }
})

export default $xfind
