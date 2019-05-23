---
title: Componente React para Dicas
components: Tooltip
---

# Dicas

<p class="description">Dicas exibem texto informativo quando os usuários passam o mouse, focalizam ou tocam em um elemento.</p>

Quando ativada, [dicas](https://material.io/design/components/tooltips.html) exibem um rótulo de texto identificando o elemento, como uma descrição de sua função.

## Dicas simples

{{"demo": "pages/components/tooltips/SimpleTooltips.js"}}

## Posicionamento de dicas

A dica (`Tooltip`) tem 12 **locais de posicionamento** para escolha. Elas não têm setas direcionais; em vez disso, elas dependem do movimento sobre a fonte para se exibirem na posição configurada.

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Dicas customizadas

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescrita](/customization/components/).

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## Elemento filho customizado

A dica precisa aplicar eventos DOM do tipo "listeners" para seu elemento filho. Se o filho for um elemento React customizado, você precisa garantir que ele estenda suas propriedades para o elemento DOM subjacente.

```jsx
function MyComponent (props) {
  // Distribuímos as propriedades para o elemento DOM subjacente.
  return <div {...props}>Bin</div>
}

// ...

<Tooltip title="Excluir">
  <MyComponent>
</Tooltip>
```

Você pode encontrar um conceito similar no guia de [componentes de encapsulamento](/guides/composition/#wrapping-components).

## Gatilhos

Você pode definir os tipos de eventos que fazem com que uma dica seja exibida.

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## Dicas Controladas

Você pode usas as propriedades `open`, `onOpen` e `onClose` para controlar o comportamento da dica.

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## Largura Variável

A dica (`Tooltip`) quebra o texto longo por padrão para torná-lo legível.

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## Interativa

Uma dia pode ser interativa. Ela não será fechada quando o usuário passar por cima da dica antes que `leaveDelay` expire.

{{"demo": "pages/components/tooltips/InteractiveTooltips.js"}}

## Elementos Desativados

Por padrão os elementos desativados como `<button>` não disparam interações do usuário, então uma `Tooltip` não será ativada em eventos normais, omo passar o mouse. Para acomodar elementos desativados, adicione um elemento encapsulador simples como um `span`.

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

## Transições

Use uma transição diferente.

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## Mostrando e ocultando

A dica normalmente é mostrada imediatamente quando o mouse do usuário passa sobre o elemento e se oculta imediatamente quando o mouse do usuário sai. Um atraso na exibição ou ocultação da dica pode ser adicionado por meio das propriedades `enterDelay` e `leaveDelay`, conforme mostrado na demonstração de dicas controladas acima.

Em mobile, a dica é exibida quando o usuário pressiona longamente o elemento e oculta após um atraso de 1500 ms. Você pode desativar esse recurso com a propriedade `disableTouchListener`.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}