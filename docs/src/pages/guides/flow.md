# Flow

You can add static typing to JavaScript to improve developer productivity and code quality thanks to [Flow](https://github.com/facebook/flow).
Have a look at the [Create React App with Flow](https://github.com/mui-org/material-ui/tree/v1-beta/examples/create-react-app-with-flow) example.

## flow-typed

[flow-typed](https://github.com/flowtype/flow-typed) is a repository of third-party library interface definitions for use with Flow.
The community is maintaining [the definitions under this project](https://github.com/flowtype/flow-typed/tree/master/definitions/npm/material-ui_v1.x.x).

## Warning

An [existing bug in flow regarding the use of higher-order components (HOC)](https://github.com/facebook/flow/issues/5382)
limits the usefulness of flow to an application.
As of November 27, 2017 we cannot recommend the use of flow typing in your application in conjunction with `material-ui`.
We encourage you to have a look at [TypeScript](/guides/typescript) instead.

This issue is under discussion in [#9312](https://github.com/mui-org/material-ui/issues/9312).
