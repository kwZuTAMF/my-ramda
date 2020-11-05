import $curry2 from './.internal/$curry2'
import $flattenIntoArray from './.internal/$flattenIntoArray'

const flattenMap = $curry2((mapper, source) => {
  let result = []
  $flattenIntoArray(result, source, 0, 1, mapper)
  return result
})

export default flattenMap
