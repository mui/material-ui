---
title: Componente React para Dicas
components: Tooltip
---

# Dica

<p class="description">Dicas exibem texto informativo quando os usuários passam o mouse, focalizam ou tocam em um elemento.</p>

Quando ativada, [dicas](https://material.io/design/components/tooltips.html) exibem um rótulo de texto identificando o elemento, como uma descrição de sua função.

## Dicas simples

{{"demo": "pages/components/tooltips/SimpleTooltips.js"}}

## Posicionamento de dicas

O componente `Tooltip` tem 12 **posicionamentos** para ser escolhido. Eles não têm setas direcionais; em vez disso, eles dependem do movimento que emana da fonte para transmitir direção.

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Dicas customizadas

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## Dicas com seta

Você pode usar a propriedade `arrow` para dar à sua dica uma seta indicando a qual elemento se refere.

{{"demo": "pages/components/tooltips/ArrowTooltips.js"}}

## Elemento filho customizado

A dica precisa aplicar eventos DOM ao seu elemento filho. Se o filho for um elemento React customizado, você precisará garantir que ele repasse suas propriedades para o elemento DOM subjacente.

```jsx
const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  //  Distribua as propriedades para o elemento DOM subjacente.
  return <div {...props} ref={ref}>Bin</div>
});

// ...

<Tooltip title="Excluir">
  <MyComponent>
</Tooltip>
```

Você pode encontrar um conceito similar no guia [encapaulando componentes](/guides/composition/#wrapping-components).

## Gatilhos

Você pode definir os tipos de eventos que fazem com que uma dica seja exibida.

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## Dicas Controladas

Você pode usas as propriedades `open`, `onOpen` e `onClose` para controlar o comportamento da dica.

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## Largura Variável

A dica (`Tooltip`) quebra o texto longo por padrão para torná-lo legível.

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## Interativo

Uma dica pode ser interativa. Ela não será fechada quando o usuário passar por cima da dica antes que `leaveDelay` expire.

{{"demo": "pages/components/tooltips/InteractiveTooltips.js"}}

## Elementos Desabilitados

Por padrão os elementos desabilitados como `<button>` não disparam interações do usuário, então uma `Tooltip` não será ativada em eventos normais, como passar o mouse. Para acomodar elementos desabilitados, adicione um elemento encapsulador simples, como um `span`.

> ⚠️ Para trabalhar com o Safari, você precisa de pelo menos um display block ou flex item abaixo do elemento que encapsula a dica.

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

> Se você não estiver manipulando com um componente Material-UI que herde de `ButtonBase`, por exemplo, um elemento `<button>` nativo, você também deve adicionar a propriedade CSS *pointer-events: none;* ao seu elemento quando desabilitado:

```jsx
<Tooltip title="Você não tem permissão para esta tarefa">
  <span>
    <button disabled={disabled} style={disabled ? { pointerEvents: "none" } : {}}>
      {'Um botão desabilitado'}
    </button>
  </span>
</Tooltip>
```

## Transições

Use uma transição diferente.

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## Exibindo e ocultando

A dica normalmente é exibida imediatamente quando o mouse do usuário passa sobre o elemento e se oculta imediatamente quando o mouse do usuário sai. Um atraso na exibição ou ocultação da dica pode ser adicionado por meio das propriedades `enterDelay` e `leaveDelay`, conforme mostrado na demonstração de dicas controladas acima.

No celular, a dica é exibida quando o usuário pressiona longamente o elemento e oculta após um atraso de 1500 ms. Você pode desativar esse recurso com a propriedade `disableTouchListener`.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}