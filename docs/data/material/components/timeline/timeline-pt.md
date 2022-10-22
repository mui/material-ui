---
product: material-ui
title: Componente React para Linha do tempo
components: Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, TimelineOppositeContent
githubLabel: 'component: timeline'
packageName: '@mui/lab'
---

# Linha do tempo

<p class="description">A linha do tempo exibe uma lista de eventos em ordem cronológica.</p>

**Observação:** Este componente não está documentado nas [diretrizes do Material Design](https://material.io/), mas o Material-UI o suporta.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Linha do tempo básica

Uma linha do tempo básica mostrando a lista de eventos.

{{"demo": "BasicTimeline.js"}}

## Left-positioned timeline

The main content of the timeline can be positioned on the left side relative to the time axis.

{{"demo": "LeftPositionedTimeline.js"}}

## Linha do tempo alternada

A linha do tempo pode exibir os eventos alternando os lados.

{{"demo": "AlternateTimeline.js"}}

## Cor

O `TimelineDot` pode aparecer em cores diferentes.

{{"demo": "ColorsTimeline.js"}}

## Delineado

{{"demo": "OutlinedTimeline.js"}}

## Conteúdo oposto

A linha do tempo pode exibir conteúdo nos lados opostos.

{{"demo": "OppositeContentTimeline.js"}}

## Linha do tempo customizada

Aqui está um exemplo de customização do componente. You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedTimeline.js"}}

## Alignment

There are different ways in which a Timeline can be placed within the container.

You can do it by overriding the styles.

A Timeline centers itself in the container by default.

The demos below show how to adjust the relative width of the left and right sides of a Timeline:

### Left-aligned

{{"demo": "LeftAlignedTimeline.js"}}

### Right-aligned

{{"demo": "RightAlignedTimeline.js"}}

### Left-aligned with no opposite content

{{"demo": "NoOppositeContent.js"}}
