# Material UI + Tailwind CSS: reference

## Layer order (v4)

```css
@layer theme, base, mui, components, utilities;
@import 'tailwindcss';
```

Put it at the top of the global CSS file in every setup (Next.js App Router, Pages Router, Vite), and load that file before Material UI inserts its styles.

## VS Code `settings.json` (IntelliSense for `slotProps`)

```json
{
  "tailwindCSS.experimental.classRegex": [["className\\s*:\\s*['\"]([^'\"]*)['\"]"]]
}
```

From [Tailwind CSS v4 integration—Tailwind CSS IntelliSense for VS Code](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4.md#tailwind-css-intellisense-for-vs-code).

## v3 `tailwind.config.js` sketch

```js
module.exports = {
  corePlugins: {
    preflight: false,
  },
  // ...
};
```

See [Interoperability—Tailwind CSS v3](https://mui.com/material-ui/integrations/interoperability.md#tailwind-css-v3).

## Related skills

- material-ui-nextjs: `AppRouterCacheProvider`, Pages Router `AppCacheProvider` and `documentGetInitialProps`
- material-ui-theming: `cssVariables: true` for `--mui-*` token bridging
