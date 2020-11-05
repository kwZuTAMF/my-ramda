import $curry2 from './$curry2'

const $xtap = $curry2((f, xf) => ({
  '@@transducer/init': xf['@@transducer/init'],
  '@@transducer/result': xf['@@transducer/result'],
  '@@transducer/step': (result, input) => {
    f(input)
    return xf['@@transducer/step'](result, input)
  }
}))

export default $xtap
