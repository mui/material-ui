---
title: Componente React Cajón
components: Drawer, SwipeableDrawer
---

# Cajón

<p class="description">Los cajones de navegación brindan acceso a los destinos en su aplicación. Las hojas laterales son superficies que contienen contenido complementario que están ancladas al borde izquierdo o derecho de la pantalla.</p>

[Los Cajones de Navegación](https://material.io/design/components/navigation-drawer.html) proporcionan acceso a destinos y funciones de la aplicación, como cambiar de cuenta. Pueden estar permanentemente en pantalla o controlados por un ícono del menú de navegación.

[Las hojas laterales](https://material.io/design/components/sheets-side.html) son superficies suplementarias que se usan principalmente en tabletas y computadores de escritorio.

## Cajón temporal

Los cajones de navegación temporales pueden activar o cerrar. Cerrado por defecto, el cajón abre temporalmente sobre todo el contenido hasta que una sección sea seleccionada.

El cajón se puede cancelar haciendo clic en la superposición o presionando la tecla Esc. Se cierra cuando se selecciona un ítem, que se maneja al controlar el prop`open`.

{{"demo": "pages/components/drawers/TemporaryDrawer.js"}}

## Cajón temporal deslizable

Puede hacer que el cajón sea deslizable con el componente `SwipeableDrawer`.

Este componente viene con una sobrecarga de carga gzipped de 2 kB. Algunos dispositivos móviles de baja gama no podrán seguir los dedos a 60 FPS. Puede utilizar la propiedad `disableBackdropTransition` para ayudar.

{{"demo": "pages/components/drawers/SwipeableTemporaryDrawer.js"}}

Estamos utilizando el siguiente conjunto de propiedades en este sitio web de documentación para una utilización óptima del componente: iOS está alojado en dispositivos de gama alta. Podemos habilitar la transición de fondo sin dejar caer marcos. El rendimiento será lo suficientemente bueno. - iOS tiene una función de "deslizar para volver" que desordena con la característica de descubrimiento. Tenemos que deshabilitarlo.

```jsx
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

<SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} />
```

## Cajón responsivo

El componente utilitario responsivo `Hidden` permite mostrar diferentes tipos de cajones dependiendo del ancho de la pantalla. Un cajón `temporary` se muestra para pantallas pequeñas mientras que un cajón `permanent` se muestra para pantallas mas anchas.

{{"demo": "pages/components/drawers/ResponsiveDrawer.js", "iframe": true}}

## Cajón persistente

Los cajones de navegación persistente pueden intercambiarse entre abierto o cerrado. El cajón descansa en la misma superficie de elevación que el contenido. Está cerrado por defecto y se abre seleccionando el ícono del menú, y permanece abierto hasta que es cerrado por el usuario. El estado del cajón es recordado de acción a acción y de sesión a sesión.

Cuando el cajón está fuera de la grilla de la página y se abre, fuerza al otro contenido a cambiar su tamaño y adaptarse a la vista más pequeña.

Los cajones de navegación persistente son aceptables para todos los tamaños superiores a móvil. No se recomienda para aplicaciones con múltiples niveles de jerarquía que requieren usar una flecha hacia arriba para navegación.

{{"demo": "pages/components/drawers/PersistentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PersistentDrawerRight.js", "iframe": true}}

## Cajón variante mini

En esta variación, el cajón de navegación persistente cambia su ancho. Su estado de descanso es un mini-cajón con la misma elevación que el contenido, cortado por la barra de la aplicación. Cuando se expande, aparece como el cajón de navegación persistente estándar.

La variante mini está recomendada para secciones de la aplicación que necesiten acceso a selección rápida junto al contenido.

{{"demo": "pages/components/drawers/MiniDrawer.js", "iframe": true}}

## Cajón permanente

Los cajones de navegación permanente están siempre visibles y fijos al borde izquierdo, con la misma elevación que el contenido o fondo. No pueden ser cerrados.

Los cajones de navegación permanentes son los **recomendados por defecto para escritorio**.

### Navegación de altura completa

Aplicaciones enfocadas en consumo de información que usan jerarquía de izquierda a derecha.

{{"demo": "pages/components/drawers/PermanentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PermanentDrawerRight.js", "iframe": true}}

### Cortado bajo la barra de aplicación

Aplicaciones enfocadas en productividad que requieren balance a través de la pantalla.

{{"demo": "pages/components/drawers/ClippedDrawer.js", "iframe": true}}