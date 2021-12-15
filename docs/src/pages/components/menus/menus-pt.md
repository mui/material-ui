---
title: Componente React Menu
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
githubLabel: 'component: Menu'
materialDesign: https://material.io/components/menus
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#menubutton'
---

# Menu

<p class="description">Os menus exibem uma lista de opções em superfícies temporárias.</p>

O menu exibe uma lista de opções em uma superfície temporária. Aparece quando o usuário interage com um botão ou outro controle.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Menu básico

Um menu básico abre sobre o elemento âncora por padrão (esta opção pode ser [alterada](#menu-positioning) através de propriedades). Quando estão perto de uma borda da tela, menus básicos realinham verticalmente para garantir que todos os itens do menu fiquem completamente visíveis.

Escolhendo uma opção deve confirmar imediatamente a opção e fechar o menu.

**Desambiguação**: Em contraste com menus simples, uma caixa de diálogo simples pode apresentar detalhes adicionais relacionados às opções disponíveis para um item da lista ou fornecer navegação ou ações indiretas relacionada à tarefa principal. Although they can display the same content, simple menus are preferred over simple dialogs because simple menus are less disruptive to the user's current context.

{{"demo": "pages/components/menus/BasicMenu.js"}}

## Icon menu

No viewport do desktop, o preenchimento é aumentado para dar mais espaço ao menu.

{{"demo": "pages/components/menus/IconMenu.js", "bg": true}}

## Dense menu

For the menu that has long list and long text, you can use the `dense` prop to reduce the padding and text size.

{{"demo": "pages/components/menus/DenseMenu.js", "bg": true}}

## Menu selecionado

Se usado para seleção de itens, quando abertos, menus simples colocam o foco inicial no item do menu selecionado. O item de menu atualmente selecionado é definido usando a propriedade`selected`(de [ListItem](/api/list-item/)). Para usar um item do menu selecionado sem impactar o foco inicial, defina a propriedade `variante` para "menu".

{{"demo": "pages/components/menus/SimpleListMenu.js"}}

## Menu posicionado

Devido ao componente `Menu` usar o componente `Popover` para se posicionar, você pode usar as mesmas [propriedades de posicionamento](/components/popover/#anchor-playground) para posicioná-lo. For instance, you can display the menu on top of the anchor:

{{"demo": "pages/components/menus/PositionedMenu.js"}}

## Composição de MenuList

O componente `Menu` usa o componente `Popover` internamente. No entanto, você pode querer usar uma estratégia de posicionamento diferente ou não bloquear a rolagem. Para atender a essas situações, disponibilizamos um componente `MenuList` que você pode compor com o uso do `Popper`, veja o exemplo a seguir.

A principal responsabilidade do componente `MenuList` é manipular o foco.

{{"demo": "pages/components/menus/MenuListComposition.js", "bg": true}}

## Account menu

`Menu` content can be mixed with other components like `Avatar`.

{{"demo": "pages/components/menus/AccountMenu.js"}}

## Customization

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/how-to-customize/).

{{"demo": "pages/components/menus/CustomizedMenus.js"}}

O `MenuItem` é um encapsulador em torno de `ListItem` com alguns estilos adicionais. Você pode usar os mesmos recursos de composição de lista com o componente `MenuItem`:

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/menu/).

## Altura máxima dos menu

Se a altura de um menu impede que todos os itens de menu sejam exibidos, o menu terá internamente a opção de rolagem.

{{"demo": "pages/components/menus/LongMenu.js"}}

## Limitations

Existe [um problema com flexbox](https://bugs.chromium.org/p/chromium/issues/detail?id=327437) que impede `text-overflow: ellipsis` de funcionar em um leiaute flexível. Você pode usar o componente `Typography` com `noWrap` para solucionar esse problema:

{{"demo": "pages/components/menus/TypographyMenu.js", "bg": true}}

## Trocar transição

Use uma transição diferente.

{{"demo": "pages/components/menus/FadeMenu.js"}}

## Menu de contexto

Aqui está um exemplo de um menu de contexto. (Clique com o botão direito para abrir.)

{{"demo": "pages/components/menus/ContextMenu.js"}}

## Complementary projects

For more advanced use cases you might be able to take advantage of:

### PopupState helper

Existe um pacote de terceiros [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) que cuida do estado do menu para você na maioria das situações.

{{"demo": "pages/components/menus/MenuPopupState.js"}}
