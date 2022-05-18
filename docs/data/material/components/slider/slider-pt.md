---
product: material-ui
title: Componente React Slider
components: Slider
githubLabel: 'component: slider'
materialDesign: https://material.io/components/sliders
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#slider'
unstyled: /base/react-slider/
---

# Slider

<p class="description">Sliders permitem que os usuários façam seleções a partir de um intervalo de valores.</p>

[Sliders](https://material.io/design/components/sliders.html) refletem um intervalo de valores ao longo de uma barra, a partir do qual os usuários podem selecionar um único valor. Eles são ideais para ajustar configurações como volume, brilho ou aplicação de filtros de imagem.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Sliders contínuos

Os sliders contínuos permitem que os usuários selecionem um valor ao longo de um intervalo subjetivo.

{{"demo": "ContinuousSlider.js"}}

## Tamanhos

For smaller slider, use the prop `size="small"`.

{{"demo": "SliderSizes.js"}}

## Sliders discretos

Os sliders discretos podem ser ajustados para um valor específico, fazendo referência ao seu indicador de valor. Você pode gerar uma marca para cada etapa com `marks={true}`.

{{"demo": "DiscreteSlider.js"}}

### Pequenas etapas

Você pode alterar o incremento padrão da etapa.

{{"demo": "DiscreteSliderSteps.js"}}

### Marcas personalizadas

Você pode ter marcas customizadas, fornecendo um array para a propriedade `marks`.

{{"demo": "DiscreteSliderMarks.js"}}

### Valores restritos

Você pode restringir os valores selecionáveis fornecidos na propriedade `marks` configurando a propriedade `step={null}`.

{{"demo": "DiscreteSliderValues.js"}}

### Rótulo sempre visível

Você pode forçar o marcador a ficar sempre visível com `valueLabelDisplay="on"`.

{{"demo": "DiscreteSliderLabel.js"}}

## Slider com intervalo

O slider pode ser usado para definir o início e o fim de um intervalo, fornecendo um array de valores para a propriedade `value`.

{{"demo": "RangeSlider.js"}}

### Minimum distance

You can enforce a minimum distance between values in the `onChange` event handler. By default, when you move the pointer over a thumb while dragging another thumb, the active thumb will swap to the hovered thumb. You can disable this behavior with the `disableSwap` prop. If you want the range to shift when reaching minimum distance, you can utilize the `activeThumb` parameter in `onChange`.

{{"demo": "MinimumDistanceSlider.js"}}

## Slider com campo de entrada

In this example, an input allows a discrete value to be set.

{{"demo": "InputSlider.js"}}

## Cor

{{"demo": "ColorSlider.js"}}

## Sliders customizados

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedSlider.js"}}

### Music player

{{"demo": "MusicPlayerSlider.js"}}

## Sliders verticais

{{"demo": "VerticalSlider.js"}}

**AVISO**: versões do Chrome, Safari e do Edge mais recente, ou seja, qualquer navegador baseado no WebKit exibe `<Slider orientation="vertical" />` horizontal ([de chromium issue #1158217](https://bugs.chromium.org/p/chromium/issues/detail?id=1158217)). Aplicando-se `-webkit-appearance: slider-vertical;` o slider é exibido vertical.

However, by applying `-webkit-appearance: slider-vertical;` keyboard navigation for horizontal keys (<kbd class="key">Arrow Left</kbd>, <kbd class="key">Arrow Right</kbd>) is reversed ([chromium issue #1162640](https://bugs.chromium.org/p/chromium/issues/detail?id=1162640)). Usually, up and right should increase and left and down should decrease the value. If you apply `-webkit-appearance` you could prevent keyboard navigation for horizontal arrow keys for a truly vertical slider. This might be less confusing to users compared to a change in direction.

{{"demo": "VerticalAccessibleSlider.js"}}

## Faixa

A faixa exibe o intervalo disponível para a seleção do usuário.

### Faixa desabilitada

A faixa pode ser desabilitada com `track={false}`.

{{"demo": "TrackFalseSlider.js"}}

### Faixa invertida

A faixa pode ser invertida com `track="inverted"`.

{{"demo": "TrackInvertedSlider.js"}}

## Escala não linear

Você pode usar a propriedade `scale` para representar o `value` em uma escala diferente.

Na seguinte demonstração, o valor _x_ representa o valor _2^x_. Acrescentar em _x_ aumenta o valor representado por fator de _2_.

{{"demo": "NonLinearSlider.js"}}

## Unstyled

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider)

O componente lida com a maior parte do trabalho necessário para torná-lo acessível. No entanto, você precisa se certificar de que:

- 📦 [5.6 kB gzipped](https://bundlephobia.com/package/@mui/base@latest)
- Cada marcador tenha um texto amigável para o seu valor atual. Isso não é necessário se o valor corresponder ao rótulo exibido no slider. Você pode alterar o nome com as propriedades `getAriaValueText` ou `aria-valuetext`.

## Acessibilidade

### IE 11

The slider's value label is not centered in IE 11. The alignement is not handled to make customizations easier with the lastest browsers. You can solve the issue with:

```css
import SliderUnstyled from '@mui/base/SliderUnstyled';
```
