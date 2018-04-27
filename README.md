# Run Control

> Utils help control function run.

## Deprecation

**This package is deprecated, consider using the following packages instead:**

- [retry-func](https://github.com/zhaoyao91/retry-func)
- [rate-limit-func](https://github.com/zhaoyao91/rate-limit-func)
- [runs-limit-func](https://github.com/zhaoyao91/runs-limit-func)

## Introduction

Say, you have an async function with only one argument: options, like [request-facebook](https://github.com/zhaoyao91/request-facebook), now
you can leverage this package to easily enhance that function with **retry**, **rate limit** and **parallel limit**.

## Installation

```
npm i run-control
``` 

## Usage

```ecmascript 6
const {compose, withDefaultOptions, withRetry, withRateLimit, withParallelLimit} = require('run-control')
const requestFacebook = require('request-facebook')

// all features are implemented as high order functions
// so you can just compose them
const myRequestFacebook = compose(
  // feed default options
  withDefaultOptions({accessToken: ...}),
  
  // retry if failed
  withRetry({times: 5}),
  
  // limit max task in parallel
  withParallelLimit(1000),
  
  // limit dispatched tasks per second
  withRateLimit(100),
)(requestFacebook)

// now you can call the enhanced function with all the features you added
for (let i = 0; i < 10000; i++) {
  myRequestFacebook({...}).then(...).catch(...)
}
```

## API

Type definitions:

- target: async func(options?) => any
- wrapper: func(target) => target

### compose

`func(...wrappers) => wrapper`

### withDefaultOptions

Provide default options.

`func(defaultOptions) => wrapper`

### withRetry

Retry some times if task failed.

`func({times, onRetry}) => wrapper`

See [retry-times](https://github.com/zhaoyao91/retry-times) for more about the available options.

### withRateLimit

Only dispatch limited tasks within a second.

`func(rate) => wrapper`

- rate: Number - max tasks to be run within a second.

### withParallelLimit

Only limited tasks can be run at a any moment.

`func(parallelLimit) => wrapper`

- parallelLimit: Number - max tasks in parallel

## License

MIT