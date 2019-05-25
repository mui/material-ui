---
title: Componente React Slider
components: Slider
---

# Slider

<p class="description">Sliders permitem que os usuários façam seleções a partir de um intervalo de valores.</p>

[Sliders](https://material.io/design/components/sliders.html) refletem um intervalo de valores ao longo de uma barra, a partir do qual os usuários podem selecionar um único valor. Eles são ideais para ajustar configurações como volume, brilho ou aplicação de filtros de imagem.

Sliders podem ter ícones em ambos os extremos da barra para descrever de forma visual o intervalo de valores.

#### Efeitos imediatos

As alterações feitas com sliders são imediatas, permitindo que o usuário faça ajustes no slider até encontrar sua preferência. Eles não devem ser utilizados em conjunto com configurações que têm pequenos atrasos no fornecimento de feedback ao usuário.

#### Estado atual

Os sliders refletem o estado atual das configurações que eles controlam.

## Slider simples

{{"demo": "pages/components/slider/SimpleSlider.js"}}

## Slider com passos

{{"demo": "pages/components/slider/StepSlider.js"}}

## Slider desabilitado

{{"demo": "pages/components/slider/DisabledSlider.js"}}

## Slider vertical

{{"demo": "pages/components/slider/VerticalSlider.js"}}

## Sliders customizados

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescrita](/customization/components/).

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

## Slider com miniatura customizada

{{"demo": "pages/components/slider/CustomIconSlider.js"}}

## Valor do reducer personalizado

{{"demo": "pages/components/slider/CustomValueReducerSlider.js"}}