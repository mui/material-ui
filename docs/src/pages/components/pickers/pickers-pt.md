---
title: Componentes React para Seletor de Data e Seletor de Hora
components: TextField
---

# Seletores Data / Hora

<p class="description">Seletores de datas e seletores de hora fornecem uma maneira simples de selecionar um único valor de um conjunto pré-determinado.</p>

- Em dispositivos móveis, seletores são melhores aplicados quando mostrados em diálogos de confirmação.
- Para exibição em linha, como em um formulário, considere usar controles compactos, como botões suspensos segmentados.

## @material-ui/pickers

![estrelas](https://img.shields.io/github/stars/mui-org/material-ui-pickers.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/@material-ui/pickers.svg)

[@material-ui/pickers](https://material-ui-pickers.dev/) fornece os controles seletores de data e hora.

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}

## Seletores nativos

⚠️ O suporte dos navegadores aos controles de entrada nativos [não é perfeito](https://caniuse.com/#feat=input-datetime). Dê uma olhada em [@material-ui/pickers](https://material-ui-pickers.dev/) para obter uma melhor solução.

### Selecionadores de data

Um exemplo de seletor de data nativo com `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Seletores de Data & Hora

Um exemplo de seletor de data & hora nativo com `type="datetime-local"`.

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Seletores de Hora

Um exemplo de seletor de hora nativo com `type="time"`.

{{"demo": "pages/components/pickers/TimePickers.js"}}