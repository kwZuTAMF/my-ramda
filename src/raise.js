import $curry2 from './.internal/$curry2'

const raise = $curry2((error, message) => {
  throw new error(message)
})

export default raise
