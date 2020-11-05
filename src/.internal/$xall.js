import $curry2 from './$curry2'
import $reduced from './$reduced'

const $xall = $curry2((f, xf) => {
  let all = true
  return {
    '@@transducer/init': xf['@@transducer/init'],
    '@@transducer/result': result => {
      if (all) {
        result = xf['@@transducer/step'](result, true)
      }
      return xf['@@transducer/result'](result)
    },
    '@@transducer/step': (result, input) => {
      if (!f(input)) {
        all = false
        result = $reduced(xf['@@transducer/step'])(result, false)
      }
      return result
    }
  }
})

export default $xall
