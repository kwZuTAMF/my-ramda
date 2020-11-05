import $curry1 from './.internal/$curry1'
import curryN from './curryN'

const curry = $curry1(f => curryN(f.length, f))

export default curry
