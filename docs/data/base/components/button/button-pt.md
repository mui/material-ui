---
product: base
title: Componente e Hook do botão React sem estilo
components: ButtonUnstyled
githubLabel: 'component: button'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/button/
---

# Botão sem estilo

<p class="description">Botões permitem que os usuários realizem ações e façam escolhas com um único toque</p>

## Botão básico

```js
import ButtonUnstyled from '@mui/base/ButtonUnstyled';

<ButtonUnstyled>Botão</ButtonUnstyled>;
```

{{"demo": "UnstyledButtonsSimple.js", "defaultCodeOpen": true}}

## Customizando o elemento raiz

Por padrão, o componente `ButtonUnstyled` renderiza um elemento HTML `button` nativo. Você pode sobrescrever isso configurando a propriedade `componente` ou `components.Root`.

Se você fornecer um elemento não interativo como um `<span>`, o componente `ButtonUnstyled` irá adicionar automaticamente os atributos de acessibilidade necessários.

Compare os atributos no `<span>` desta demonstração com o `ButtonUnstyled` da demonstração anterior:

{{"demo": "UnstyledButtonsSpan.js"}}

### Costumização complexa

`ButtonUnstyled` aceita uma ampla gama de elementos customizados além de elementos HTML. Você pode até mesmo usar SVGs, como as seguintes ilustrações de demonstração:

{{"demo": "UnstyledButtonCustom.js", "defaultCodeOpen": false}}

## Foco nos botões desativados

Da mesma forma que o elemento HTML `<button>` nativo, o componente `ButtonUnstyled` não pode receber foco quando está desativado. Isso pode reduzir sua acessibilidade, já que os leitores de tela não poderão anunciar a existência e o estado do botão.

A propriedade `focusableWhendisabled` permite que você altere esse comportamento. Quando esta prop é definida, o botão subjacente não define a propriedade `desabilitada`. Em vez disso, `aria-disabled` é usado, o que torna o botão focável.

Isso deve ser usado sempre que o botão desativado precisar ser lido por leitores de tela.

MUI Base uses this prop internally in [menu items](/base/react-menu/), making it possible to use the keyboard to navigate to disabled items (in compliance with [ARIA guidelines](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#x6-7-focusability-of-disabled-controls)).

{{"demo": "UnstyledButtonsDisabledFocus.js"}}

A propriedade `focusWhendisabled` funciona da mesma forma quando o slot raiz é personalizado, exceto que o atributo `aria-disabled` não é usado independentemente do estado da prop. A habilidade de receber foco é controlada internamente pelo atributo `tabindex`.

{{"demo": "UnstyledButtonsDisabledFocusCustom.js"}}

## Hook do useButton

```js
import { useButton } from '@mui/base/ButtonUnstyled';
```

O hook `useButton` permite usar a funcionalidade do `ButtonUnstyled` em outros componentes. Ele retorna adereços para serem colocados em um elemento de botão personalizado, juntamente com campos que representam o estado interno do botão.

O hook `useButton` requer o `ref` do elemento no qual está sendo usado. Além disso, você precisa fornecer o componente `da propriedade` (a menos que você pretenda usar o HTML `nativo<button>`).

{{"demo": "UseButton.js", "defaultCodeOpen": true}}

## Limitações

Se um `ButtonUnstyled` for personalizado com um elemento não-botão (por exemplo, `<ButtonUnstyled component="span" />`), não enviará o formulário em que ele está quando clicado. Da mesma forma, `<ButtonUnstyled component="span" type="reset">` não redefinirá seu formulário pai.
