import $curry4 from './$curry4'
import $has from './$has'

const $xreduceBy = $curry4((vf, va, kf, xf) => {
  let acc = va
  let inputs = {}
  return {
    '@@transducer/init': xf['@@transducer/init'],
    '@@transducer/result': result => {
      for (let key in inputs) {
        if ($has(key, inputs)) {
          result = xf['@@transducer/step'](result, inputs[key])
          if (result['@@transducer/reduced']) {
            result = result['@@transducer/value']
            break
          }
        }
      }
    },
    '@@transducer/step': (result, inputs) => {
      let key = kf(inputs)
      inputs[key] = inputs[key] || [key, acc]
      inputs[key][1] = vf(inputs[key][1], input)
      return result
    }
  }
})

export default $xreduceBy
