---
title: Componente React para Dicas
components: Tooltip
githubLabel: 'component: Tooltip'
materialDesign: https://material.io/components/tooltips
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#tooltip'
---

# Dicas

<p class="description">Dicas exibem texto informativo quando os usuários passam o mouse, focalizam ou tocam em um elemento.</p>

Quando ativada, [dicas](https://material.io/design/components/tooltips.html) exibem um rótulo de texto identificando o elemento, como uma descrição de sua função.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Dicas simples

{{"demo": "pages/components/tooltips/BasicTooltip.js"}}

## Dicas posicionadas

O `Tooltip` tem 12 **posicionamentos** para ser escolhido. They don't have directional arrows; instead, they rely on motion emanating from the source to convey direction.

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Dicas customizadas

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/how-to-customize/).

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## Dicas com seta

Você pode usar a propriedade `arrow` para dar à sua dica uma seta indicando a qual elemento se refere.

{{"demo": "pages/components/tooltips/ArrowTooltips.js"}}

## Elemento filho customizado

A dica precisa aplicar eventos DOM ao seu elemento filho. A dica precisa aplicar eventos DOM ao seu elemento filho.

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

## Dicas controladas

Você pode usas as propriedades `open`, `onOpen` e `onClose` para controlar o comportamento da dica.

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## Largura variável

A dica (`Tooltip`) quebra o texto longo por padrão para torná-lo legível.

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## Interativo

Dicas são interativas por padrão ([WCAG 2.1 success criterion 1.4.13](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus)). Ela não será fechada quando o usuário passar por cima da dica antes que `leaveDelay` expire. Você pode desativar esse comportamento (assim falhando o critério de sucesso que é necessário para alcançar AA) passando `disableInteractive`.

{{"demo": "pages/components/tooltips/NonInteractiveTooltips.js"}}

## Elementos desabilitados

Por padrão os elementos desabilitados como `<button>` não disparam interações do usuário, então uma `Tooltip` não será ativada em eventos normais, como passar o mouse. Para acomodar elementos desabilitados, adicione um elemento encapsulador simples, como um `span`.

> ⚠️ Para trabalhar com o Safari, você precisa de pelo menos um display block ou flex item abaixo do elemento que encapsula a dica.

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

> Se você não estiver manipulando com um componente Material-UI que herde de `ButtonBase`, por exemplo, um elemento `<button>` nativo, você também deve adicionar a propriedade CSS *pointer-events: none;* ao seu elemento quando desativado:

```jsx
<Tooltip title="Você não tem permissão para esta tarefa">
  <span>
    <button disabled={disabled} style={disabled ? <Tooltip title="Você não tem permissão para esta tarefa">
  <span>
    <button disabled={disabled} style={disabled ?
```

## Transições

Use uma transição diferente.

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## Seguir o cursor

Você pode habilitar a dica para seguir o cursor definindo `followCursor={true}`.

{{"demo": "pages/components/tooltips/FollowCursorTooltips.js"}}

## Elemento virtual

No caso de você precisar implementar um posicionamento customizado, você pode usar a propriedade `anchorEl`: O valor da propriedade `anchorEl` pode ser referência para um elemento DOM falso. Você precisa criar um objeto com a estrutura definida como  [`VirtualElement`](https://popper.js.org/docs/v2/virtual-elements/).

{{"demo": "pages/components/tooltips/AnchorElTooltips.js"}}

## Exibindo e ocultando

A dica normalmente é exibida imediatamente quando o mouse do usuário passa sobre o elemento e se oculta imediatamente quando o mouse do usuário sai. Um atraso na exibição ou ocultação da dica pode ser adicionado por meio das propriedades `enterDelay` e `leaveDelay`, conforme mostrado na demonstração de dicas controladas acima.

No celular, a dica é exibida quando o usuário pressiona longamente o elemento e oculta após um atraso de 1500 ms. Você pode desativar esse recurso com a propriedade `disableTouchListener`.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#tooltip)

Por padrão, a dica apenas rotula seu elemento filho. Isso é notavelmente diferente de `title` que pode rotular **ou** descrever seu elemento filho, dependendo se o filho já tem um rótulo. Por exemplo, em:

```html
<button title="alguma informação a mais">Um botão</button>
```

o `title` atua como uma descrição acessível. Se você quer que a dica aja como uma descrição acessível, você pode passar `describeChild`. Observe que você não deveria usar `describeChild` se a dica fornece somente um rótulo visual. Caso contrário, um elemento filho não teria um nome acessível e a dica violaria [success criterion 2.5.3 in WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html).

{{"demo": "pages/components/tooltips/AccessibilityTooltips.js"}}
