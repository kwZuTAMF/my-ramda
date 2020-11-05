import $curry2 from './$curry2'
import $reduce from './$reduce'

const $xdropLastWhile = $curry2((f, xf) => {
  let retained = []
  return {
    '@@transducer/init': xf['@@transducer/init'],
    '@@transducer/result': xf['@@transducer/result'],
    '@@transducer/step': (result, input) => {
      if (f(input)) {
        retained.push(input)
        return result
      } else {
        result = $reduce(xf['@@transducer/step'], result, retained)
        retained = []
        return xf['@@transducer/step'](result, input)
      }
    }
  }
})

export default $xdropLastWhile
