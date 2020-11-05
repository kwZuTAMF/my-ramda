import $identity from './$identity'
import $isArrayLike from './$isArrayLike'
import $isTransformer from './$isTransformer'
import objOf from '../objOf'
import transducer from '../transducer'

const $stepCatArray = {
  [transducer.init]: Array,
  [transducer.step]: (xs, x) => (xs.push(x), xs),
  [transducer.result]: $identity
}
const $stepCatString = {
  [transducer.init]: String,
  [transducer.step]: (a, b) => a + b,
  [transducer.result]: $identity
}
const $stepCatObject = {
  [transducer.init]: Object,
  [transducer.step]: (result, input) =>
    Object.assign(result, $isArrayLike(input) ? objOf(...input) : input),
  [transducer.result]: $identity
}

const $stepCat = obj => {
  if ($isTransformer(obj)) {
    return obj
  }
  if ($isArrayLike(obj)) {
    return $stepCatArray
  }
  if (typeof obj === 'string') {
    return $stepCatString
  }
  if (typeof obj === 'object') {
    return $stepCatObject
  }
  throw new Error(`Cannot create transformer for  ${obj}`)
}

export default $stepCat
