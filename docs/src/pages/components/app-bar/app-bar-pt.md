---
title: Componente App Bar (Barra de Aplicativos) para React
components: AppBar, Toolbar, Menu
---

# App Bar (Barra de Aplicativos)

<p class="description">A App Bar exibe informações e ações relacionadas à tela atual.</p>

O [App Bar superior](https://material.io/design/components/app-bars-top.html) provê conteúdo e ações relacionados à tela atual. Ele é utilizado para a identidade visual, títulos de tela, navegação, e ações.

Ele pode se transformar em uma barra de ações contextual ou utilizado como uma barra de navegação.

## Barra de Aplicativos com botões

{{"demo": "pages/components/app-bar/ButtonAppBar.js"}}

## Barra de Aplicativos simples

{{"demo": "pages/components/app-bar/SimpleAppBar.js"}}

## Barra de Aplicativos com um campo de busca principal

Um campo de busca principal.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js"}}

## Barra de Aplicativos com menu

{{"demo": "pages/components/app-bar/MenuAppBar.js"}}

## Barra de Aplicativos com campo de busca

Uma barra de pesquisa na lateral.

{{"demo": "pages/components/app-bar/SearchAppBar.js"}}

## Barra de Aplicativos densa (apenas para desktop)

{{"demo": "pages/components/app-bar/DenseAppBar.js"}}

## Barra de Aplicativos inferior

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## Scrolling

### Hide App Bar

An App Bar that hides on scroll.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": "true", "maxWidth": 500}}

### Elevate App Bar

An App Bar that elevates on scroll.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": "true", "maxWidth": 500}}

### `useScrollTrigger([options]) => trigger`

#### Argumentos

1. `options` (*Object* [optional]):

- `options.disableHysteresis` (*Boolan* [optional]): Defaults to `false`. Disable the hysteresis. Ignore the scroll direction when determining the `trigger` value.
- `options.target` (*Node* [optional]): Defaults to `window`.
- `options.threshold` (*Number* [optional]): Defaults to `100`. Change the `trigger` value when the vertical scroll crosses this threshold.

#### Retornos

`trigger`: Does the scroll position match the criteria?

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