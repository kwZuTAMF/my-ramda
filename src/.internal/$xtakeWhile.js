import $curry2 from './$curry2'
import $reduced from './$reduced'

const $xtakeWhile = $curry2((f, xf) => ({
  '@@transducer/init': xf['@@transducer/init'],
  '@@transducer/result': xf['@@transducer/result'],
  '@@transducer/step': (result, input) => {
    return f(input) ? xf['@@transducer/step'](result, input) : $reduced(result)
  }
}))

export default $xtakeWhile
