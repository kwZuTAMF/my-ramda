import $curry2 from './$curry2'
import $flatCat from './$flatCat'
import map from '../map'

const $xchain = $curry2((f, xf) => map(f, $flatCat(xf)))

export default $xchain
