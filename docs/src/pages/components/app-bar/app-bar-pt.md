---
title: Componente App Bar (Barra de Aplicativos) para React
components: AppBar, Toolbar, Menu
---

# Barra de Aplicativos

<p class="description">A Barra de aplicativos exibe informações e ações relacionadas à tela atual.</p>

A [barra de aplicativos superior](https://material.io/design/components/app-bars-top.html) provê conteúdo e ações relacionados à tela atual. Ela é utilizada para a identidade visual, títulos de tela, navegação, e ações.

Ele pode se transformar em uma barra de ações contextual ou utilizado como uma barra de navegação.

## Barra de Aplicativos Simples

{{"demo": "pages/components/app-bar/ButtonAppBar.js"}}

## Barra de Aplicativos com um campo de busca principal

Um campo de busca principal.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js"}}

## Barra de Aplicativos com menu

{{"demo": "pages/components/app-bar/MenuAppBar.js"}}

## Barra de Aplicativos com campo de busca

Uma barra de pesquisa na lateral.

{{"demo": "pages/components/app-bar/SearchAppBar.js"}}

## Densa (apenas para desktop)

{{"demo": "pages/components/app-bar/DenseAppBar.js"}}

## Barra de Aplicativos inferior

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## Rolagem

Você pode usar o hook `useScrollTrigger()` para responder às ações de rolagem do usuário.

### Barra de Aplicativos oculta

A barra de aplicativos se oculta na rolagem para baixo, deixando mais espaço para leitura.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true, "maxWidth": 500}}

### Barra de aplicativos elevada

A barra de aplicativos eleva-se na rolagem para comunicar que o usuário não está na parte superior da página.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true, "maxWidth": 500}}

### Voltar ao topo

Um botão de ação flutuante aparece na rolagem para facilitar o retorno ao topo da página.

{{"demo": "pages/components/app-bar/BackToTop.js", "iframe": true, "maxWidth": 500}}

### `useScrollTrigger([options]) => trigger`

#### Argumentos

1. `options` (*Object* [opcional]):

- `options.disableHysteresis` (*Boolean* [opcional]): Padrão `false`. Desabilita a histerese. Ignora a direção de rolagem ao determinar o valor `trigger`.
- `options.target` (*Node* [opcional]): Padrão `window`.
- `options.threshold` (*Number* [opcional]): Padrão `100`. Modifica o valor limite que aciona a `trigger` quando a barra de rolagem vertical cruzar ou chegar a este limite.

#### Retornos

`trigger`: A posição de rolagem corresponde aos critérios?

#### Exemplos

```jsx
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <div>Hello</div>
    </Slide>
  );
}
```