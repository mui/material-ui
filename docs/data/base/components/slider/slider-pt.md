---
product: base
title: React Slider unstyled component and hook
components: SliderUnstyled
githubLabel: 'component: slider'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#slider'
packageName: '@mui/base'
---

# Slider

<p class="description">O componente SliderUnstyled permite que os usuários façam seleções a partir de um intervalo de valores ao longo de uma barra horizontal ou vertical.</p>

Os usuários podem selecionar um único valor ou um intervalo de valores em um controle deslizante. Eles são ideais para controles de interface que se beneficiam de uma representação visual de conteúdo ajustável, assim como volume, configurações de brilho, ou aplicar filtros em imagem.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

```js
import SliderUnstyled from '@mui/base/SliderUnstyled';
```

{{"demo": "UnstyledSlider.js", "defaultCodeOpen": false}}

## Discrete sliders

O controle deslizante mais básico é _contínuo_, o que significa que não tem valores pré-definidos  para o usuário selecionar. Isso é adequado para situações em que um valor aproximado é bom o suficiente para o usuário, como brilho ou volume.

Mas se seus usuários precisarem de opções mais precisas, você pode criar um controle deslizante discreto que faça paradas pré-definidas ao longo da barra. Você pode gerar uma marca para cada etapa com `marks={true}`:

{{"demo": "DiscreteSlider.js"}}

### Custom marks

Você pode ter marcas customizadas, fornecendo um array para a propriedade `marks`:

{{"demo": "DiscreteSliderMarks.js"}}

### Restricted values

If the user should only be able to select from the values provided with the `marks` prop, add `step={null}` to disable all other options:

{{"demo": "DiscreteSliderValues.js"}}

## Range slider

Para permitir que os usuários definam o início e o fim de um intervalo em um controle deslizante, fornecer um array de valores para a propriedade ou `defaultValue`:

{{"demo": "RangeSlider.js"}}

## Accessibility

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider)

O componente lida com a maior parte do trabalho necessário para torná-lo acessível. No entanto, você precisa se certificar de que:

- Cada marcador possua propriedades de rótulo amigável para o usuário (`aria-label`, `aria-labelledby` ou `getAriaLabel`).
- Cada marcador tenha um texto amigável para o seu valor atual. This is not required if the value matches the semantics of the label. Você pode alterar o nome com as propriedades `getAriaValueText` ou `aria-valuetext`.
