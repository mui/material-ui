# 路由库

<p class="description">默认情况下，导航使用原生 <code>&lt;a&gt;</code> 元素， 你可以自定义它来使用你自己的路由器； 例如，使用 Next.js的链接或React-router。</p>

## 导航组件

有两个主要组件可用来执行导航， 最常见的是 [`链接`](/material-ui/react-link/) 如其名称可能表示的。 通过渲染原生的 `<a>` 元素，将`href` 作为属性来使用。

{{"demo": "LinkDemo.js"}}

您也可以做一个按钮来执行导航操作。 If your component is extending [`ButtonBase`](/material-ui/api/button-base/), providing a `href` prop enables the link mode. 例如：使用 `按钮` 组件：

{{"demo": "ButtonDemo.js"}}

## Global theme Link

在实际应用中，使用原生的 `<a>` 元素是不够的， 您可以使用系统化地增强的 Link 组件来提升用户体验： MUI 主题允许配置此组件一次 例如，通过react-router：

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

## `component` 属性

You can achieve the integration with third-party routing libraries with the `component` prop. You can learn more about this prop in the [composition guide](/material-ui/guides/composition/#component-prop).

### Link

Here are a few demos with [react-router](https://github.com/remix-run/react-router). You can apply the same strategy with all the components: BottomNavigation, Card, etc.

{{"demo": "LinkRouter.js"}}

### Button

{{"demo": "ButtonRouter.js"}}

**Note**: The button base component adds the `role="button"` attribute when it identifies the intent to render a button without a native `<button>` element. This can create issues when rendering a link. If you are not using one of the `href`, `to`, or `component="a"` props, you need to override the `role` attribute. The above demo achieves this by setting `role={undefined}` **after** the spread props.

```jsx
In real-life applications, using a native <code><a></code> element is rarely enough. You can improve the user experience by using an enhanced Link component systematically. The theme of Material-UI allows configuring this component once. For instance, with react-router:
```

### Tabs 选项卡

{{"demo": "TabsRouter.js", "defaultCodeOpen": false}}

### Lists（列表）

{{"demo": "ListRouter.js"}}

## 更多示例

### Next.js

Next.js has [a custom Link component](https://nextjs.org/docs/api-reference/next/link). The [example folder](https://github.com/mui/material-ui/tree/HEAD/examples/nextjs-with-typescript) provides adapters for usage with MUI.

- The first version of the adapter is the [`NextLinkComposed`](https://github.com/mui/material-ui/blob/HEAD/examples/nextjs-with-typescript/src/Link.tsx) component. This component is unstyled and only responsible for handling the navigation. The prop `href` was renamed `to` to avoid a naming conflict. This is similar to react-router's Link component.

  ```tsx
  import Button from '@mui/material/Button';
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

- The second version of the adapter is the `Link` component. This component is styled. It leverages the [link component of MUI](/material-ui/react-link/) with `NextLinkComposed`.

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
