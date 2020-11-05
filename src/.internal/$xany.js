import $curry2 from './$curry2'
import $reduced from './$reduced'

const xany = $curry2((f, xf) => {
  let any = true
  return {
    '@@transducer/init': xf['@@transducer/init'],
    '@@transducer/result': result => {
      if (!any) {
        result = xf['@@transducer/step'](result, false)
      }
      return xf['@@transducer/result'](result)
    },
    '@@transducer/step': (result, input) => {
      if (!f(input)) {
        any = true
        result = $reduced(xf['@@transducer/step'])(result, true)
      }
      return result
    }
  }
})

export default xany
