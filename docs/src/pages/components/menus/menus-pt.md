---
title: Componente Menu React
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
---

# Menus

<p class="description">Os menus exibem uma lista de opções em superfícies temporárias.</p>

Um [Menu](https://material.io/design/components/menus.html) exibe uma lista de opções em uma superfície temporária. Elas aparecem quando os usuários interagem com um botão, ou outro controle.

## Menu simples

Menus simples abrem sobre o elemento âncora por padrão (esta opção pode ser alterada via props). Quando estão perto de uma borda da tela, menus simples realinham verticalmente para garantir que todos os itens do menu fiquem completamente visíveis.

Escolhendo uma opção deve confirmar imediatamente a opção e fechar o menu.

**Desambiguação**: Em contraste com menus simples, uma caixa de diálogo simples pode apresentar detalhes adicionais relacionados às opções disponíveis para um item da lista ou fornecer navegação ou ações indiretas relacionada à tarefa principal. Embora possam exibir o mesmo conteúdo, menus simples são preferidos em relação a caixas de diálogos simples, pois menus simples são menos prejudiciais ao contexto atual do usuário.

{{"demo": "pages/components/menus/SimpleMenu.js"}}

## Menus Selecionados

Se usado para a seleção de itens, quando abertos, menus simples tentam alinhar verticalmente o item de menu atualmente selecionado com o elemento de âncora, e o foco inicial será colocado no item de menu selecionado. O item de menu atualmente selecionado é definido usando a propriedade</code>selected`(de <a href="/api/list-item/">ListItem</a>).
Para usar um item de menu selecionado sem afetar o foco inicial ou o posicionamento vertical do menu, defina a propriedade <code>variant` como `menu`.

{{"demo": "pages/components/menus/SimpleListMenu.js"}}

## Composição de MenuList

O componente `Menu` usa o componente `Popover` internamente. No entanto, você pode querer usar uma estratégia de posicionamento diferente ou não bloquear a rolagem. Para responder a essas necessidades, expomos um componente `MenuList` que você pode compor, com `Popper` neste exemplo.

A principal responsabilidade do componente `MenuList` é manipular o foco.

{{"demo": "pages/components/menus/MenuListComposition.js"}}

## Menus Customizados

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescrita](/customization/components/).

{{"demo": "pages/components/menus/CustomizedMenus.js"}}

O `MenuItem` é um wrapper em torno do `ListItem` com alguns estilos adicionais. Você pode usar os mesmos recursod de composição de lista com o componente `MenuItem`:

## Altura máxima dos menus

Se a altura de um menu impede que todos os itens de menu sejam exibidos, o menu terá internamente a opção de rolagem.

{{"demo": "pages/components/menus/LongMenu.js"}}

## Limitações

Existe [um erro com flexbox](https://bugs.chromium.org/p/chromium/issues/detail?id=327437) que impede `text-overflow: ellipsis` de funcionar em um leiaute flexbox. Você pode usar o componente `Typography` com `noWrap` para solucionar esse problema:

{{"demo": "pages/components/menus/TypographyMenu.js"}}

## Trocar transição

Use uma transição diferente.

{{"demo": "pages/components/menus/FadeMenu.js"}}

## Projetos Complementares

Para usos mais avançados, você pode tirar vantagem com:

### PopupState helper

Existe um pacote de terceiros [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) que cuida do estado do menu para você na maioria dos casos.

{{"demo": "pages/components/menus/MenuPopupState.js"}}