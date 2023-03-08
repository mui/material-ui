# Bibliotecas de roteamento

<p class="description">Por padrão, a navegação é realizada com um elemento <code>&lt;a&gt;</code> nativo. Você pode personalizá-lo para utilizar seu próprio roteador. Por exemplo, usando o Link do Next.js ou react-router.</p>

## Componentes de navegação

Existem dois componentes principais disponíveis para realizar navegações. The most common one is the [`Link`](/material-ui/react-link/) as its name might suggest. The most common one is the [`Link`](/components/links/) as its name might suggest.

{{"demo": "LinkDemo.js"}}

Você também pode fazer com que um botão execute ações de navegação. If your component is extending [`ButtonBase`](/material-ui/api/button-base/), providing a `href` prop enables the link mode. For instance, with a `Button` component:

{{"demo": "ButtonDemo.js"}}

## Global theme Link

Em aplicações da vida real, usar um elemento `<a>` nativo é raramente o suficiente. Você pode melhorar a experiência do usuário usando sistematicamente um componente Link aprimorado. For instance, with react-router: The theme of Material-UI allows configuring this component once. For instance, with react-router:

```tsx
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});
```

{{"demo": "LinkRouterWithTheme.js", "defaultCodeOpen": false}}

:::warning
⚠️ This approach has limitations with TypeScript. The `href` prop only accepts a string. In the event you need to provide a richer structure, see the next section.
:::

## Propriedade `component`

You can achieve the integration with third-party routing libraries with the `component` prop. You can learn more about this prop in the [**composition guide**](/material-ui/guides/composition/#component-prop).

### Link

Here are a few demos with [react-router](https://github.com/remix-run/react-router). You can apply the same strategy with all the components: BottomNavigation, Card, etc.

{{"demo": "LinkRouter.js"}}

### Button

{{"demo": "ButtonRouter.js"}}

**Note**: The button base component adds the `role="button"` attribute when it identifies the intent to render a button without a native `<button>` element. This can create issues when rendering a link. If you are not using one of the `href`, `to`, or `component="a"` props, you need to override the `role` attribute. The above demo achieves this by setting `role={undefined}` **after** the spread props.

```jsx
const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/" {...props} role={undefined} />
));
```

### Tabs

{{"demo": "TabsRouter.js", "defaultCodeOpen": false}}

### Lista

{{"demo": "ListRouter.js"}}

## Mais exemplos

### Next.js

Next.js has [a custom Link component](https://nextjs.org/docs/api-reference/next/link). The [example folder](https://github.com/mui/material-ui/tree/HEAD/examples/nextjs-with-typescript) provides adapters for usage with MUI.

- The first version of the adapter is the [`NextLinkComposed`](https://github.com/mui/material-ui/blob/HEAD/examples/nextjs-with-typescript/src/Link.tsx) component. Este componente não tem estilo e é o único responsável pelo manuseio da navegação. The prop `href` was renamed `to` to avoid a naming conflict. This is similar to react-router's Link component.

  ```tsx
  import Button from '@material-ui/core/Button';
  import { NextLinkComposed } from '../src/Link';

  export default function Index() {
    return (
      <Button
        component={NextLinkComposed}
        to={{
          pathname: '/about',
          query: { name: 'test' },
        }}
      >
        Button link
      </Button>
    );
  }
  ```

- A segunda versão do adaptador é o componente `Link`. Este componente é estilizado. It leverages the [link component of MUI](/material-ui/react-link/) with `NextLinkComposed`.

  ```tsx
  import Link from '../src/Link';

  export default function Index() {
    return (
      <Link
        href={{
          pathname: '/about',
          query: { name: 'test' },
        }}
      >
        Link
      </Link>
    );
  }
  ```

### Gatsby

The [Link](https://www.gatsbyjs.com/docs/linking-between-pages/) component of Gatsby is built on `@reach/router`. You can use the same previous documentation for react-router. Unlike Next.js, it doesn't require you to create an adapter.
