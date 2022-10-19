# Testando

<p class="description">Escreva testes para evitar regressões e ter uma boa qualidade de código.</p>

## Espaço do usuário

Geralmente é recomendado testar sua aplicação sem vincular os testes ao Material-UI. É assim que os componentes do Material-UI são testados internamente. A library that has a first-class API for this approach is [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro/).

Por exemplo, ao renderizar um `TextField` seu teste não precisa consultar a instância específica do Material-UI do `TextField`, mas sim um `input`, ou `[role="textbox"]`.

Ao não depender da árvore de componentes React você torna seu teste mais robusto contra mudanças internas no Material-UI ou se você precisar de testes de snapshot, adicione componentes encapsulados adicionais como provedores de contexto. No entanto, não recomendamos teste de snapshot. ["Effective snapshot testing" por Kent C. Dodds](https://kentcdodds.com/blog/effective-snapshot-testing) entra em mais detalhes do porque testes de snapshot podem induzir em erro para testes de componentes React.

## Interno

MUI has **a wide range** of tests so we can iterate with confidence on the components, for instance, the visual regression tests provided by [Argos-CI](https://app.argos-ci.com/mui/material-ui/builds) have proven to be really helpful. Para saber mais sobre os testes internos, você pode dar uma olhada no [LEIA-ME](https://github.com/mui/material-ui/blob/HEAD/test/README.md).
