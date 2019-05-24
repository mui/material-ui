# Pontos de quebra (Breakpoints)

<p class="description">API que permite o uso de pontos de quebra em uma ampla variedade de contextos.</p>

Para uma experiência de usuário ideal, as interfaces do material design precisam adaptar seu layout em vários pontos de quebra. Material-UI usa uma implementação **simplificada** da [especificação](https://material.io/design/layout/responsive-layout-grid.html#breakpoints) original.

Cada ponto de quebra (uma chave) corresponde a uma largura de tela *fixa* (um valor):

- **xs,** extra-pequeno: 0px
- **sm,** pequeno: 600px
- **md,** médio: 960px
- **lg,** grande: 1280px
- **xl,** extra-grande: 1920px

Estes [valores de ponto de quebra](/customization/default-theme/?expend-path=$.breakpoints.values) são usados para determinar intervalos de ponto de quebra. Um intervalo inicia a partir do valor do ponto de quebra, incluindo seu valor inicial, até o próximo valor de ponto de quebra menos um:

```js
valor           |0px     600px    960px    1280px   1920px
chave           |xs      sm       md       lg       xl
largura da tela |--------|--------|--------|--------|-------->
intervalo       |   xs   |   sm   |   md   |   lg   |   xl
```

Esses valores sempre podem ser customizados. Você os encontrará no tema, no objeto [`breakpoints.values`](/customization/default-theme/?expend-path=$.breakpoints.values).

Os pontos de quebra são usados internamente em vários componentes para torná-los responsivos, mas você também pode tirar proveito deles para controlar o leiaute da sua aplicação através do componente [Grade](/components/grid/) e [Hidden](/components/hidden/).

## Consultas de Mídia CSS

Consultas de mídia CSS é a abordagem idiomática para tornar sua interface de usuário responsiva. Nós fornecemos quatro ajudantes de estilos para fazer isso:

- [theme.breakpoints.up(key)](#theme-breakpoints-up-key-media-query)
- [theme.breakpoints.down(key)](#theme-breakpoints-down-key-media-query)
- [theme.breakpoints.only(key)](#theme-breakpoints-only-key-media-query)
- [theme.breakpoints.between(start, end)](#theme-breakpoints-between-start-end-media-query)

Na demonstração a seguir, alteramos a cor do plano de fundo (vermelho, azul & verde) com base na largura da tela.

```jsx
const styles = theme => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      backgroundColor: green[500],
    },
  },
});
```

{{"demo": "pages/customization/breakpoints/MediaQuery.js"}}

## Consultas de mídia JavaScript

Às vezes, usar CSS não é suficiente. Você pode querer alterar a árvore de renderização React com base no valor do ponto de quebra, em JavaScript.

### useMediaQuery hook

Você pode aprender mais na página [useMediaQuery](/components/use-media-query/).

### withWidth()

> ⚠️ Esse componente de ordem superior será descontinuado para o hook [ useMediaQuery](/components/use-media-query/) quando os hooks do React forem liberados como estáveis.

```jsx
import withWidth from '@material-ui/core/withWidth';

function MyComponent(props) {
  return <div>{`Current width: ${props.width}`}</div>;
}

export default withWidth()(MyComponent);
```

Na demonstração a seguir, alteramos o elemento DOM renderizado (*em*, <u>u</u>, ~~del~~ & span) com base na largura da tela.

{{"demo": "pages/customization/breakpoints/WithWidth.js"}}

## API

### `theme.breakpoints.up(key) => media query`

#### Argumentos

1. `key` (*String* | *Number*): Uma chave de ponto de quebra (`xs`, `sm`, etc.) ou um número de largura de tela em pixels.

#### Retornos

`media query`: Uma string de consulta de mídia pronta para ser usada com o JSS.

#### Exemplos

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, ∞[
    //       [960px, ∞[
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.down(key) => media query`

#### Argumentos

1. `key` (*String* | *Number*): Uma chave de ponto de quebra (`xs`, `sm`, etc.) ou um número de largura de tela em pixels.

#### Retornos

`media query`: Uma string de consulta de mídia pronta para ser usada com o JSS, que corresponde a largura de tela menores incluindo o tamanho da tela fornecido como chave do ponto de quebra.

#### Exemplos

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [0, md + 1[
    //       [0, lg[
    //       [0, 1280px[
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.only(key) => media query`

#### Argumentos

1. `key` (*String*): Uma chave de ponto de quebra (`xs`, `sm`, etc.).

#### Retornos

`media query`: Uma string de consulta de mídia pronta para ser usada com o JSS, que corresponde a larguras de telas maiores e incluindo o tamanho de tela fornecido na chave do ponto de quebra.

#### Exemplos

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, md + 1[
    //       [md, lg[
    //       [960px, 1280px[
    [theme.breakpoints.only('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.between(start, end) => media query`

#### Argumentos

1. `start` (*String*): Uma chave de ponto de quebra (`xs`, `sm`, etc.).
2. `end` (*String*): Uma chave de ponto de quebra (`xs`, `sm`, etc.).

#### Retornos

`media query`: Uma string de consulta de mídia pronta para ser usada com o JSS, que corresponde a larguras de telas maiores que o tamanho da tela fornecido na chave de ponto de quebra no primeiro argumento e menor que o tamanho de tela fornecido pela chave de ponto de quebra no segundo argumento.

#### Exemplos

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [sm, md + 1[
    //       [sm, lg[
    //       [600px, 1280px[
    [theme.breakpoints.between('sm', 'md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `withWidth([options]) => higher-order component`

Injeta uma propriedade `width`. Não modifica o componente passado para ele; em vez disso, ele retorna um novo componente. Esta propriedade de ponto de quebra, `width`, corresponde à largura de tela atual. Pode ser um dos seguintes pontos de quebra:

```ts
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

Alguns detalhes de implementação que podem ser interessantes para estar ciente:

- Ele encaminha as propriedades *non React static* para que este HOC seja mais "transparente". Por exemplo, pode ser usado para definir um método estático (next.js) `getInitialProps()`.

#### Argumentos

1. `options` (*Object* [optional]): 
    - `options.withTheme` (*Boolean* [opcional]): Padrão `false`. Fornecer o objeto `theme` para o componente como uma propriedade.
    - `options.noSSR` (*Boolean* [opcional]): Padrão `false`. Para realizar a reconciliação de renderização do lado do servidor, ele precisa renderizar duas vezes. Uma primeira vez sem nada e uma segunda vez com os filhos. Este ciclo de renderização de dupla passagem tem uma desvantagem. A interface do usuário pode piscar. Você pode definir esse sinalizador para `true` se você não estiver fazendo a renderização do lado do servidor.
    - `options.initialWidth` (*Breakpoint* [opcional]): Como `window.innerWidth` não esta disponível no servidor, retornamos uma correspondência padrão durante a primeira montagem. Você pode querer usar uma heurística para aproximar a largura da tela no navegador do cliente. Por exemplo, você poderia estar usando o user-agent ou o client-hint. https://caniuse.com/#search=client%20hint, também podemos definir a largura inicial globalmente usando [`propriedades customizadas`](/customization/globals/#default-props) no tema. Para definir o initialWidth, precisamos passar uma propriedade customizada com esta forma:

```js
const theme = createMuiTheme({
  props: {
    // Componente withWidth ⚛️
    MuiWithWidth: {
      // Propriedade de largura inicial
      initialWidth: 'lg', // Ponto de quebra globalmente definido 🌎!
    },
  },
});
```

- `options.resizeInterval` (*Number* [opcional]): Padrão é 166, que corresponde a 10 quadros a 60 Hz. Número de milissegundos a aguardar antes de responder a um evento de redimensionamento de tela.

#### Retornos

`higher-order component`: Deve ser usado para encapsular o componente.

#### Exemplos

```jsx
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

class MyComponent extends React.Component {
  render () {
    if (isWidthUp('sm', this.props.width)) {
      return <span />
    }

    return <div />;
  }
}

export default withWidth()(MyComponent);
```