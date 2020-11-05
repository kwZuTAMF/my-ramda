const $isTransformer = obj =>
  !!obj &&
  typeof obj === 'object' &&
  typeof obj['@@transducer/step'] === 'function'

export default $isTransformer
