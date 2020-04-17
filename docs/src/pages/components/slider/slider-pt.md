---
title: Componente React Slider
components: Slider
---

# Slider

<p class="description">Sliders permitem que os usuários façam seleções a partir de um intervalo de valores.</p>

[Sliders](https://material.io/design/components/sliders.html) refletem um intervalo de valores ao longo de uma barra, a partir do qual os usuários podem selecionar um único valor. Eles são ideais para ajustar configurações como volume, brilho ou aplicação de filtros de imagem.

- 📦 [22 kB gzipped](/size-snapshot) (but only +8 kB when used together with other Material-UI components).

## Sliders contínuos

Os sliders contínuos permitem que os usuários selecionem um valor ao longo de um intervalo subjetivo.

{{"demo": "pages/components/slider/ContinuousSlider.js"}}

## Sliders discretos

Os sliders discretos podem ser ajustados para um valor específico, fazendo referência ao seu indicador de valor. Por ordem de demonstrações:

Você pode gerar uma marca para cada etapa com `marks={true}`.

{{"demo": "pages/components/slider/DiscreteSlider.js"}}

### Small steps

Você pode alterar o incremento padrão da etapa.

{{"demo": "pages/components/slider/DiscreteSliderSteps.js"}}

### Custom marks

Você pode ter marcas customizadas, fornecendo uma matriz para a propriedade `marks`.

{{"demo": "pages/components/slider/DiscreteSliderMarks.js"}}

### Restricted values

Você pode restringir os valores selecionáveis fornecidos na propriedade `marks` configurando a propriedade `step={null}`.

{{"demo": "pages/components/slider/DiscreteSliderValues.js"}}

### Label always visible

Você pode forçar o marcador a ficar sempre visível com `valueLabelDisplay="on"`.

{{"demo": "pages/components/slider/DiscreteSliderLabel.js"}}

## Range slider

The slider can be used to set the start and end of a range by supplying an array of values to the `value` prop.

{{"demo": "pages/components/slider/RangeSlider.js"}}

## Slider with input field

In this example an input allows a discrete value to be set.

{{"demo": "pages/components/slider/InputSlider.js"}}

## Sliders customizados

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

## Sliders verticais

{{"demo": "pages/components/slider/VerticalSlider.js"}}

## Track

The track shows the range available for user selection.

### Removed track

The track can be turned off with `track={false}`.

{{"demo": "pages/components/slider/TrackFalseSlider.js"}}

### Inverted track

The track can be inverted with `track="inverted"`.

{{"demo": "pages/components/slider/TrackInvertedSlider.js"}}

## Non-linear scale

You can use the `scale` prop to represent the `value` on a different scale. For instance, in the following demo, the value *x* represents the power of *10^x*.

{{"demo": "pages/components/slider/NonLinearSlider.js"}}

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider)

O componente lida com a maior parte do trabalho necessário para torná-lo acessível. No entanto, você precisa se certificar de que:

- Cada miniatura possui propriedades de rótulo amigável para o usuário (`aria-label`, `aria-labelledby` ou `getAriaLabel`).
- Cada marcador tem um texto amigável para o seu valor atual. Isso não é necessário se o valor corresponder ao rótulo exibido no slider. Você pode alterar o nome com as propriedades `getAriaValueText` ou `aria-valuetext`.