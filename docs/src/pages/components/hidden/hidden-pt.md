---
title: Componente React Hidden
components: Hidden
---

# Hidden

<p class="description">Modifique rapidamente e de forma responsiva a visibilidade dos componentes e faça muito mais com o utilitário hidden.</p>

Todos os elementos são visíveis a menos que **estejam explicitamente ocultos**. Para facilitar a integração com [pontos de quebra responsivos](/customization/breakpoints/) do Material-UI, este componente pode ser utilizado para ocultar qualquer conteúdo, ou você pode usa-lo de forma conjunta com um componente [`Grid`](/components/grid/).

## Como funciona

Hidden trabalha com um intervalo de pontos de quebra, por exemplo, `xsUp` ou `mdDown`, ou com um ou mais pontos de quebra, por exemplo, `only='sm'` ou `only={['md', 'xl']}`. Intervalos e pontos de quebra individuais podem ser usados simultaneamente para obter um comportamento muito mais customizado. Os intervalos são inclusivos com os pontos de quebra especificados.

```js
innerWidth  |xs      sm       md       lg       xl
            |--------|--------|--------|--------|-------->
width       |   xs   |   sm   |   md   |   lg   |   xl

smUp        |   show | hide
mdDown      |                     hide | show

```

## Implementações

### js

Por padrão, a implementação `js` é usada, responsivamente oculta o conteúdo baseando-se no uso de [`withWidth()`](/customization/breakpoints/#withwidth), componente de ordem elevada (higher-order) que observa o tamanho da tela. Isso tem o benefício de não renderizar nenhum conteúdo, a menos que o ponto de quebra seja atingido.

### css

Se você estiver usando a renderização do lado do servidor, poderá definir `implementation="css"` se não quer que o navegador reprocesse seu conteúdo na tela.

## Ponto de quebra acima

Usando qualquer propriedade de ponto de quebra com `up`, o componente *children* será ocultado *em ou acima* do ponto de quebra.

{{"demo": "pages/components/hidden/BreakpointUp.js", "bg": true}}

## Ponto de quebra abaixo

Usando qualquer propriedade de ponto de quebra com `down`, o componente *children* será ocultado *em ou abaixo* do ponto de quebra.

{{"demo": "pages/components/hidden/BreakpointDown.js", "bg": true}}

## Ponto de quebra somente

Usando a propriedade de ponto de quebra `only`, o componente *children* será ocultado *no(s)* ponto(s) de quebra especificado(s).

A propriedade `only` pode ser usada de duas maneiras:

- com um único ponto de quebra
- com um array de pontos de quebra

{{"demo": "pages/components/hidden/BreakpointOnly.js", "bg": true}}

## Integração com Grade

É bastante comum alterar um `Grid` em pontos de quebra responsivos diferentes e, em muitos casos, você deseja ocultar alguns desses elementos.

{{"demo": "pages/components/hidden/GridIntegration.js", "bg": true}}