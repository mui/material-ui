---
title: Componente React para Botões de Alternância
components: ToggleButton, ToggleButtonGroup
---

# Botões de alternância

<p class="description">Os botões de alternância podem ser usados para agrupar opções relacionadas.</p>

Para enfatizar grupos de [botões de alternância](https://material.io/components/buttons#toggle-button) relacionados, o grupo deve ter um contêiner em comum. O `ToggleButtonGroup` controla o estado selecionado de seus botões filhos através de sua propriedade `value`.

## Seleção exclusiva

Botões de alternância para justificação ou alinhamento de texto apresentam opções como esquerda, direita, centro, distribuído e justificado, com apenas um item disponível para seleção por vez. Selecionar uma opção irá desmarcar qualquer outra.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## Seleção múltipla

Opções lógicas agrupadas, como negrito, itálico e sublinhado, permitem a seleção de múltiplas opções.

{{"demo": "pages/components/toggle-button/ToggleButtonsMultiple.js"}}

## Tamanhos

Gosta de botões maiores ou menores? Use a propriedade `size`.

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## Botões verticais

{{"demo": "pages/components/toggle-button/VerticalToggleButtons.js"}}

## Forçar valor definido

Se você deseja forçar para pelo menos um botão estar ativo, você pode adaptar sua função handleChange.

```jsx
const handleFormat = (event, newFormats) => {
  if (newFormats.length) {
    setFormats(newFormats);
  }
};

const handleAlignment = (event, newAlignment) => {
  if (newAlignment !== null) {
    setAlignment(newAlignment);
  }
};
```

{{"demo": "pages/components/toggle-button/ToggleButtonNotEmpty.js"}}

## Botão de alternância autônomo

{{"demo": "pages/components/toggle-button/StandaloneToggleButton.js"}}

## Botão de alternância customizado

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## Acessibilidade

- ToggleButtonGroup possui `role="group"`. Você deve fornecer um rótulo acessível com `aria-label="label"`, `aria-labelledby="id"` ou `<label>`.
- ToggleButton define `aria-pressed="<bool>"` de acordo com o estado do botão. Você deve rotular cada botão com `aria-label`.