---
title: Lista React Componente
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
---
# Lists (Listas)

<p class="description">As listas são índices verticais contínuos de texto ou imagens.</p>

[Listas](https://material.io/design/components/lists.html) são um grupo contínuo de texto ou imagens. Eles são compostos por itens contendo ações primárias e complementares, que são representados por ícones e texto.

## Lista simples

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

Você pode encontrar uma demonstração [com React Router seguindo esta seção](/guides/composition/#react-router) da documentação.

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

Você deve alterar o alinhamento do item da lista ao exibir 3 linhas ou mais, defina a propriedade `alignItems = "flex-start"`.

{{"demo": "pages/demos/lists/AlignItemsList.js"}}

## Controles de lista

### Checkbox

Uma caixa de seleção que pode ser tanto uma ação principal ou uma ação secundária.

O checkbox é a ação primária e o estado indicador para o item da lista. O botão comentário é a ação secundária e um destino separado.

{{"demo": "pages/demos/lists/CheckboxList.js"}}

O checkbox é a ação secundária para o item da lista e um destino separado.

{{"demo": "pages/demos/lists/CheckboxListSecondary.js"}}

### Switch

O comutador é a ação secundária e um destino separado.

{{"demo": "pages/demos/lists/SwitchListSecondary.js"}}

## Lista de Subpastas Fixadas

Após a rolagem, os subtítulos permanecem fixos na parte superior da tela até serem empurrados para fora da tela pelo próximo subtítulo.

Este recurso está dependendo do posicionamento de sticky CSS. Infelizmente, [não foi implementado](https://caniuse.com/#search=sticky) por todos os navegadores que suportamos. O padrão é `disableSticky` quando não é suportado.

{{"demo": "pages/demos/lists/PinnedSubheaderList.js"}}

## Lista de Inserção

{{"demo": "pages/demos/lists/InsetList.js"}}

## Virtualized List

In the following example, we demonstrate how to use [react-window](https://github.com/bvaughn/react-window) with the `List` component. São renderizadas 200 linhas e pode facilmente lidar com mais. Virtualization helps with performance issues.

{{"demo": "pages/demos/lists/VirtualizedList.js"}}