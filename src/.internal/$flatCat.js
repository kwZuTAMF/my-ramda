import $forceReduced from './$forceReduced'
import $isArrayLike from './$isArrayLike'
import $reduce from './$reduce'
import transducer from '../transducer'

const preservingReduced = xf => ({
  [transducer.init]: xf[transducer.init],
  [transducer.result]: xf[transducer.result],
  [transducer.step]: (result, input) => {
    let res = xf[transducer.step](result, input)
    return res[transducer.reduced] ? $forceReduced(res) : res
  }
})

const $flatCat = xf => {
  let rxf = preservingReduced(xf)
  return {
    [transducer.init]: xf[transducer.init],
    [transducer.result]: result => rxf[transducer.result](result),
    [transducer.step]: (result, input) =>
      $reduce(rxf, result, $isArrayLike(input) ? input : [input])
  }
}

export default $flatCat
