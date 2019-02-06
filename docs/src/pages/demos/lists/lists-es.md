---
title: List React component
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
---
# Listas

<p class="description">Las listas son índices continuos y verticales de texto o imágenes.</p>

Las [listas](https://material.io/design/components/lists.html) son un grupo continuo de texto o imágenes. Se componen de elementos que contienen acciones primarias y complementarias, que se representan mediante iconos y texto.

## Lista Simple

{{"demo": "pages/demos/lists/SimpleList.js"}}

El último elemento del demo anterior muestra cómo se puede representar un enlace:

```jsx
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

//...

<ListItemLink href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemLink>
```

Puedes encontrar una demostración [usando React Router siguiendo esta sección](/guides/composition/#react-router) de la documentación.

## Lista Anidada

{{"demo": "pages/demos/lists/NestedList.js"}}

## Lista de carpetas

{{"demo": "pages/demos/lists/FolderList.js"}}

## Interactive

Below is an interactive demo that lets you explore the visual results of the different settings:

{{"demo": "pages/demos/lists/InteractiveList.js"}}

## Elemento de la lista seleccionado

{{"demo": "pages/demos/lists/SelectedListItem.js"}}

## Alineación de los elementos de la lista

You should change the list item alignment when displaying 3 lines or more, set the `alignItems="flex-start"` property.

{{"demo": "pages/demos/lists/AlignItemsList.js"}}

## Controles de lista

### Casilla de selección

Un checkbox puede ser una acción primaria o una acción secundaria.

El checkbox es la acción principal y el indicador de estado para el elemento de la lista. El botón de comentario es una acción secundaria y un objetivo separado.

{{"demo": "pages/demos/lists/CheckboxList.js"}}

El checkbox es la acción secundaria para el elemento de la lista y un objetivo separado.

{{"demo": "pages/demos/lists/CheckboxListSecondary.js"}}

### Switch

El switch es la acción secundaria y un objetivo separado.

{{"demo": "pages/demos/lists/SwitchListSecondary.js"}}

## Lista de subencabezados fijados

Al desplazarse, los subencabezados permanecen anclados en la parte superior de la pantalla hasta que el siguiente subencabezado los saque de la pantalla.

Esta característica se basa en el posicionamiento adhesivo CSS. Desafortunadamente, [no está implementado](https://caniuse.com/#search=sticky) por todos los navegadores que soportamos. La propiedad `disableSticky` se aplicará por defecto cuando no sea soportado por el navegador.

{{"demo": "pages/demos/lists/PinnedSubheaderList.js"}}

## Lista con margen

{{"demo": "pages/demos/lists/InsetList.js"}}