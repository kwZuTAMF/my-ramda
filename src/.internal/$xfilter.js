import $curry2 from './$curry2'

const $xfilter = $curry2((f, xf) => ({
  '@@transducer/init': xf['@@transducer/init'],
  '@@transducer/result': xf['@@transducer/result'],
  '@@transducer/step': (result, input) => {
    return f(input) ? xf['@@transducer/step'](result, input) : result
  }
}))

export default $xfilter
