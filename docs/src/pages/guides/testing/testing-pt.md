# Testando

<p class="description">Escreva testes para evitar regressões e ter uma boa qualidade de código.</p>

## Espaço do usuário

It's generally recommended to test your application without tying the tests too closely to MUI. This is how MUI components are tested internally. A library that has a first-class API for this approach is [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro/).

For example, when rendering a `TextField` your test should not need to query for the specific MUI instance of the `TextField` but rather for the `input`, or `[role="textbox"]`.

By not relying on the React component tree you make your test more robust against internal changes in MUI or, if you need snapshot testing, adding additional wrapper components such as context providers. No entanto, não recomendamos teste de snapshot. ["Effective snapshot testing" por Kent C. Dodds](https://kentcdodds.com/blog/effective-snapshot-testing) entra em mais detalhes do porque testes de snapshot podem induzir em erro para testes de componentes React.

## Interno

MUI has **a wide range** of tests so we can iterate with confidence on the components, for instance, the visual regression tests provided by [Argos-CI](https://www.argos-ci.com/mui-org/material-ui/builds) have proven to be really helpful. Para saber mais sobre os testes internos, você pode dar uma olhada no [LEIA-ME](https://github.com/mui-org/material-ui/blob/HEAD/test/README.md).
