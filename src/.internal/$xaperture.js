import $curry2 from './$curry2'

const $xaperture = $curry2((n, xf) => {
  let pos = 0
  let acc = Array(n)
  let full = false
  return {
    '@@transducer/init': xf['@@transducer/init'],
    '@@transducer/result': xf['@@transducer/result'],
    '@@transducer/step': (result, input) => {
      acc[pos++] = input
      if (pos === acc.length) {
        pos = 0
        full = true
      }
      return full
        ? xf['@@transducer/step'](result, [
            ...acc.slice(pos),
            ...acc.slice(0, pos)
          ])
        : result
    }
  }
})

export default $xaperture
