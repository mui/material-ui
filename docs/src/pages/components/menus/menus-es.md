---
title: Componente React Menú
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
---

# Menús

<p class="description">Los menús despliegan una lista de opciones en superficies temporales.</p>

A [Menu](https://material.io/design/components/menus.html) displays a list of choices on a temporary surface. It appears when the user interacts with a button, or other control.

## Menú Simple

Los menús simples se abren sobre el elemento ancla por defecto (esta opción puede ser cambiada en las propiedades). Cuando están cercanos a un borde de la pantalla, los menús simples se re alinean verticalmente para asegurarse de que todos los ítems del menú están completamente visibles.

Elegir una opción debiera inmediatamente confirmar la opción y cerrar el menú.

**Desambiguación**: En contraste con los menús simples, los diálogos simples pueden presentar detalles adicionales a las opciones disponibles para un ítem de lista o proveer acciones de navegación u ortogonales relacionadas a la tarea primaria. Aunque pueden desplegar el mismo contenido, los menús simples son preferidos sobre los diálogos simples porque los menú simples son menos perjudiciales para el contexto actual del usuario.

{{"demo": "pages/components/menus/SimpleMenu.js"}}

## Menús seleccionados

If used for item selection, when opened, simple menus attempt to vertically align the currently selected menu item with the anchor element, and the initial focus will be placed on the selected menu item. El elemento de menú actualmente seleccionado se establece usando la propiedad `selected` (de [ListItem](/api/list-item/)). To use a selected menu item without impacting the initial focus or the vertical positioning of the menu, set the `variant` property to `menu`.

{{"demo": "pages/components/menus/SimpleListMenu.js"}}

## Composición de MenuList

El componente `Menu` usa el componente `Popover` internamente. Sin embargo, es posible usar una estrategia de posicionamiento diferente, o no bloquear el desplazamiento. Para responder esas necesidades, exponemos un componente `MenuList` que puede componer, con `Popper` en este ejemplo.

La responsabilidad principal del componente `MenuList` es manejar el foco.

{{"demo": "pages/components/menus/MenuListComposition.js", "bg": true}}

## Customized menus

He aquí un ejemplo de personalización del componente. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/menus/CustomizedMenus.js"}}

The `MenuItem` is a wrapper around `ListItem` with some additional styles. You can use the same list composition features with the `MenuItem` component:

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/menu).

## Menús de altura máxima

Si el alto de un menú previene que todos los elementos sean mostrados, puede hacer desplazamiento internamente.

{{"demo": "pages/components/menus/LongMenu.js"}}

## Limitaciones

Existe un [bug de flexbox](https://bugs.chromium.org/p/chromium/issues/detail?id=327437) que previene el funcionamiento de `text-overflow: ellipsis` en un diseño de flexbox. Puede usar el componente `Typography` con `noWrap` para solucionar este problema:

{{"demo": "pages/components/menus/TypographyMenu.js", "bg": true}}

## Change transition

Usar una transición diferente.

{{"demo": "pages/components/menus/FadeMenu.js"}}

## Context menu

Here is an example of a context menu. (Right click to open.)

{{"demo": "pages/components/menus/ContextMenu.js"}}

## Proyectos relacionados

Para usos más avanzados tal vez puedas aprovercharte de:

### Ayudante PopupState

Existe un paquete de terceros [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) que se encarga del estado del menú en la mayoría de los casos.

{{"demo": "pages/components/menus/MenuPopupState.js"}}