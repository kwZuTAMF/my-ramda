import $curry2 from './$curry2'

const $xdropWhile = $curry2((f, xf) => ({
  '@@transducer/init': xf['@@transducer/init'],
  '@@transducer/result': xf['@@transducer/result'],
  '@@transducer/step': (result, input) => {
    return f(input) ? result : xf['@@transducer/step'](result, input)
  }
}))

export default $xdropWhile
