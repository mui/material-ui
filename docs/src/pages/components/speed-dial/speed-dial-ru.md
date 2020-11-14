---
title: Speed Dial React component
components: SpeedDial, SpeedDialAction, SpeedDialIcon
---

# Speed Dial

<p class="description">При нажатии плавающая кнопка действия может отображать от трех до шести связанных между собой кнопок действий.</p>

Для отображения больше шести кнопок следует использовать другой компонент вместо FAB.

## Simple Speed Dial

Плавающая кнопка может отображать связанные действия.

{{"demo": "pages/components/speed-dial/SpeedDials.js"}}

## Custom close icon

Вы можете задать альтернативную иконку для закрытого и открытого состояний, используя свойства `icon` и `openIcon` компонента `SpeedDialIcon`.

{{"demo": "pages/components/speed-dial/OpenIconSpeedDial.js"}}

## Persistent action tooltips

Подсказки для SpeedDialActions могут отображаться постоянно, чтобы пользователям не приходилось долго нажимать, чтобы увидеть подсказку на сенсорных устройствах.

Он включен здесь на всех устройствах для демонстрационных целей, но в производстве можно использовать логику `isTouch` для определения свойства.

{{"demo": "pages/components/speed-dial/SpeedDialTooltipOpen.js"}}