# API design approach

<p class="description">Nós aprendemos bastante como o Material-UI é usado e a refatoração da v1 permitiu-nos repensar completamente a API dos componentes.</p>

:::info
API design is hard because you can make it seem simple but it's actually deceptively complex, or make it actually simple but seem complex.
:::

[@sebmarkbage](https://twitter.com/sebmarkbage/status/728433349337841665)

As Sebastian Markbage [pointed out](https://2014.jsconf.eu/speakers/sebastian-markbage-minimal-api-surface-area-learning-patterns-instead-of-frameworks.html), no abstraction is superior to wrong abstractions. We are providing low-level components to maximize composition capabilities.

## Composição

You may have noticed some inconsistency in the API regarding composing components. To provide some transparency, we have been using the following rules when designing the API:

1. Usando a propriedade `children` é a maneira idiomática de fazer composição com React.
2. Às vezes, precisamos apenas de uma composição limitada ao elemento filho, por exemplo, quando não precisamos permitir ordem de permutações com um elemento filho. Nesse caso, fornecer propriedades explícitas torna a implementação mais simples e com maior desempenho; por exemplo, o componente `Tab` recebe uma propriedade `icon` e `label`.
3. A consistência da API é importante.

## Regras

Aside from the above composition trade-off, we enforce the following rules:

### Propagação

Props supplied to a component which are not explicitly documented are spread to the root element; for instance, the `className` prop is applied to the root.

Now, let's say you want to disable the ripples on the `MenuItem`. You can take advantage of the spread behavior:

```jsx
<MenuItem disableRipple />
```

The `disableRipple` prop will flow this way: [`MenuItem`](/material-ui/api/menu-item/) > [`ListItem`](/material-ui/api/list-item/) > [`ButtonBase`](/material-ui/api/button-base/).

### Propriedades nativas

We avoid documenting native properties supported by the DOM like [`className`](/material-ui/customization/how-to-customize/#overriding-styles-with-class-names).

### Classes CSS

All components accept a [`classes`](/material-ui/customization/how-to-customize/#overriding-styles-with-class-names) prop to customize the styles. The classes design answers two constraints: to make the classes structure as simple as possible, while sufficient to implement the Material Design guidelines.

- A classe aplicada ao elemento raiz é sempre chamada de `root`.
- Todos os estilos padrão são agrupados em uma única classe.
- As classes aplicadas a elementos não-raiz são prefixadas com o nome do elemento, por exemplo, `paperWidthXs` no componente Dialog.
- As variantes aplicadas por uma propriedade booleana **não são** prefixadas, por exemplo, a classe `rounded` aplicada pela propriedade `rounded`.
- As variantes aplicadas por uma propriedade enum **são** prefixadas, por exemplo, a classe `colorPrimary` aplicada pela propriedade `color="primary"`.
- Uma variante tem **um nível de especificidade**. As propriedades `color` e `variant` são consideradas uma variante. Quanto menor a especificidade de estilo, mais simples é sobrescrever.
- Aumentamos a especificidade de um modificador variante. Nós já **temos que fazer isso** para as pseudo-classes (`:hover`, `:focus`, etc.). Permite muito mais controle ao custo de mais trabalho. Esperamos que também seja mais intuitivo.

```js
const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};
```

### Componentes aninhados

Nested components inside a component have:

- suas próprias propriedades niveladas quando estas são chaves para a abstração do componente de nível superior, por exemplo, uma propriedade `id` para o componente `input`.
- suas próprias propriedades `xxxProps`, quando os usuários podem precisar ajustar os subcomponentes do método de renderização interno, por exemplo, expondo as propriedades `inputProps` e `InputProps` em componentes que usam `Input` internamente.
- suas próprias propriedades `xxxComponent` para executar a injeção de componentes.
- suas próprias propriedades `xxxRef`, quando o usuário precisar executar ações imperativas, por exemplo, expondo uma propriedade `inputRef` para acessar nativamente o `input` no componente `Input`. This helps answer the question ["How can I access the DOM element?"](/material-ui/getting-started/faq/#how-can-i-access-the-dom-element)

### Prop naming

The name of a boolean prop should be chosen based on the **default value**. This choice allows:

- the shorthand notation. Por exemplo, o atributo `disabled` em um elemento de entrada, se fornecido, é padronizado para `true`:

  ```jsx
  type Props = {
    contained: boolean,
    fab: boolean,
  };
  ```

- developers to know what the default value is from the name of the boolean prop. It's always the opposite.

### Componentes controlados

Most of the controlled component are controlled via the `value` and the `onChange` props, however, the `open` / `onClose` / `onOpen` combination is used for display related state. In the cases where there are more events, we put the noun first, and then the verb, for example: `onPageChange`, `onRowsChange`.

### boolean vs. enum

There are two options to design the API for the variations of a component: with a _boolean_; or with an _enum_. For example, let's take a button that has different types. Each option has its pros and cons:

- Opção 1 _booleano_:

  ```tsx
  type Props = {
    contained: boolean;
    fab: boolean;
  };
  ```

  Esta API ativou a notação abreviada: `<Button>`, `<Button contained />`, `<Button fab />`.

- Opção 2 _enumerador_:

  ```tsx
  type Props = {
    variant: 'text' | 'contained' | 'fab';
  };
  ```

  Esta API é mais verbosa: `<Button>`, `<Button variant="contained">`, `<Button variant="fab">`.

  However, it prevents an invalid combination from being used, bounds the number of props exposed, and can easily support new values in the future.

The MUI components use a combination of the two approaches according to the following rules:

- Um _booleano_ é usado quando **2** valores possíveis são necessários.
- **elemento hospedeiro**: um nó DOM no contexto de `react-dom`, por exemplo, uma instância de `window.HTMLDivElement`.

Going back to the previous button example; since it requires 3 possible values, we use an _enum_.

### Ref

The `ref` is forwarded to the root element. This means that, without changing the rendered root element via the `component` prop, it is forwarded to the outermost DOM element which the component renders. If you pass a different component via the `component` prop, the ref will be attached to that component instead.

## Glossário

- **componente hospedeiro**: um tipo de nó DOM no contexto de `react-dom`, por exemplo, um `'div'`. Veja também as [Notas de implementação do React](https://legacy.reactjs.org/docs/implementation-notes.html#mounting-host-elements).
- **elemento hospedeiro**: um nó DOM no contexto de `react-dom`, por exemplo, uma instância de `window.HTMLDivElement`.
- **mais externo**: O primeiro componente ao ler a árvore de componentes de cima para baixo, ou seja, busca em largura (breadth-first search).
- **componente raiz**: o componente mais externo que renderiza um componente do hospedeiro.
- **elemento raiz**: o elemento mais externo que renderiza um componente hospedeiro.
