const $forceReduced = x => ({
  '@@transducer/value': x,
  '@@transducer/reduced': true
})

export default $forceReduced
