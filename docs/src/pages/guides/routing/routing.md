# Routing libraries

<p class="description">By default, the navigation is performed with a native <code>&lt;a&gt;</code> element. You can customize it to use your own router. For instance, using Next.js's Link or react-router.</p>

## Navigation components

There are two main components available to perform navigations.
The most common one is the [`Link`](/components/link/) as its name might suggest.
It renders a native `<a>` element and applies the `href` as an attribute.

{{"demo": "pages/guides/routing/LinkDemo.js"}}

You can also make a button perform navigation actions.
If your component is extending [`ButtonBase`](/api/button-base/), providing a `href` prop enables the link mode.
For instance, with a `Button` component:

{{"demo": "pages/guides/routing/ButtonDemo.js"}}

## Global theme Link

In real-life applications, using a native `<a>` element is very rarely enough.
The UX can be improved by using an enhanced Link component systematically.
The theme of Material-UI allows to configure this component once:

{{"demo": "pages/guides/routing/LinkRouterWithTheme.js"}}

> ⚠️ This approach has limitations with TypeScript. The `href` prop only accepts a string.
> In the event you need to provide a richer structure, see the next section.

## `component` prop

The integration with third-party routing libraries can be achieved with the `component` prop.
You can learn more about this prop in the [composition guide](/guides/composition/#component-prop).

Here are a few demos with [react-router-dom](https://github.com/ReactTraining/react-router).
You can apply the same strategy with all the components (BottomNavigation, Card, etc.).

### Link

{{"demo": "pages/guides/routing/LinkRouter.js"}}

### Button

{{"demo": "pages/guides/routing/ButtonRouter.js"}}

### List

{{"demo": "pages/guides/routing/ListRouter.js"}}
