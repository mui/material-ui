---
title: List React component
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
---
# Lists (Listas)

<p class="description">As listas são índices verticais contínuos de texto ou imagens.</p>

[Lists](https://material.io/design/components/lists.html) are a continuous group of text or images. They are composed of items containing primary and supplemental actions, which are represented by icons and text.

## Simple List

{{"demo": "pages/demos/lists/SimpleList.js"}}

O último item da demonstração anterior mostra como você pode renderizar um link:

```jsx
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

//...

<ListItemLink href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemLink>
```

You can find a [demo with React Router following this section](/guides/composition/#react-router) of the documentation.

## Lista aninhada

{{"demo": "pages/demos/lists/NestedList.js"}}

## Lista de pastas

{{"demo": "pages/demos/lists/FolderList.js"}}

## Interativo

Abaixo está uma demonstração interativa que permite explorar os resultados visuais das diferentes configurações:

{{"demo": "pages/demos/lists/InteractiveList.js"}}

## ListItem Selecionado

{{"demo": "pages/demos/lists/SelectedListItem.js"}}

## Alinhar itens da lista

You should change the list item alignment when displaying 3 lines or more, set the `alignItems="flex-start"` property.

{{"demo": "pages/demos/lists/AlignItemsList.js"}}

## Controles de lista

### Checkbox

A checkbox can either be a primary action or a secondary action.

The checkbox is the primary action and the state indicator for the list item. The comment button is a secondary action and a separate target.

{{"demo": "pages/demos/lists/CheckboxList.js"}}

The checkbox is the secondary action for the list item and a separate target.

{{"demo": "pages/demos/lists/CheckboxListSecondary.js"}}

### Switch

O comutador é a ação secundária e um destino separado.

{{"demo": "pages/demos/lists/SwitchListSecondary.js"}}

## Lista de Subpastas Fixadas

Após a rolagem, os subtítulos permanecem fixos na parte superior da tela até serem empurrados para fora da tela pelo próximo subtítulo.

This feature is relying on the CSS sticky positioning. Unfortunately it's [not implemented](https://caniuse.com/#search=sticky) by all the browsers we are supporting. We default to `disableSticky` when not supported.

{{"demo": "pages/demos/lists/PinnedSubheaderList.js"}}

## Lista de Inserção

{{"demo": "pages/demos/lists/InsetList.js"}}