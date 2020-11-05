import $identity from './$identity'
import binary from '../binary'

const $xwrap = f => ({
  '@@transducer/init': () => {
    throw new Error('init not implemented')
  },
  '@@transducer/result': $identity,
  '@@transducer/step': binary(f)
})

export default $xwrap
