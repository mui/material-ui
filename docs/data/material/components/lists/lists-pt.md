---
product: material-ui
title: Componente React Lista
components: Collapse, Divider, List, ListItem, ListItemButton, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
githubLabel: 'component: list'
materialDesign: https://m2.material.io/components/lists
---

# Listas

<p class="description">Listas são continuas, apresentam verticalmente texto ou imagens.</p>

[Listas](https://m2.material.io/components/lists) são um grupo contínuo de texto ou imagens. Elas são compostas por itens contendo ações primárias e complementares, que são representados por ícones e texto.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic List

{{"demo": "BasicList.js", "bg": true}}

O último item da demonstração anterior mostra como você pode renderizar um link:

```jsx
<ListItemButton component="a" href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemButton>
```

You can find a [demo with React Router following this section](/material-ui/guides/routing/#list) of the documentation.

## Lista Aninhada

{{"demo": "NestedList.js", "bg": true}}

## Lista de Pastas

{{"demo": "FolderList.js", "bg": true}}

## Interativo

Abaixo está uma demonstração interativa que permite explorar os resultados visuais das diferentes configurações:

{{"demo": "InteractiveList.js", "bg": true}}

## Lista com item selecionado

{{"demo": "SelectedListItem.js", "bg": true}}

## Alinhar itens da lista

When displaying three lines or more, the avatar is not aligned at the top. When displaying three lines or more, the avatar is not aligned at the top. You should set the `alignItems="flex-start"` prop to align the avatar at the top, following the Material Design guidelines:

{{"demo": "AlignItemsList.js", "bg": true}}

## Controles de Lista

### Caixa de seleção

Uma caixa de seleção pode ser uma ação primária ou uma ação secundária.

A caixa de seleção é a ação principal e o indicador de estado para o item da lista. O botão de comentário é uma ação secundária e um destino separado.

{{"demo": "CheckboxList.js", "bg": true}}

A caixa de seleção é uma ação secundária, sem interferir com o estado do item da lista.

{{"demo": "CheckboxListSecondary.js", "bg": true}}

### Interruptor

O interruptor é uma ação secundária, sem interferir com o estado do item da lista.

{{"demo": "SwitchListSecondary.js", "bg": true}}

## Sticky subheader

Após a rolagem, os subtítulos permanecem fixos na parte superior da tela até serem empurrados para fora da área de visualização pelo próximo subtítulo. Esse recurso depende do posicionamento fixo do CSS. (⚠️ no IE 11 support)

{{"demo": "PinnedSubheaderList.js", "bg": true}}

## Item de lista encaixado

A propriedade `inset` habilita um item de lista, que não tenha um ícone principal ou um avatar, para alinhar corretamente os itens que possuem.

{{"demo": "InsetList.js", "bg": true}}

## Lista sem espaçamentos

Ao renderizar uma lista dentro de um componente que define seus próprios espaços, o espaçamento do `ListItem` pode ser desabilitado com `disableGutters`.

{{"demo": "GutterlessList.js", "bg": true}}

## Lista virtualizada

No exemplo a seguir, nós demonstramos como usar a biblioteca [react-window](https://github.com/bvaughn/react-window) com o componente `List`. Ela renderiza 200 linhas e pode facilmente lidar com mais. A virtualização ajuda a lidar com problemas de desempenho.

{{"demo": "VirtualizedList.js", "bg": true}}

O uso da biblioteca [react-window](https://github.com/bvaughn/react-window), quando possível, é recomendado. Se no seu caso esta biblioteca não resolver, você deve considerar o uso de [react-virtualized](https://github.com/bvaughn/react-virtualized), e em seguida, como alternativa [react-virtuoso](https://github.com/petyosi/react-virtuoso).

## Customized List

Aqui estão alguns exemplos de customização do componente. You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedList.js"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/list-item/).
