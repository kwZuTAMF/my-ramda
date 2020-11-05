import $xwrap from './$xwrap'
import $isArrayLike from './$isArrayLike'
import $isFunction from './$isFunction'
import fl from '../fantasy-land'
import transducer from '../transducer'

const $arrayReduce = (xf, acc, array) => {
  let idx = -1
  let len = array.length
  while (++idx < len) {
    acc = xf[transducer.step](acc, array[idx])
    if (acc && acc[transducer.reduced]) {
      acc = acc[transducer.value]
      break
    }
  }
  return xf[transducer.result](acc)
}

const $iterableReduce = (xf, acc, iter) => {
  let step = iter.next()
  while (!step.done) {
    acc = xf[transducer.step](acc, step.value)
    if (acc && acc[transducer.reduced]) {
      acc = acc[transducer.value]
      break
    }
    step = iter.next()
  }
  return xf[transducer.result](acc)
}

const $methodReduce = (xf, acc, obj, method) => {
  return xf[transducer.result](obj[method](xf[transducer.step]), acc)
}

const $reduce = (f, acc, coll) => {
  if ($isFunction(f)) {
    f = $xwrap(f)
  }
  if ($isArrayLike(coll)) {
    return $arrayReduce(f, acc, coll)
  }
  if ($isFunction(coll[fl.reduce])) {
    return $methodReduce(f, acc, coll, fl.reduce)
  }
  if (coll[Symbol.iterator]) {
    return $iterableReduce(f, acc, coll)
  }
  if ($isFunction(coll.reduce)) {
    return $methodReduce(f, acc, coll, 'reduce')
  }
}

export default $reduce
