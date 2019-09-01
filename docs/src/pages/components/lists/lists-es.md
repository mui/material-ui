---
title: Componente List React
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
---

# Listas

<p class="description">Las listas son índices contínuos y verticales de texto o imágenes.</p>

Las [listas](https://material.io/design/components/lists.html) son un grupo contínuo de texto o imágenes. Se componen de elementos que contienen acciones primarias y complementarias, que se representan mediante iconos y texto.

## Lista Simple

{{"demo": "pages/components/lists/SimpleList.js"}}

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

Hay una demostración [usando React Router siguiendo esta sección](/guides/composition/#react-router) de la documentación.

## Lista Anidada

{{"demo": "pages/components/lists/NestedList.js"}}

## Lista de Carpetas

{{"demo": "pages/components/lists/FolderList.js"}}

## Explora

Debajo de esta línea hay una demostración interactiva que permite explorar el resultado visual de las distintas configuraciones:

{{"demo": "pages/components/lists/InteractiveList.js"}}

## ListItem Seleccionado

{{"demo": "pages/components/lists/SelectedListItem.js"}}

## Alineación de los elementos de la lista

Debería cambiar la alineación del list item cuando se muestran 3 o más líneas, ajustando la propiedad `alignItems="flex-start"`.

{{"demo": "pages/components/lists/AlignItemsList.js"}}

## Controles de Lista

### Checkbox

Un checkbox puede ser una acción primaria o una acción secundaria.

The checkbox is the primary action and the state indicator for the list item. The comment button is a secondary action and a separate target.

{{"demo": "pages/components/lists/CheckboxList.js"}}

El checkbox es la acción secundaria para el elemento de la lista y un objetivo separado.

{{"demo": "pages/components/lists/CheckboxListSecondary.js"}}

### Switch

El switch es la acción secundaria y un objetivo separado.

{{"demo": "pages/components/lists/SwitchListSecondary.js"}}

## Lista de Subencabezados Fijados

Al desplazarse, los subencabezados permanecen anclados en la parte superior de la pantalla hasta que el siguiente subencabezado los saque de la pantalla.

This feature relies on CSS sticky positioning. Unfortunately it's [not implemented](https://caniuse.com/#search=sticky) by all the supported browsers. It defaults to `disableSticky` when not supported.

{{"demo": "pages/components/lists/PinnedSubheaderList.js"}}

## Lista con Margen

{{"demo": "pages/components/lists/InsetList.js"}}

## Virtualized List

In the following example, we demonstrate how to use [react-window](https://github.com/bvaughn/react-window) with the `List` component. Renderiza 200 filas y fácilmente puede manejar más. La virtualización ayuda con problemas de rendimiento.

{{"demo": "pages/components/lists/VirtualizedList.js"}}

The use of [react-window](https://github.com/bvaughn/react-window) when possible is encouraged. If this library doesn't cover your use case, you should consider using [react-virtualized](https://github.com/bvaughn/react-virtualized), then alternatives like [react-virtuoso](https://github.com/petyosi/react-virtuoso).