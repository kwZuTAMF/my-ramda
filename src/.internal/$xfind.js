import $curry2 from './$curry2'
import $reduced from './$reduced'

const $xfind = $curry2((f, xf) => {
  let found = false
  return {
    '@@transducer/init': xf['@@transducer/init'],
    '@@transducer/result': result => {
      if (!found) {
        result = xf['@@transducer/step'](result, undefined)
      }
      return xf['@@transducer/result'](result)
    },
    '@@transducer/step': (result, input) => {
      if (f(input)) {
        found = true
        result = $reduced(xf['@@transducer/step'])(result, input)
      }
      return result
    }
  }
})

export default $xfind
