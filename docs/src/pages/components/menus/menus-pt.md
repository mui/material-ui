---
title: React Menu component
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
githubLabel: 'component: Menu'
materialDesign: https://material.io/components/menus
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#menubutton'
---

# Menu

<p class="description">Os menus exibem uma lista de opções em superfícies temporárias.</p>

A menu displays a list of choices on a temporary surface. Aparece quando o usuário interage com um botão ou outro controle.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic menu

A basic menu opens over the anchor element by default (this option can be [changed](#menu-positioning) via props). When close to a screen edge, a basic menu vertically realigns to make sure that all menu items are completely visible.

Escolhendo uma opção deve confirmar imediatamente a opção e fechar o menu.

**Desambiguação**: Em contraste com menus simples, uma caixa de diálogo simples pode apresentar detalhes adicionais relacionados às opções disponíveis para um item da lista ou fornecer navegação ou ações indiretas relacionada à tarefa principal. Embora possam exibir o mesmo conteúdo, menus simples são preferidos em relação a diálogos simples, pois menus simples são menos prejudiciais ao contexto atual do usuário.

{{"demo": "pages/components/menus/SimpleMenu.js"}}

## Selected menu

Se usado para a seleção de itens, quando abertos, menus simples tentam alinhar verticalmente o item de menu atualmente selecionado com o elemento de âncora, e o foco inicial será colocado no item de menu selecionado. O item de menu atualmente selecionado é definido usando a propriedade`selected`(de [ListItem](/api/list-item/)). Para usar um item de menu selecionado sem afetar o foco inicial ou o posicionamento vertical do menu, defina a propriedade `variant` como `menu`.

{{"demo": "pages/components/menus/SimpleListMenu.js"}}

## Positioned menu

Because the `Menu` component uses the `Popover` component to position itself, you can use the same [positioning props](/components/popover/#anchor-playground) to position it. For instance, you can display the menu below the anchor:

{{"demo": "pages/components/menus/PositionedMenu.js"}}

## Composição de MenuList

O componente `Menu` usa o componente `Popover` internamente. No entanto, você pode querer usar uma estratégia de posicionamento diferente ou não bloquear a rolagem. Para atender a essas situações, disponibilizamos um componente `MenuList` que você pode compor com o uso do `Popper`, veja o exemplo a seguir.

A principal responsabilidade do componente `MenuList` é manipular o foco.

{{"demo": "pages/components/menus/MenuListComposition.js", "bg": true}}

## Customized menu

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/menus/CustomizedMenus.js"}}

O `MenuItem` é um encapsulador em torno de `ListItem` com alguns estilos adicionais. Você pode usar os mesmos recursos de composição de lista com o componente `MenuItem`:

🎨 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/styles/menu).

## Max height menu

Se a altura de um menu impede que todos os itens de menu sejam exibidos, o menu terá internamente a opção de rolagem.

{{"demo": "pages/components/menus/LongMenu.js"}}

## Limitações

Existe [um problema com flexbox](https://bugs.chromium.org/p/chromium/issues/detail?id=327437) que impede `text-overflow: ellipsis` de funcionar em um leiaute flexível. Você pode usar o componente `Typography` com `noWrap` para solucionar esse problema:

{{"demo": "pages/components/menus/TypographyMenu.js", "bg": true}}

## Trocar transição

Use uma transição diferente.

{{"demo": "pages/components/menus/FadeMenu.js"}}

## Menu de contexto

Aqui está um exemplo de um menu de contexto. (Clique com o botão direito para abrir.)

{{"demo": "pages/components/menus/ContextMenu.js"}}

## Projetos Complementares

Para situações de uso mais avançadas, você pode tirar proveito com:

### PopupState helper

Existe um pacote de terceiros [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) que cuida do estado do menu para você na maioria das situações.

{{"demo": "pages/components/menus/MenuPopupState.js"}}
