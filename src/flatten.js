import $curry2 from './.internal/$curry2'
import $flattenIntoArray from './.internal/$flattenIntoArray'

const flatten = $curry2((depth, source) => {
  let result = []
  $flattenIntoArray(result, source, 0, depth)
  return result
})

export default flatten
