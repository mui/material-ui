---
title: Drawer React component
components: Drawer, SwipeableDrawer
---
# Cajón

<p class="description">Los cajones de navegación brindan acceso a los destinos en su aplicación. Las hojas laterales son superficies que contienen contenido complementario que están ancladas al borde izquierdo o derecho de la pantalla.</p>

[Los Cajones de Navegación](https://material.io/design/components/navigation-drawer.html) proporcionan acceso a destinos y funciones de la aplicación, como cambiar de cuenta. Pueden estar permanentemente en pantalla o controlados por un ícono del menú de navegación.

[Las hojas laterales](https://material.io/design/components/sheets-side.html) son superficies suplementarias que se usan principalmente en tabletas y computadores de escritorio.

## Cajón temporal

Los cajones de navegación temporales pueden activar o cerrar. Cerrado por defecto, el cajón abre temporalmente sobre todo el contenido hasta que una sección sea seleccionada.

El cajón se puede cancelar haciendo clic en la superposición o presionando la tecla Esc. Se cierra cuando se selecciona un ítem, que se maneja al controlar el prop`open`.

{{"demo": "pages/demos/drawers/TemporaryDrawer.js"}}

## Cajón temporal deslizable

Puede hacer que el cajón sea deslizable con el componente `SwipeableDrawer`.

Este componente viene con una sobrecarga de carga gzipped de 2 kB. Algunos dispositivos móviles de baja gama no podrán seguir los dedos a 60 FPS. Puede utilizar la propiedad `disableBackdropTransition` para ayudar.

{{"demo": "pages/demos/drawers/SwipeableTemporaryDrawer.js"}}

Estamos utilizando el siguiente conjunto de propiedades en este sitio web de documentación para una utilización óptima del componente: iOS está alojado en dispositivos de gama alta. Podemos habilitar la transición de fondo sin dejar caer marcos. El rendimiento será lo suficientemente bueno. - iOS tiene una función de "deslizar para volver" que desordena con la característica de descubrimiento. Tenemos que deshabilitarlo.

```jsx
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

<SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} />
```

## Responsive drawer

The `Hidden` responsive helper component allows showing different types of drawer depending on the screen width. A `temporary` drawer is shown for small screens while a `permanent` drawer is shown for wider screens.

{{"demo": "pages/demos/drawers/ResponsiveDrawer.js", "iframe": true}}

## Persistent drawer

Persistent navigation drawers can toggle open or closed. The drawer sits on the same surface elevation as the content. It is closed by default and opens by selecting the menu icon, and stays open until closed by the user. The state of the drawer is remembered from action to action and session to session.

When the drawer is outside of the page grid and opens, the drawer forces other content to change size and adapt to the smaller viewport.

Persistent navigation drawers are acceptable for all sizes larger than mobile. They are not recommended for apps with multiple levels of hierarchy that require using an up arrow for navigation.

{{"demo": "pages/demos/drawers/PersistentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/demos/drawers/PersistentDrawerRight.js", "iframe": true}}

## Mini variant drawer

In this variation, the persistent navigation drawer changes its width. Its resting state is as a mini-drawer at the same elevation as the content, clipped by the app bar. When expanded, it appears as the standard persistent navigation drawer.

The mini variant is recommended for apps sections that need quick selection access alongside content.

{{"demo": "pages/demos/drawers/MiniDrawer.js", "iframe": true}}

## Permanent drawer

Permanent navigation drawers are always visible and pinned to the left edge, at the same elevation as the content or background. They cannot be closed.

Permanent navigation drawers are the **recommended default for desktop**.

### Full-height navigation

Apps focused on information consumption that use a left-to-right hierarchy.

{{"demo": "pages/demos/drawers/PermanentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/demos/drawers/PermanentDrawerRight.js", "iframe": true}}

### Clipped under the app bar

Apps focused on productivity that require balance across the screen.

{{"demo": "pages/demos/drawers/ClippedDrawer.js", "iframe": true}}