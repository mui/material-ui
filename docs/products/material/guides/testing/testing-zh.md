# Testing

<p class="description">编写测试能够预防回归问题，并能够带来更好的代码。</p>

## 用户空间

It's generally recommended to test your application without tying the tests too closely to MUI. This is how MUI components are tested internally. A library that has a first-class API for this approach is [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro/).

For example, when rendering a `TextField` your test should not need to query for the specific MUI instance of the `TextField` but rather for the `input`, or `[role="textbox"]`.

By not relying on the React component tree you make your test more robust against internal changes in MUI or, if you need snapshot testing, adding additional wrapper components such as context providers. 我们不建议进行快照测试。 ["Effective snapshot testing" by Kent C. Dodds](https://kentcdodds.com/blog/effective-snapshot-testing) 详细介绍了为什么快照测试可能会对 React 组件测试产生误导。

## 内部

MUI has **a wide range** of tests so we can iterate with confidence on the components, for instance, the visual regression tests provided by [Argos-CI](https://www.argos-ci.com/mui-org/material-ui/builds) have proven to be really helpful. 若您想要进一步了解内部测试，您可以查看一下 [README](https://github.com/mui-org/material-ui/blob/HEAD/test/README.md)。
