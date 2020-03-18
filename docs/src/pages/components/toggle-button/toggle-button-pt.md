---
title: Componente React para Botões de Alternância
components: ToggleButton, ToggleButtonGroup
---

# Botões de alternância

<p class="description">Os botões de alternância podem ser usados para agrupar opções relacionadas.</p>

Para enfatizar grupos de [botões de alternância](https://material.io/design/components/buttons.html#toggle-button) relacionados, o grupo deve ter um container em comum.

O `ToggleButtonGroup` controlará o estado selecionado de seus botões filhos quando receber sua propriedade `value`.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## Tamanhos

Gosta de botões maiores ou menores? Use a propriedade `size`.

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## Enforce value set

If you want to enforce at least one button to be active, you can adapt your handleChange function.

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

## Standalone toggle button

{{"demo": "pages/components/toggle-button/StandaloneToggleButton.js"}}

## Customized toggle button

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## Acessibilidade

ToggleButtonGroup has `role="group"`. You should provide an accessible label with `aria-label="label"`, `aria-labelledby="id"` or `<label>`.

ToggleButton sets `aria-pressed="<bool>"` according to the button state. You should label each button with `aria-label`.