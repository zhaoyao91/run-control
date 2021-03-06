const {retryTimes} = require('retry-times')

module.exports = function (retryOptions) {
  return function wrap (fn) {
    return function (options) {
      return retryTimes(retryOptions, () => fn(options))
    }
  }
}