---
title: Componente React para Autocompletar
components: TextField, Paper, MenuItem, Popper
---

# Autocompletar

<p class="description">O autocompletar é uma entrada de texto normal aprimorada por um painel de opções sugeridas.</p>

Material-UI, não fornece nenhuma API de alto nível para resolver este problema. Você deve usar uma solução criada pela comunidade React, seguindo um dos exemplos abaixo.

## downshift

![estrelas](https://img.shields.io/github/stars/paypal/downshift.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/downshift.svg)

Este exemplo demonstra como usar [downshift](https://github.com/downshift-js/downshift).

A última demonstração permite ao usuário limpar a entrada e mostrar várias opções em foco.

{{"demo": "pages/components/autocomplete/IntegrationDownshift.js"}}

## react-select

![estrelas](https://img.shields.io/github/stars/JedWatson/react-select.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-select.svg)

Este exemplo demonstra como usar [react-select](https://github.com/JedWatson/react-select).

{{"demo": "pages/components/autocomplete/IntegrationReactSelect.js"}}

## react-autosuggest

![estrelas](https://img.shields.io/github/stars/moroshko/react-autosuggest.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-autosuggest.svg)

Este exemplo demonstra como usar [react-autosuggest](https://github.com/moroshko/react-autosuggest). Ele também usa [autosuggest-highlight](https://www.npmjs.com/package/autosuggest-highlight) para fazer o destaque do texto.

{{"demo": "pages/components/autocomplete/IntegrationAutosuggest.js"}}

## Projetos Complementares

Para caso de usos mais avançados, você é capaz de aproveitar de:

- [material-ui-chip-input](https://mui.wertarbyte.com/#material-ui-chip-input): O componente chip e usado no input para permitir a seleção de múltiplos valores de texto.
- [mui-downshift](https://github.com/techniq/mui-downshift) Uma camada fina sobre o downshift do paypal para usar componentes visuais do Material-UI.
- [material-ui-autosuggest](https://github.com/plan-three/material-ui-autosuggest): Um componente de pesquisa difusa para React e Material-UI.
- [react-select-material-ui](https://github.com/iulian-radu-at/react-select-material-ui): Extensão do react-select com Material-UI.