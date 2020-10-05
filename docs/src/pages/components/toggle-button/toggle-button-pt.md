---
title: Componente React para Botões de Alternância
components: ToggleButton, ToggleButtonGroup
githubLabel: 'component: ToggleButton'
materialDesign: 'https://material.io/components/buttons#toggle-button'
---

# Botões de alternância

<p class="description">Os botões de alternância podem ser usados para agrupar opções relacionadas.</p>

Para enfatizar grupos de [botões de alternância](https://material.io/components/buttons#toggle-button) relacionados, o grupo deve ter um container em comum. O `ToggleButtonGroup` controla o estado selecionado de seus botões filhos através de sua propriedade `value`.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Seleção exclusiva

With exclusive selection, selecting one option deselects any other.

In this example text justification toggle buttons present options for left, center, right, and fully justified text (disabled), with only one item available for selection at a time.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## Seleção múltipla

Multiple selection allows for logically-grouped options, like bold, italic, and underline, to have multiple options selected.

{{"demo": "pages/components/toggle-button/ToggleButtonsMultiple.js"}}

## Tamanhos

Gosta de botões maiores ou menores? Use a propriedade `size`.

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## Botões verticais

The buttons can be stacked vertically with the `orientation` prop set to "vertical".

{{"demo": "pages/components/toggle-button/VerticalToggleButtons.js"}}

## Forçar valor definido

If you want to enforce that at least one button must be active, you can adapt your handleChange function.

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

### ARIA

- ToggleButtonGroup possui `role="group"`. Você deve fornecer um rótulo acessível com `aria-label="label"`, `aria-labelledby="id"` ou `<label>`.
- ToggleButton define `aria-pressed="<bool>"` de acordo com o estado do botão. Você deve rotular cada botão com `aria-label`.

### Teclado

At present, toggle buttons are in DOM order. Navigate between them with the tab key. The button behavior follows standard keyboard semantics.
