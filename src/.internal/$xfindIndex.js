import $curry2 from './$curry2'
import $reduced from './$reduced'

const $xfindIndex = $curry2((f, xf) => {
  let index = -1
  let found = false
  return {
    '@@transducer/init': xf['@@transducer/init'],
    '@@transducer/result': result => {
      if (!found) {
        result = xf['@@transducer/step'](result, -1)
      }
      return xf['@@transducer/result'](result)
    },
    '@@transducer/step': (result, input) => {
      ++index
      if (f(input)) {
        found = true
        result = $reduced(xf['@@transducer/step'])(result, index)
      }
      return result
    }
  }
})

export default $xfindIndex
