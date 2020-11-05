const $pipe = (f, g) => (...args) => g(f(...args))

export default $pipe
