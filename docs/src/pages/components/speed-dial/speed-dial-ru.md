---
title: Speed Dial React component
components: SpeedDial, SpeedDialAction, SpeedDialIcon
githubLabel: 'component: SpeedDial'
packageName: '@material-ui/lab'
---

# Speed Dial

<p class="description">При нажатии плавающая кнопка действия может отображать от трех до шести связанных между собой кнопок действий.</p>

Для отображения больше шести кнопок следует использовать другой компонент вместо FAB.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Simple Speed Dial

Плавающая кнопка может отображать связанные действия.

{{"demo": "pages/components/speed-dial/SpeedDials.js"}}

## Controlled speed dial

You can provide an alternate icon for the closed and open states using the `icon` and `openIcon` props of the `SpeedDialIcon` component.

The SpeedDialActions tooltips can be be displayed persistently so that users don't have to long-press in order to see the tooltip on touch devices.

## Custom close icon

Вы можете задать альтернативную иконку для закрытого и открытого состояний, используя свойства `icon` и `openIcon` компонента `SpeedDialIcon`.

{{"demo": "pages/components/speed-dial/OpenIconSpeedDial.js"}}

## Persistent action tooltips

The SpeedDialActions tooltips can be displayed persistently so that users don't have to long-press in order to see the tooltip on touch devices.

It is enabled here across all devices for demo purposes, but in production it could use the `isTouch` logic to conditionally set the prop.

{{"demo": "pages/components/speed-dial/SpeedDialTooltipOpen.js"}}
