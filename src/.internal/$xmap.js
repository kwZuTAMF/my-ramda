import $curry2 from './$curry2'

const $xmap = $curry2((f, xf) => ({
  '@@transducer/init': xf['@@transducer/init'],
  '@@transducer/result': xf['@@transducer/result'],
  '@@transducer/step': (result, input) => {
    return xf['@@transducer/step'](result, f(input))
  }
}))

export default $xmap
