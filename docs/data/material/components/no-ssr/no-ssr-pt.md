---
product: material-ui
title: Componente React Sem SSR
components: NoSsr
---

# Sem SSR

<p class="description">O NoSsr remove intencionalmente componentes do contexto de Server Side Rendering (SSR).</p>

Esse componente pode ser útil em várias situações:

- Válvula de escape para dependências quebradas que não suportam SSR.
- Melhorar o tempo para a primeira pintura no cliente renderizando somente a primeira parte da página (above the fold).
- Reduzir o tempo de renderização no servidor.
- Sob carga de servidor muito pesada, você pode ativar a degradação do serviço.
- Melhorar o tempo de interação apenas renderizando o que é importante (com a propriedade `defer`).

[A paleta](/system/palette/) com funções de estilo.

## Client-side deferring

{{"demo": "SimpleNoSsr.js"}}

## Adiamento de quadros

Em sua essência, o objetivo do componente NoSsr é **adiar a renderização**. Como está ilustrado na demonstração anterior, você pode usá-lo para adiar a renderização do servidor para o cliente.

Mas você também pode usá-lo para adiar a renderização dentro do próprio cliente. Você pode **aguardar um quadro de tela** com a propriedade `defer` para renderizar o children. React faz [2 commits](https://pt-br.reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects) em vez de 1.

{{"demo": "FrameDeferring.js"}}

## Unstyled

- 📦 [784 B gzipped](https://bundlephobia.com/package/@mui/base@latest)

As the component does not have any styles, it also comes with the Base package.

```js
import NoSsr from '@mui/base/NoSsr';
```
