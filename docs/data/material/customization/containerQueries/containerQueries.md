# Container Queries

<p class="description">API that enables the use of CSS container queries based on theme breakpoints.</p>

A utility function based on the [theme breakpoints](/material-ui/customization/breakpoints/) for creating [CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries).

## Usage

To create a container query, use `theme.containerQueries` with any method available in the [theme.breakpoints](/material-ui/customization/breakpoints/#api).
The value can be a unitless (pixel), a string, or a breakpoint key, for example:

```js
theme.containerQueries.up('sm'); // => '@container (min-width: 600px)'
```

:::info
One of the ancestors must have the CSS container type specified.
:::

{{"demo": "BasicContainerQueries.js"}}

### Named containment contexts

To refer to a [containment context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries#naming_containment_contexts), call the `containerQueries` method with the name, then you will be able to access all the breakpoint methods like the example above:

```js
theme.containerQueries('sidebar').up('500px'); // => '@container sidebar (min-width: 500px)'
```

## Shorthand syntax

In sx prop, a format of `@<size>` or `@<size>/<name>` can be used to apply container queries without refering to the theme.

- `<size>`: a width or a breakpoint key.
- `<name>` (optional): a named containment context.

For example:

```js
<Card
  sx={{
    display: 'flex',
    flexDirection: {
      '@': 'column', // @container (min-width: 0px)
      '@250': 'row', // @container (min-width: 250px)
    },
  }}
/>
```

{{"demo": "SxPropContainerQueries.js"}}

### Caveats

- When `@` is used without a width or name, `0px` is applied.
- To get pixel unit, use a unitless number. For example, `@500` is equivalent to `500px`. Using `@500px` will not work.
- Container queries, **with the same unit**, are sorted in ascending order.

  ```js
  // ✅ The container queries will be sorted correctly.
  sx={{
    padding: {
      '@40em': 4,
      '@20em': 2,
      '@': 0,
    },
  }}

  // ❌ The container queries won't be sorted correctly.
  //    because 40em is usually greater than 50px
  sx={{
    padding: {
      '@40em': 4,
      '@50': 2,
      '@': 0,
    },
  }}
  ```

## API

CSS container queries support all the methods available in the [breakpoints](/material-ui/customization/breakpoints/#api) API.

```js
// For default breakpoints
theme.containerQueries.up('sm'); // => '@container (min-width: 600px)'
theme.containerQueries.down('md'); // => '@container (max-width: 900px)'
theme.containerQueries.only('md'); // => '@container (min-width: 600px) and (max-width: 900px)'
theme.containerQueries.between('sm', 'lg'); // => '@container (min-width: 600px) and (max-width: 1200px)'
theme.containerQueries.not('sm'); // => '@container (max-width: 600px)'
```
