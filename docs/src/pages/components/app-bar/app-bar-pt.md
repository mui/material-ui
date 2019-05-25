---
title: Componente App Bar (Barra de Aplicativos) para React
components: AppBar, Toolbar, Menu
---

# Barra de Aplicativos

<p class="description">A Barra de aplicativos exibe informações e ações relacionadas à tela atual.</p>

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

## Rolagem

### Barra de Aplicativos oculta

Uma barra de aplicativos que se esconde ao rolar.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": "true", "maxWidth": 500}}

### Barra de aplicativos elevada

Uma barra de aplicativos que se mantém acima ao rolar.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": "true", "maxWidth": 500}}

### `useScrollTrigger([options]) => trigger`

#### Argumentos

1. `options` (*Object* [opcional]):
    
    - `options.disableHysteresis` (*Boolean* [opcional]): Padrão `false`. Desabilita a histerese. Ignora a direção de rolagem ao determinar o valor `trigger`.
    - `options.target` (*Node* [opcional]): Padrão `window`.
    - `options.threshold` (*Number* [opcional]): Padrão `100`. Modifica o valor de `trigger` quando a barra de rolagem vertical ultrapassar este limite.

#### Retornos

`trigger`: a posição de rolagem corresponde aos critérios?

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