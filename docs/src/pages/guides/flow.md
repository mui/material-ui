# Flow

You can add static typing to JavaScript to improve developer productivity and code quality thanks to [Flow](https://github.com/facebook/flow)

## Installation in your own project

Have a look at the [Create React App with Flow](https://github.com/callemall/material-ui/tree/v1-beta/examples/create-react-app-with-flow) example.

1. Copy `.flowconfig`
1. Change `module.name_mapper` to your project name
1. Copy `flow` dir to seed your own local libdefs (in case you need any)
1. `yarn add -D flow-bin`
1. Decide on `enzyme` - flow is expecting it in your `package.json` because `material-ui` includes reusable `test-utils`.  If you do not want it, uncomment `L12` in the `.flowconfig`
1. Copy `package.json` script `flow`
1. `flow-typed install`
1. `yarn flow`
