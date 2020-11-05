import $arity from './.internal/$arity'
import $curry1 from './.internal/$curry1'
import $curry2 from './.internal/$curry2'
import $curry3 from './.internal/$curry3'
import $curry4 from './.internal/$curry4'
import $curryN from './.internal/$curryN'
import _ from './_'

const curryN = $curry2((n, f) => {
  if (n === 1) {
    return $curry1(f)
  // } else if (n === 2) {
  //   return $curry2(f)
  // } else if (n === 3) {
  //   return $curry3(f)
  // } else if (n === 4) {
  //   return $curry4(f)
  } else {
    return $arity(n, $curryN(n, f, []))
  }
})

export default curryN
