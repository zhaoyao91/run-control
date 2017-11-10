module.exports = function (defaultOptions) {
  return function wrap (fn) {
    return function (options) {
      return fn({...defaultOptions, ...options})
    }
  }
}