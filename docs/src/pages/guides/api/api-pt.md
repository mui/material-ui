# Abordagem do Design da API

<p class="description">We have learned a great deal regarding how MUI is used, and the v1 rewrite allowed us to completely rethink the component API.</p>

> O design da API é difícil porque você pode fazer com que pareça simples, mas na verdade é extremamente complexo ou simples, mas parece complexo.

[@sebmarkbage](https://twitter.com/sebmarkbage/status/728433349337841665)

Como Sebastian Markbage [apontou](https://2014.jsconf.eu/speakers/sebastian-markbage-minimal-api-surface-area-learning-patterns-instead-of-frameworks.html), nenhuma abstração é superior a abstrações erradas. Estamos fornecendo componentes de baixo nível para maximizar os recursos de composição.

## Composição

Você deve ter notado alguma inconsistência na API em relação à composição de componentes. Para fornecer alguma transparência, usamos as seguintes regras ao projetar a API:

1. Usando a propriedade `children` é a maneira idiomática de fazer composição com React.
2. Às vezes, precisamos apenas de uma composição limitada ao elemento filho, por exemplo, quando não precisamos permitir ordem de permutações com um elemento filho. Nesse caso, fornecer propriedades explícitas torna a implementação mais simples e com maior desempenho; por exemplo, o componente `Tab` recebe uma propriedade `icon` e `label`.
3. A consistência da API é importante.

## Regras

Além do trade-off da composição acima, aplicamos as seguintes regras:

### Propagação

Propriedades fornecidas para um componente que não estão explicitamente documentadas são propagadas para o elemento raiz; por exemplo, a propriedade `className` é aplicada no elemento raiz.

Agora, digamos que você queira desabilitar o efeito cascata do `MenuItem`. Você pode aproveitar o comportamento da propagação:

```jsx
<MenuItem disableRipple />
```

A propriedade `disableRipple` fluirá desta maneira: [`MenuItem`](/api/menu-item/) > [`ListItem`](/api/list-item/) > [`ButtonBase`](/api/button-base/).

### Propriedades nativas

Evitamos documentar propriedades nativas suportadas pelo DOM como [`className`](/customization/components/#overriding-styles-with-class-names).

### Classes CSS

All components accept a [`classes`](/customization/how-to-customize/#overriding-styles-with-class-names) prop to customize the styles. The classes design answers two constraints: to make the classes structure as simple as possible, while sufficient to implement the Material Design guidelines.

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

Os componentes aninhados dentro de um componente possuem:

- suas próprias propriedades niveladas quando estas são chaves para a abstração do componente de nível superior, por exemplo uma propriedade `id` para o componente `input`.
- suas próprias propriedades `xxxProps`, quando os usuários podem precisar ajustar os subcomponentes do método de renderização interno, por exemplo, expondo as propriedades `inputProps` e `InputProps` em componentes que usam `Input` internamente.
- suas próprias propriedades `xxxComponent` para executar a injeção de componentes.
- suas próprias propriedades `xxxRef`, quando o usuário precisar executar ações imperativas, por exemplo, expondo uma propriedade `inputRef` para acessar nativamente o `input` no componente `Input`. Isso ajuda a responder a pergunta ["Como posso acessar o elemento DOM?"](/getting-started/faq/#how-can-i-access-the-dom-element)

### Nomeando propriedades

O nome de uma propriedade booleana deve ser escolhido com base no **valor padrão**. This choice allows:

- the shorthand notation. For example, the `disabled` attribute on an input element, if supplied, defaults to `true`:

  ```jsx
  <Input enabled={false} /> ❌
  <Input disabled /> ✅
  ```

- developers to know what the default value is from the name of the boolean prop. It's always the opposite.

### Componentes controlados

A maior parte de componentes controlados, é controlado pelas propriedades `value` e `onChange`, no entanto, o `open` / `onClose` / `onOpen` é uma combinação usada para o estado relacionado à exibição. Nos casos em que há mais eventos, colocamos o substantivo em primeiro lugar e depois o verbo, por exemplo: `onPageChange`, `onRowsChange`.

### boolean vs. enum

Existem duas opções para projetar a API para as variações de um componente: com um *boolean*; ou com um *enum*. Por exemplo, vamos pegar um botão que tenha tipos diferentes. Cada opção tem seus prós e contras:

- Option 1 _boolean_:

  ```tsx
  type Props = {
    contained: boolean;
    fab: boolean;
  };
  ```

  This API enables the shorthand notation: `<Button>`, `<Button contained />`, `<Button fab />`.

- Option 2 _enum_:

  ```tsx
  type Props = {
    variant: 'text' | 'contained' | 'fab';
  };
  ```

  This API is more verbose: `<Button>`, `<Button variant="contained">`, `<Button variant="fab">`.

  However, it prevents an invalid combination from being used, bounds the number of props exposed, and can easily support new values in the future.

The MUI components use a combination of the two approaches according to the following rules:

- A _boolean_ is used when **2** possible values are required.
- An _enum_ is used when **> 2** possible values are required, or if there is the possibility that additional possible values may be required in the future.

Voltando ao exemplo do botão anterior; ele requer 3 valores possíveis, usamos um *enumerador*.

### Ref

O `ref` é encaminhado para o elemento raiz. Isso significa que, sem alterar o elemento raiz renderizado através da propriedade `component`, ele é encaminhado para o elemento DOM mais externo para que o componente renderize. Se você passar um componente diferente através da propriedade `component`, o ref será anexado para esse componente.

## Glossário

- **host component**: a DOM node type in the context of `react-dom`, e.g. a `'div'`. See also [React Implementation Notes](https://reactjs.org/docs/implementation-notes.html#mounting-host-elements).
- **host element**: a DOM node in the context of `react-dom`, e.g. an instance of `window.HTMLDivElement`.
- **outermost**: The first component when reading the component tree from top to bottom i.e. breadth-first search.
- **root component**: the outermost component that renders a host component.
- **root element**: the outermost element that renders a host component.
