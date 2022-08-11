---
product: base
title: Unstyled React Slider component and hook
components: SliderUnstyled
githubLabel: 'component: slider'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#slider'
---

# Unstyled slider

<p class="description">The <code>SliderUnstyled</code> component lets users make selections from a range of values along a horizontal or vertical bar.</p>

Os usuários podem selecionar um único valor ou um intervalo de valores em um controle deslizante. Eles são ideais para controles de interface que se beneficiam de uma representação visual de conteúdo ajustável, assim como volume, configurações de brilho, ou aplicar filtros em imagem.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

```js
import SliderUnstyled from '@mui/base/SliderUnstyled';
```

{{"demo": "UnstyledSlider.js", "defaultCodeOpen": false}}

## Discrete sliders

O controle deslizante mais básico é _contínuo_, o que significa que não tem valores pré-definidos para o usuário selecionar. Isso é adequado para situações em que um valor aproximado é bom o suficiente para o usuário, como brilho ou volume.

But if your users need more precise options, you can create a discrete slider that snaps the thumb to pre-defined stops along the bar.

To generate a mark for each stop, use `marks={true}`:

{{"demo": "DiscreteSlider.js"}}

### Custom marks

You can create custom marks by providing a rich array to the `marks` prop:

{{"demo": "DiscreteSliderMarks.js"}}

### Restricted values

If the user should only be able to select from the values provided with the `marks` prop, add `step={null}` to disable all other options:

{{"demo": "DiscreteSliderValues.js"}}

## Range slider

To let users set the start and end of a range on a slider, provide an array of values to the `value` or `defaultValue` prop:

{{"demo": "RangeSlider.js"}}

## Accessibility

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider)

The component handles most of the work necessary to make it accessible. However, you need to make sure that:

- Cada marcador possua propriedades de rótulo amigável para o usuário (`aria-label`, `aria-labelledby` ou `getAriaLabel`).
- Cada marcador tenha um texto amigável para o seu valor atual. This is not required if the value matches the semantics of the label. Você pode alterar o nome com as propriedades `getAriaValueText` ou `aria-valuetext`.
