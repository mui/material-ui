---
title: Componente React para Listas
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
---

# Listas

<p class="description">Listas são continuas, apresentam verticalmente texto ou imagens.</p>

[Listas](https://material.io/design/components/lists.html) são um grupo contínuo de texto ou imagens. Elas são compostas por itens contendo ações primárias e complementares, que são representados por ícones e texto.

## Lista Simples

{{"demo": "pages/components/lists/SimpleList.js"}}

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

Você pode encontrar uma [demonstração com React Router seguindo esta seção](/guides/composition/#react-router) da documentação.

## Lista Aninhada

{{"demo": "pages/components/lists/NestedList.js"}}

## Lista de Pastas

{{"demo": "pages/components/lists/FolderList.js"}}

## Interativo

Abaixo está uma demonstração interativa que permite explorar os resultados visuais das diferentes configurações:

{{"demo": "pages/components/lists/InteractiveList.js"}}

## Lista - Item Selecionado

{{"demo": "pages/components/lists/SelectedListItem.js"}}

## Alinhar itens da lista

Você deve alterar o alinhamento do item da lista ao exibir 3 linhas ou mais, alterando a propriedade `alignItems = "flex-start"`.

{{"demo": "pages/components/lists/AlignItemsList.js"}}

## Controles de Lista

### Caixa de Seleção

Uma caixa de seleção pode ser uma ação primária ou uma ação secundária.

A caixa de seleção é a ação primária e o indicador de estado para o item da lista. O botão comentário é uma ação secundária separada.

{{"demo": "pages/components/lists/CheckboxList.js"}}

A caixa de seleção é uma ação secundária, sem interferir com o estado do item da lista.

{{"demo": "pages/components/lists/CheckboxListSecondary.js"}}

### Seletor

O seletor é uma ação secundária, sem interferir com o estado do item da lista.

{{"demo": "pages/components/lists/SwitchListSecondary.js"}}

## Lista de Subpastas Fixadas

Após a rolagem, os subtítulos permanecem fixos na parte superior da tela até serem empurrados para fora da tela pelo próximo subtítulo.

Este recurso está dependendo do posicionamento de sticky CSS. Infelizmente este recurso [não foi implementado](https://caniuse.com/#search=sticky) por todos os navegadores que suportamos. Colocamos como padrão `disableSticky` quando não é suportado.

{{"demo": "pages/components/lists/PinnedSubheaderList.js"}}

## Lista de Inserção

{{"demo": "pages/components/lists/InsetList.js"}}

## Lista Virtualizada

No exemplo a seguir, nós demonstramos como usar [react-window](https://github.com/bvaughn/react-window) com o componente `List`. Ela renderiza 200 linhas e pode facilmente lidar com mais. A virtualização ajuda a lidar com problemas de desempenho.

{{"demo": "pages/components/lists/VirtualizedList.js"}}

Nós recomendamos o uso de [react-window](https://github.com/bvaughn/react-window) quando possível. Se no seu caso esta biblioteca não resolver, você deve considerar o uso de [react-virtualized](https://github.com/bvaughn/react-virtualized), e em seguida, como alternativa [react-virtuoso](https://github.com/petyosi/react-virtuoso).