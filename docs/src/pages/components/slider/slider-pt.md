---
title: Componente React para Slider
components: Slider
---

# Slider

<p class="description">Sliders permitem que os usuários façam seleções a partir de um intervalo de valores.</p>

Os [Sliders](https://material.io/design/components/sliders.html) refletem um intervalo de valores ao longo de uma barra, a partir do qual os usuários podem selecionar um único valor. Eles são ideais para ajustar configurações como volume, brilho ou aplicação de filtros de imagem.

- 📦 [22 kB gzipped](/size-snapshot) (mas apenas +8 kB quando usado junto com outros componentes de Material-UI).

## Sliders contínuos

Os sliders contínuos permitem que os usuários selecionem um valor ao longo de um intervalo subjetivo.

{{"demo": "pages/components/slider/ContinuousSlider.js"}}

## Sliders discretos

Os sliders discretos podem ser ajustados para um valor específico, fazendo referência ao seu indicador de valor. Por ordem de demonstrações:

Você pode gerar uma marca para cada etapa com `marks={true}`.

{{"demo": "pages/components/slider/DiscreteSlider.js"}}

### Pequenas etapas

Você pode alterar o incremento padrão da etapa.

{{"demo": "pages/components/slider/DiscreteSliderSteps.js"}}

### Marcas personalizadas

Você pode ter marcas customizadas, fornecendo um array para a propriedade `marks`.

{{"demo": "pages/components/slider/DiscreteSliderMarks.js"}}

### Valores restritos

Você pode restringir os valores selecionáveis fornecidos na propriedade `marks` configurando a propriedade `step={null}`.

{{"demo": "pages/components/slider/DiscreteSliderValues.js"}}

### Rótulo sempre visível

Você pode forçar o marcador a ficar sempre visível com `valueLabelDisplay="on"`.

{{"demo": "pages/components/slider/DiscreteSliderLabel.js"}}

## Slider com intervalo

O slider pode ser usado para definir o início e o fim de um intervalo, fornecendo um array de valores para a propriedade `value`.

{{"demo": "pages/components/slider/RangeSlider.js"}}

## Slider com campo de entrada

Neste exemplo, um campo de entrada permite que um valor seja definido.

{{"demo": "pages/components/slider/InputSlider.js"}}

## Sliders customizados

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

## Sliders verticais

{{"demo": "pages/components/slider/VerticalSlider.js"}}

## Faixa

A faixa exibe o intervalo disponível para a seleção do usuário.

### Faixa desabilitada

A faixa pode ser desabilitada com `track={false}`.

{{"demo": "pages/components/slider/TrackFalseSlider.js"}}

### Faixa invertida

A faixa pode ser invertida com `track="inverted"`.

{{"demo": "pages/components/slider/TrackInvertedSlider.js"}}

## Escala não linear

Você pode usar a propriedade `scale` para representar o `value` em uma escala diferente. Por exemplo, na demonstração seguinte, o valor *x* representa a potência de *10^x*.

{{"demo": "pages/components/slider/NonLinearSlider.js"}}

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider)

O componente lida com a maior parte do trabalho necessário para torná-lo acessível. No entanto, você precisa se certificar de que:

- Cada marcador possua propriedades de rótulo amigável para o usuário (`aria-label`, `aria-labelledby` ou `getAriaLabel`).
- Cada marcador tenha um texto amigável para o seu valor atual. Isso não é necessário se o valor corresponder ao rótulo exibido no slider. Você pode alterar o nome com as propriedades `getAriaValueText` ou `aria-valuetext`.