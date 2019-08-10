---
title: Componente React Slider
components: Slider
---

# Slider

<p class="description">Sliders permitem que os usuários façam seleções a partir de um intervalo de valores.</p>

[Sliders](https://material.io/design/components/sliders.html) refletem um intervalo de valores ao longo de uma barra, a partir do qual os usuários podem selecionar um único valor. Eles são ideais para ajustar configurações como volume, brilho ou aplicação de filtros de imagem.

- 📦 [22 kB gzipped](/size-snapshot) (mas apenas 8 kB sem @material-ui/styles).

## Sliders discretos

Os sliders discretos podem ser ajustados para um valor específico, fazendo referência ao seu indicador de valor. Por ordem de demonstrações:

1. Você pode gerar uma marca para cada etapa com `marks={true}`.
2. You can change the default step increment.
3. Você pode ter marcas customizadas, fornecendo uma matriz para a propriedade `marks`.
4. Você pode restringir os valores selecionáveis fornecidos na propriedade `marks` configurando a propriedade `step={null}`.
5. Você pode forçar o marcador a ficar sempre visível com `valueLabelDisplay="on"`.

{{"demo": "pages/components/slider/DiscreteSlider.js"}}

## Sliders customizados

Aqui esta um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

## Sliders contínuos

Os sliders contínuos permitem que os usuários selecionem um valor ao longo de um intervalo subjetivo.

{{"demo": "pages/components/slider/ContinuousSlider.js"}}

## Sliders com intervalo

{{"demo": "pages/components/slider/RangeSlider.js"}}

## Com campo de entrada

{{"demo": "pages/components/slider/InputSlider.js"}}

## Sliders verticais

{{"demo": "pages/components/slider/VerticalSlider.js"}}

## Acessibilidade

O componente lida com a maior parte do trabalho necessário para torná-lo acessível. No entanto, você precisa se certificar de que:

- O slider, como um todo, tem um rótulo (propriedades `aria-label` ou `aria-labelledby`).
- Cada marcador tem um nome amigável para o seu valor atual. Isso não é necessário se o valor corresponder ao rótulo exibido no slider. Você pode alterar o nome com as propriedades `getAriaValueText` ou `aria-valuetext`.