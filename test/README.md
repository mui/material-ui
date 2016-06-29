# Material-UI Testing

Thanks for writing tests! Here's a quick run-down on our current setup.

#### Tools we use

Please familiarise yourself with these if you plan on contributing! :+1:

 - [enzyme](https://github.com/airbnb/enzyme)
 - [mocha](https://mochajs.org)
 - [chai](http://chaijs.com)
 - [jsdom](https://github.com/tmpvar/jsdom)


## Commands

##### Run unit and integration tests in node
`npm run test`

##### Run unit tests
`npm run test unit` or `npm run test:unit`

##### Watch unit tests
`npm run test:unit:watch`

##### Unit test a specific Component (also works with `:watch`)
`-c` / `--component`  
`npm run test:unit -- -c Avatar`

##### Unit test with a mocha grep (also works with `:watch`)
`-g` / `--grep`  
`npm run test:unit -- -g "Grep this"`

##### Integration tests
Same as unit tests but with `:integration`

##### Run all tests using Karma (if you like waiting for webpack)
`npm run test:karma`


## Writing Tests

For all unit tests, please use the [shallow renderer](https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md) from `enzyme` unless the Component being tested requires a DOM. [Here's](https://github.com/callemall/material-ui/blob/master/src/Avatar/Avatar.spec.js) a small shallow rendered test to get you started.

If the Component being unit tested requires a DOM, you can use the [mount api](https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md) from `enzyme`. For some operations you may still need to use the React test utils, but try to use the `enzyme` API as much as possible.

Stick to test assertions such as `assert.strictEqual` and `assert.ok`. This helps keep tests simple and readable.
