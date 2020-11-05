const $arity = (n, f) => {
  if (n >>> 0 !== n) {
    throw new RangeError(`'n' must be an integer between 0 and 2^32-1.`)
  }
  return new Proxy(f, {
    get(target, key) {
      return key === 'length' ? n : Reflect.get(target, key)
    }
  })
}

// const $arity = (n, f) => {
//   switch (n) {
//     case 0: return function() { return f(...arguments) }
//     case 1: return function($0) { return f(...arguments) }
//     case 2: return function($0, $1) { return f(...arguments) }
//     case 3: return function($0, $1, $2) { return f(...arguments) }
//     case 4: return function($0, $1, $2, $3) { return f(...arguments) }
//     case 5: return function($0, $1, $2, $3, $4) { return f(...arguments) }
//     case 6: return function($0, $1, $2, $3, $4, $5) { return f(...arguments) }
//     case 7: return function($0, $1, $2, $3, $4, $5, $6) { return f(...arguments) }
//     case 8: return function($0, $1, $2, $3, $4, $5, $6, $7) { return f(...arguments) }
//     case 9: return function($0, $1, $2, $3, $4, $5, $6, $7, $8) { return f(...arguments) }
//     case 10: return function($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) { return f(...arguments) }
//     default: throw new Error( 'First argument to $arity must be a non-negative integer no greater than ten')
//   }
// }

export default $arity
