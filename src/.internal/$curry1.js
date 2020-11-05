import _ from '../_'

const $curry1 = f =>
  function $curried1(a) {
    return arguments.length && a !== _ ? f(a) : $curried1
  }

export default $curry1
