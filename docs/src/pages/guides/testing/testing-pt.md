# Testando

<p class="description">Escreva testes para evitar regressões e ter uma boa qualidade de código.</p>

## Espaço do usuário

It's generally recommended to test your application without tying the tests too closely to Material-UI. This is how Material-UI components are tested internally. A library that has a first-class API for this approach is [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro).

For example, when rendering a `TextField` your test should not need to query for the specific Material-UI instance of the `TextField` but rather for the `input`, or `[role="textbox"]`.

By not relying on the React component tree you make your test more robust against internal changes in Material-UI or, if you need snapshot testing, adding additional wrapper components such as context providers. We don't recommend snapshot testing though. ["Effective snapshot testing" by Kent C. Dodds](https://kentcdodds.com/blog/effective-snapshot-testing) goes into more details why snapshot testing might be misleading for React component tests.

## Interno

Material-UI tem **uma vasta gama** de testes para que possamos liberar os componentes com confiança, por exemplo, os testes de regressão visual são feitos através da [Argos-CI](https://www.argos-ci.com/mui-org/material-ui), provaram ser realmente úteis. Para saber mais sobre os testes internos, você pode dar uma olhada no [LEIA-ME](https://github.com/mui-org/material-ui/blob/HEAD/test/README.md).
