---
title: Componente React Menú
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
---
# Menús

<p class="description">Los menús despliegan una lista de opciones en superficies temporales.</p>

Un [Menú](https://material.io/design/components/menus.html) despliega una lista de opciones en una superficie temporal. Aparecen cuando los usuarios interactúan con un botón, acción u otro control.

## Menú Simple

Los menús simples se abren sobre el elemento ancla por defecto (esta opción puede ser cambiada en las propiedades). Cuando están cercanos a un borde de la pantalla, los menús simples se re alinean verticalmente para asegurarse de que todos los ítems del menú están completamente visibles.

Elegir una opción debiera inmediatamente confirmar la opción y cerrar el menú.

**Desambiguación**: En contraste con los menús simples, los diálogos simples pueden presentar detalles adicionales a las opciones disponibles para un ítem de lista o proveer acciones de navegación u ortogonales relacionadas a la tarea primaria. Aunque pueden desplegar el mismo contenido, los menús simples son preferidos sobre los diálogos simples porque los menú simples son menos perjudiciales para el contexto actual del usuario.

{{"demo": "pages/demos/menus/SimpleMenu.js"}}

## Menús seleccionados

Si son usados para selección de elementos, cuando se abren, los menús simples intentan alinear verticalmente el elemento de menú seleccionado actualmente con el elemento ancla. El elemento de menú actualmente seleccionado se establece usando la propiedad `selected` (de [ListItem](/api/list-item/)).

{{"demo": "pages/demos/menus/SimpleListMenu.js"}}

## Composición de MenuList

El componente `Menu` usa el componente `Popover` internamente. Sin embargo, es posible usar una estrategia de posicionamiento diferente, o no bloquear el desplazamiento. Para responder esas necesidades, exponemos un componente `MenuList` que puede componer, con `Popper` en este ejemplo.

La responsabilidad principal del componente `MenuList` es manejar el foco.

{{"demo": "pages/demos/menus/MenuListComposition.js"}}

## MenuItem personalizado

Si has estado leyendo la [página de documentación de sobreescritura](/customization/overrides/) pero aún no te sientes seguro, aquí hay un ejemplo de cómo puedes personalizar el `MenuItem`.

⚠️ A pesar de que la especificación de material design anima a usar temas, este ejemplo no es común.

{{"demo": "pages/demos/menus/ListItemComposition.js"}}

El `MenuItem` es una envoltura alrededor de `ListItem` con algunos estilos adicionales. Puedes usar las mismas características de composición con el componente `MenuItem`:

## Menús de altura máxima

Si el alto de un menú previene que todos los elementos sean mostrados, puede hacer desplazamiento internamente.

{{"demo": "pages/demos/menus/LongMenu.js"}}

## Limitaciones

Existe un [bug de flexbox](https://bugs.chromium.org/p/chromium/issues/detail?id=327437) que previene el funcionamiento de `text-overflow: ellipsis` en un diseño de flexbox. Puede usar el componente `Typography` con `noWrap` para solucionar este problema:

{{"demo": "pages/demos/menus/TypographyMenu.js"}}

## Cambiar transición

Usar una transición diferente.

{{"demo": "pages/demos/menus/FadeMenu.js"}}

## Proyectos relacionados

Para usos más avanzados tal vez puedas aprovercharte de:

### Ayudante PopupState

Existe un paquete de terceros [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) que se encarga del estado del menú en la mayoría de los casos.

{{"demo": "pages/demos/menus/MenuPopupState.js"}}