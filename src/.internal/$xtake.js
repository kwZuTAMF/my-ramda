import $curry2 from './$curry2'
import $reduced from './$reduced'

const $xtake = $curry2((n, xf) => {
  let index = 0
  let count = n
  return {
    '@@transducer/init': xf['@@transducer/init'],
    '@@transducer/result': xf['@@transducer/result'],
    '@@transducer/step': (result, input) => {
      let res = count === 0 ? result : xf['@@transducer/step'](result, input)
      return ++index >= count && count >= 0 ? $reduced(res) : res
    }
  }
})

export default $xtake
